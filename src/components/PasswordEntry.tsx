import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Lock } from 'lucide-react';

interface PasswordEntryProps {
  onUnlock: () => void;
  correctPassword: string;
}

const PasswordEntry: React.FC<PasswordEntryProps> = ({ onUnlock, correctPassword }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === correctPassword.toLowerCase()) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-midnight-900 to-midnight-950">
      <motion.div
        className="max-w-md w-full mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-8">
          <motion.div
            className="inline-block mb-6"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Lock size={48} className="text-accent-400" />
          </motion.div>
          <h2 className="text-4xl font-handwriting text-white mb-4">
            For Your Eyes Only
          </h2>
          <p className="text-white/80 font-serif italic">
            Type your nickname to unlock your surprise 💕
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-6 py-4 bg-white/10 backdrop-blur-sm rounded-lg border-2 
                         text-white text-center text-lg outline-none transition-colors
                         ${error ? 'border-red-500' : 'border-white/20'}
                         focus:border-accent-400 placeholder-white/50`}
              placeholder="Enter your nickname..."
              autoFocus
            />
            <motion.p
              className="absolute -bottom-6 left-0 right-0 text-center text-red-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: error ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              That's not quite right, try again! 💝
            </motion.p>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-accent-500 to-sakura-500 text-white py-4 px-6 rounded-lg
                     font-medium text-lg shadow-lg shadow-accent-500/30 hover:shadow-accent-500/50 
                     flex items-center justify-center gap-2 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Unlock</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={20} className="text-white" />
            </motion.span>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default PasswordEntry;