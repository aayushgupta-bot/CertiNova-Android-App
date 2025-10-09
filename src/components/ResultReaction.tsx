import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ResultReactionProps {
  percentage: number;
}

export const ResultReaction: React.FC<ResultReactionProps> = ({ percentage }) => {
  const [show, setShow] = useState(false);
  const [showPoppers, setShowPoppers] = useState(false);

  useEffect(() => {
    // Show reaction after a small delay
    const timer = setTimeout(() => {
      setShow(true);
      
      // Show party poppers for high scores
      if (percentage >= 80) {
        setShowPoppers(true);
      }
    }, 300);

    // Hide reaction after animation
    const hideTimer = setTimeout(() => {
      setShow(false);
      setShowPoppers(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [percentage]);

  const getReactionEmoji = () => {
    if (percentage >= 90) return '🎉';
    if (percentage >= 80) return '🌟';
    if (percentage >= 70) return '😊';
    if (percentage >= 60) return '👍';
    if (percentage >= 50) return '💪';
    return '📚';
  };

  const getReactionText = () => {
    if (percentage >= 90) return 'Outstanding!';
    if (percentage >= 80) return 'Excellent!';
    if (percentage >= 70) return 'Great Job!';
    if (percentage >= 60) return 'Good Work!';
    if (percentage >= 50) return 'Keep Going!';
    return 'Keep Learning!';
  };

  const getReactionColor = () => {
    if (percentage >= 80) return 'from-green-400 to-emerald-500';
    if (percentage >= 70) return 'from-blue-400 to-cyan-500';
    if (percentage >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-purple-400 to-pink-500';
  };

  return (
    <>
      {/* Pop-out Reaction */}
      {show && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="animate-popOutFade">
            <div className={`bg-gradient-to-r ${getReactionColor()} text-white px-8 py-6 rounded-2xl shadow-2xl border-4 border-white`}>
              <div className="text-center">
                <div className="text-6xl mb-3 animate-bounce">
                  {getReactionEmoji()}
                </div>
                <div className="text-3xl font-bold mb-2">
                  {getReactionText()}
                </div>
                <div className="text-5xl font-extrabold">
                  {percentage.toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Party Poppers for 80%+ */}
      {showPoppers && percentage >= 80 && (
        <>
          {/* Left side poppers */}
          <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={`left-${i}`}
                className="absolute animate-confettiLeft"
                style={{
                  top: `${i * 80}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <Sparkles
                  className="w-8 h-8"
                  style={{
                    color: ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD'][i % 5],
                    opacity: 0.6,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Right side poppers */}
          <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={`right-${i}`}
                className="absolute animate-confettiRight"
                style={{
                  top: `${i * 80}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <Sparkles
                  className="w-8 h-8"
                  style={{
                    color: ['#FF69B4', '#FFD700', '#98FB98', '#87CEEB', '#DDA0DD'][i % 5],
                    opacity: 0.6,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Top confetti burst */}
          <div className="fixed top-0 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={`top-${i}`}
                className="absolute animate-confettiFall"
                style={{
                  left: `${i * 60 - 400}px`,
                  animationDelay: `${i * 0.05}s`,
                }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD', '#FFA500'][i % 6],
                    opacity: 0.7,
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ResultReaction;
