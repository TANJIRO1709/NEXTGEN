'use client';

import { useState } from 'react';
import { X, Send, Minimize2, Maximize2, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

const chatButtonVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
  tap: { scale: 0.9 }
};

const chatWindowVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.95,
    y: 20
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2
    }
  }
};

const messageVariants = {
  hidden: { 
    opacity: 0,
    x: -20
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      sender: 'support',
      timestamp: new Date(),
    },
  ]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');

    // Simulate support response
    setTimeout(() => {
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for your message. A support representative will be with you shortly.',
        sender: 'support',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, supportMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            variants={chatButtonVariants}
            initial="initial"
            animate="animate"
            whileTap="tap"
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-blue-600 
              text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow
              hover:from-blue-600 hover:to-blue-700"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={chatWindowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl 
              overflow-hidden border border-gray-100 z-50`}
          >
            {/* Header */}
            <motion.div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white 
                flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-medium flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Chat Support
              </h3>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={16} />
                </motion.button>
              </div>
            </motion.div>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Messages */}
                  <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        variants={messageVariants}
                        initial="hidden"
                        animate="visible"
                        className={`flex ${
                          msg.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm ${
                            msg.sender === 'user'
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p>{msg.text}</p>
                          <span className="text-xs opacity-75 mt-1 block">
                            {msg.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Input */}
                  <motion.form 
                    onSubmit={sendMessage} 
                    className="p-4 border-t border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 rounded-full border border-gray-200 px-4 py-2 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                          transition-all duration-200"
                      />
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white 
                          rounded-full p-2 hover:from-blue-600 hover:to-blue-700 
                          transition-all duration-200"
                      >
                        <Send size={18} />
                      </motion.button>
                    </div>
                  </motion.form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
