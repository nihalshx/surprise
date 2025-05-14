import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { quizQuestions } from '../data/quizData';
import { Heart, Star } from 'lucide-react';

const QuizSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    
    if (optionIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setShowReward(true);
    } else {
      // Wait briefly, then go to next question
      setTimeout(() => {
        if (currentQuestion < quizQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedOption(null);
        } else {
          setCompleted(true);
        }
      }, 1500);
    }
  };

  const handleNextQuestion = () => {
    setShowReward(false);
    setSelectedOption(null);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <section id="quiz" className="bg-gradient-to-b from-midnight-300 to-midnight-200 py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl text-white font-handwriting text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Do You Remember?
        </motion.h2>

        <motion.div
          ref={ref}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            {completed ? (
              <motion.div
                key="completion"
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="mb-6 flex justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star
                        size={32}
                        className={i < score ? 'text-accent-500 fill-accent-500' : 'text-gray-300'}
                      />
                    </motion.div>
                  ))}
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-midnight-900 mb-4">
                  {score === quizQuestions.length
                    ? 'Perfect Score! You know me so well! ❤️'
                    : `You got ${score} out of ${quizQuestions.length} correct!`}
                </h3>
                <p className="text-midnight-700 mb-6">
                  {score === quizQuestions.length
                    ? 'You truly understand me and remember our special moments. That means the world to me.'
                    : 'Thanks for playing! We have so many more memories to create together.'}
                </p>
                <motion.button
                  className="bg-gradient-to-r from-sakura-500 to-accent-500 text-white font-medium py-3 px-6 rounded-full 
                           shadow-lg shadow-accent-500/30 hover:shadow-accent-500/50 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentQuestion(0);
                    setSelectedOption(null);
                    setShowReward(false);
                    setScore(0);
                    setCompleted(false);
                  }}
                >
                  Play Again
                </motion.button>
              </motion.div>
            ) : showReward ? (
              <motion.div
                key="reward"
                className="text-center p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="flex justify-center mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                  <Heart size={60} className="text-accent-500 fill-accent-500" />
                </motion.div>
                <h3 className="text-3xl font-handwriting text-accent-700 mb-6">
                  Correct! ❤️
                </h3>
                <p className="text-midnight-800 font-serif text-xl italic mb-8">
                  "{quizQuestions[currentQuestion].reward}"
                </p>
                <motion.button
                  className="bg-gradient-to-r from-sakura-500 to-accent-500 text-white font-medium py-2 px-5 rounded-full 
                           shadow-md shadow-accent-500/20 hover:shadow-accent-500/40 transition-all"
                  onClick={handleNextQuestion}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key={`question-${currentQuestion}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 className="text-lg text-accent-600 font-medium mb-2">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </h3>
                <h4 className="text-2xl md:text-3xl text-midnight-900 font-serif mb-8">
                  {quizQuestions[currentQuestion].question}
                </h4>
                <div className="space-y-4">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                        selectedOption === index
                          ? selectedOption === quizQuestions[currentQuestion].correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-accent-300 hover:bg-accent-50'
                      }`}
                      disabled={selectedOption !== null}
                      onClick={() => handleOptionSelect(index)}
                      whileHover={{ scale: selectedOption === null ? 1.02 : 1 }}
                      whileTap={{ scale: selectedOption === null ? 0.98 : 1 }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default QuizSection;