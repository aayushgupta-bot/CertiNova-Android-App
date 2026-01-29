import { useState } from 'react';
import { Question } from '../../types/quiz';

interface DragDropMatchingQuestionProps {
  question: Question;
  userAnswer?: Record<string, string>;
  onAnswer: (answer: Record<string, string>) => void;
}

export function DragDropMatchingQuestion({ question, userAnswer = {}, onAnswer }: DragDropMatchingQuestionProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  
  const matchingPairs = question.matchingPairs || { left: [], right: [] };
  const leftItems = matchingPairs.left;
  const rightItems = matchingPairs.right;

  // Get which right items are already matched
  const matchedRightItems = Object.values(userAnswer);

  const handleLeftClick = (item: string) => {
    if (selectedLeft === item) {
      setSelectedLeft(null);
    } else {
      setSelectedLeft(item);
    }
  };

  const handleRightClick = (item: string) => {
    if (selectedLeft) {
      const newAnswer = { ...userAnswer };
      
      // If this right item was already matched to something else, remove that match
      for (const key in newAnswer) {
        if (newAnswer[key] === item) {
          delete newAnswer[key];
        }
      }
      
      // Add the new match
      newAnswer[selectedLeft] = item;
      onAnswer(newAnswer);
      setSelectedLeft(null);
    }
  };

  const handleClearMatch = (leftItem: string) => {
    const newAnswer = { ...userAnswer };
    delete newAnswer[leftItem];
    onAnswer(newAnswer);
  };

  const getMatchedItem = (leftItem: string): string | undefined => {
    return userAnswer[leftItem];
  };

  const isRightItemMatched = (rightItem: string): boolean => {
    return matchedRightItems.includes(rightItem);
  };

  const matchedCount = Object.keys(userAnswer).length;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
        {question.question}
      </h3>

      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">
        Click an item on the left, then click the matching item on the right. Click a matched pair to clear it.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {/* Left Column */}
        <div className="space-y-3">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
            Items to Match
          </div>
          {leftItems.map((item, index) => {
            const matchedTo = getMatchedItem(item);
            const isSelected = selectedLeft === item;
            
            return (
              <div key={index} className="space-y-1">
                <button
                  onClick={() => matchedTo ? handleClearMatch(item) : handleLeftClick(item)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                    matchedTo
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 shadow-md'
                        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-500 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item}</span>
                    {matchedTo && (
                      <span className="text-xs text-green-600 dark:text-green-400">✓ Matched</span>
                    )}
                    {isSelected && !matchedTo && (
                      <span className="text-xs text-blue-600 dark:text-blue-400">Selected</span>
                    )}
                  </div>
                </button>
                {matchedTo && (
                  <div className="ml-4 p-2 bg-green-100 dark:bg-green-900/20 rounded text-sm text-green-700 dark:text-green-400 transition-colors duration-300">
                    → {matchedTo}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
            Match With
          </div>
          {rightItems.map((item, index) => {
            const isMatched = isRightItemMatched(item);
            
            return (
              <button
                key={index}
                onClick={() => handleRightClick(item)}
                disabled={!selectedLeft || isMatched}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                  isMatched
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 opacity-60'
                    : selectedLeft
                      ? 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-800 dark:text-gray-200 cursor-pointer'
                      : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{item}</span>
                  {isMatched && (
                    <span className="text-xs text-green-600 dark:text-green-400">✓</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="text-sm text-gray-500 dark:text-gray-400 text-center transition-colors duration-300">
        Matched: {matchedCount} of {leftItems.length} items
      </div>
    </div>
  );
}
