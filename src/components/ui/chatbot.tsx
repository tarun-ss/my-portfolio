"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Mic, Paperclip, X, Bot, User, Volume2, FileImage } from 'lucide-react';
import { GradientButton } from "@/components/ui/gradient-button";
import { cn } from '@/lib/utils';

interface Message {
  sender: 'user' | 'bot';
  text?: string;
  imageUrl?: string;
}

export const AiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMessageIndex, setSpeakingMessageIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPopup(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speak = useCallback((text: string, index: number) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      
      // Remove emojis from the text before speaking
      const cleanText = text
        .replace(/[\u{1F600}-\u{1F64F}]/gu, '') 
        .replace(/[\u{1F300}-\u{1F5FF}]/gu, '') 
        .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') 
        .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '') 
        .replace(/[\u{2600}-\u{26FF}]/gu, '')   
        .replace(/[\u{2700}-\u{27BF}]/gu, '')   
        .replace(/[\u{FE00}-\u{FE0F}]/gu, '')   
        .replace(/[\u{1F900}-\u{1F9FF}]/gu, '') 
        .replace(/[\u{1FA00}-\u{1FA6F}]/gu, '') 
        .trim();
      
      if (!cleanText) return; 
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      const voices = speechSynthesis.getVoices();
      
      const preferredVoice = voices.find(voice => 
        (voice.name.includes('Google') || voice.name.includes('Samantha') || voice.name.includes('Female')) && 
        voice.lang.startsWith('en')
      ) || voices.find(voice => 
        voice.lang.startsWith('en') && voice.name.includes('Natural')
      ) || voices.find(voice => 
        voice.lang.startsWith('en-US') || voice.lang.startsWith('en-GB')
      ) || voices[0];
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.rate = 1.0;      
      utterance.pitch = 1.1;     
      utterance.volume = 1.0;    
      
      utterance.onstart = () => {
        setIsSpeaking(true);
        setSpeakingMessageIndex(index);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeakingMessageIndex(null);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setSpeakingMessageIndex(null);
      };
      
      speechSynthesis.speak(utterance);
    }
  }, []);

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingMessageIndex(null);
    }

    const userMessage: Message = { 
      sender: 'user', 
      text: input.trim(), 
      imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : undefined 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setSelectedImage(null);

    try {
      // Build conversation history - include the new user message
      const conversationHistory = [...messages, userMessage].slice(-6).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text || ''
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conversationHistory }),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error || 'API request failed');
      }

      const data = await response.json();
      const botText = data.botText;
      
      if (!botText) {
        throw new Error('No response from assistant');
      }
      
      setMessages(prev => {
        const botMessage: Message = { sender: 'bot', text: botText };
        const updatedMessages = [...prev, botMessage];
        // Speak the response
        speak(botText, updatedMessages.length - 1);
        return updatedMessages;
      });

    } catch (error: any) {
      console.error('Error:', error);
      
      let errorText = "Sorry, I'm having trouble right now. Please try again! 😊";
      
      if (error.message.includes('Configuration issue')) {
        errorText = "I encountered a configuration issue. Please ensure the GROQ_API_KEY is set in your .env.local file and restart the server.";
      } else if (error.message.includes('busy')) {
        errorText = "I'm a bit busy right now. Please try again in a moment! 😊";
      } else if (error.message) {
        errorText = `${error.message}. Please try again or contact Tarun directly.`;
      }
      
      setMessages(prev => [...prev, { sender: 'bot', text: errorText }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleOpenChat = () => {
    setIsOpen(true);
    setShowPopup(false);
  };

  const handleMicClick = () => {
    setIsRecording(!isRecording);
  };
  
  const handlePaperclipClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        <AnimatePresence>
          {showPopup && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="bg-zinc-900 border border-white/10 p-4 rounded-lg shadow-2xl max-w-xs text-center"
            >
              <p className="text-white text-sm">
                Have a question about Tarun? Click me to ask his virtual assistant!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-[350px] h-[500px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Bot className="text-white"/>
                  <h3 className="font-bold text-white">S Tarun's Assistant</h3>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 p-4 overflow-y-auto">
                <div className="flex flex-col gap-4">
                  {messages.length === 0 && (
                    <div className="flex justify-center items-center h-full">
                      <div className="text-center text-white/40">
                        <Bot className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Ask me anything about Tarun!</p>
                        <p className="text-xs mt-2">Powered by Groq ⚡</p>
                      </div>
                    </div>
                  )}
                  {messages.map((msg, index) => (
                    <div key={index} className={cn("flex gap-2 items-start", msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                      {msg.sender === 'bot' && <Bot className="text-white/80 shrink-0 mt-1"/>}
                      <div className={cn("p-3 rounded-xl max-w-[80%]", msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-zinc-800 text-white rounded-bl-none')}>
                        <div className="flex items-center gap-2">
                          {msg.text && <p className="text-sm break-words whitespace-pre-wrap">{msg.text}</p>}
                          {isSpeaking && speakingMessageIndex === index && (
                            <Volume2 className="w-4 h-4 text-white/70 animate-pulse"/>
                          )}
                        </div>
                        {msg.imageUrl && <img src={msg.imageUrl} alt="user upload" className="rounded-lg mt-2 max-w-full h-auto"/>}
                      </div>
                      {msg.sender === 'user' && <User className="text-white/80 shrink-0 mt-1"/>}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start gap-2">
                      <Bot className="text-white/80 shrink-0 mt-1"/>
                      <div className="p-3 rounded-xl bg-zinc-800 text-white rounded-bl-none">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="p-4 border-t border-white/10">
                {selectedImage && (
                  <div className="mb-2 flex items-center gap-2 p-2 bg-zinc-800 rounded-lg">
                    <FileImage className="text-white/50"/>
                    <p className="text-xs text-white truncate">{selectedImage.name}</p>
                    <button onClick={() => setSelectedImage(null)}><X size={16} className="text-white/50 hover:text-white"/></button>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about S Tarun..."
                    className="w-full bg-zinc-800 text-white placeholder:text-white/40 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    disabled={isLoading}
                  />
                  <button onClick={handleMicClick} className={cn("p-2 rounded-full hover:bg-white/10", isRecording ? "bg-red-500/50" : "bg-transparent")} disabled={isLoading}>
                    <Mic className="text-white" />
                  </button>
                  <button onClick={handlePaperclipClick} className="p-2 rounded-full hover:bg-white/10" disabled={isLoading}>
                    <Paperclip className="text-white" />
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*"/>
                  <button onClick={handleSend} className="p-2 bg-blue-600 rounded-full hover:bg-blue-500 disabled:opacity-50" disabled={isLoading}>
                    <Send className="text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <GradientButton onClick={handleOpenChat} className="rounded-full p-4 h-16 w-16 shadow-2xl">
              <MessageSquare size={32} />
            </GradientButton>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};