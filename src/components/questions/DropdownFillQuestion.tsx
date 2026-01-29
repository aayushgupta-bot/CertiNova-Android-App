import React from 'react';
import { Question } from '../../types/quiz';

interface DropdownFillQuestionProps {
  question: Question;
  userAnswer?: Record<string, string>;
  onAnswer: (answer: Record<string, string>) => void;
}

export function DropdownFillQuestion({ question, userAnswer = {}, onAnswer }: DropdownFillQuestionProps) {
  const blanks = question.blanks || [];

  const handleSelect = (blankId: string, value: string) => {
    const newAnswer = { ...userAnswer };
    newAnswer[blankId] = value;
    onAnswer(newAnswer);
  };

  // Parse the question text to replace [BLANK_X] with dropdowns
  const renderQuestionWithBlanks = () => {
    const text = question.question;
    const parts: (string | React.ReactNode)[] = [];
    let lastIndex = 0;
    let blankIndex = 0;

    // Find all [BLANK_X] patterns
    const blankPattern = /\[BLANK_\d+\]/g;
    let match;

    while ((match = blankPattern.exec(text)) !== null) {
      // Add text before the blank
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      // Add the dropdown for this blank
      const blank = blanks[blankIndex];
      if (blank) {
        parts.push(
          <select
            key={blank.id}
            value={userAnswer[blank.id] || ''}
            onChange={(e) => handleSelect(blank.id, e.target.value)}
            className={`inline-block mx-1 px-3 py-1.5 rounded-lg border-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
              userAnswer[blank.id]
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500'
            }`}
          >
            <option value="">Select...</option>
            {blank.options.map((option, optIndex) => (
              <option key={optIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
        blankIndex++;
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  const answeredCount = Object.keys(userAnswer).filter(k => userAnswer[k]).length;

  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">
        Select the correct option for each blank to complete the statement:
      </div>

      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-600 transition-colors duration-300">
        <p className="text-lg text-gray-800 dark:text-white leading-relaxed transition-colors duration-300">
          {renderQuestionWithBlanks()}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="text-sm text-gray-500 dark:text-gray-400 text-center transition-colors duration-300">
        Completed: {answeredCount} of {blanks.length} blanks
      </div>
    </div>
  );
}
