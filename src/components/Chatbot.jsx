import { useState } from 'react';
import { motion } from 'framer-motion';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const quickReplies = [
    'مرحبا',
    'وداعاً',
    'كيف أحجز موعد؟',
    'من هم الأطباء المتوفرين؟',
    'ما هي المستشفيات التي تتعاملون معها؟',
    'ما هي التخصصات المتوفرة؟',
    'كيف يمكنني الاشتراك؟',
    'هل أنت إنسان؟'
  ];

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleQuickReply = (reply) => {
    setInput(reply);
    sendMessage(reply);
  };

  const sendMessage = async (message = input) => {
    if (!message.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: message }]);
    setInput('');

    try {
      const response = await fetch('https://healthai.mastercoders.dev/webhooks/rest/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sender: 'user', message })
      });
      const data = await response.json();

      if (data && data.length > 0) {
        const botMessages = data.map(item => ({ sender: 'bot', text: item.text }));
        setMessages(prev => [...prev, ...botMessages]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { sender: 'bot', text: 'عذرًا، حدث خطأ ما.' }]);
    }
  };

  return (
    <>
      <motion.div
        className="chatbot-icon"
        onClick={toggleChatbot}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        💬
      </motion.div>

      {isOpen && (
        <motion.div
          className="chatbot-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="chatbot-header">
            Chatbot
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <div className="quick-replies">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="اكتب رسالتك..."
            />
            <button onClick={() => sendMessage()}>إرسال</button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Chatbot;