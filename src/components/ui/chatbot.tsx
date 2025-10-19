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

  // Groq API Key
  const GROQ_API_KEY = "";

  const systemPrompt = `You are AVA (AI Virtual Assistant), a helpful and friendly AI assistant on S Tarun's portfolio website. While your primary purpose is to help visitors learn about Tarun, you're also happy to chat about other topics!

**Your Knowledge Base (S Tarun):**
- **Profession:** Electronics and Computer Engineering graduate from VIT with 8.18 CGPA.
- **Expertise:** Machine learning, data analysis, and full-stack software development.
- **Experience:** Interned at HAL, working on avionics for LCA Tejas aircraft.
- **Skills:** Python, Java, C, R, JavaScript, HTML5, CSS3, React, Node.js, Scikit-Learn, OpenCV, MySQL, MATLAB, JIRA.
- **Projects:** ML for Environmental Monitoring, Biomedical Data Analysis, Full-Stack Web Apps, Advanced Materials Classification.
- **Location:** Bangalore, India.

**Your Personality & Approach:**
1. **Be helpful and versatile**: Answer questions about Tarun's work, but also engage with general questions, tech discussions, career advice, or casual conversation.
2. **Stay natural**: Use a friendly, conversational tone. Emojis are welcome when appropriate! 😊
3. **Maintain context**: Remember what was discussed earlier in the conversation.
4. **Be concise**: Keep responses brief (2-4 sentences) unless the user asks for more detail.
5. **When off-topic**: Feel free to answer general questions! If relevant, gently tie back to Tarun's expertise.
6. **For Tarun-specific unknowns**: If you don't know something specific about Tarun, suggest contacting him directly through the portfolio.`;

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
        .replace(/[\u{1F600}-\u{1F64F}]/gu, '') // Emoticons
        .replace(/[\u{1F300}-\u{1F5FF}]/gu, '') // Symbols & Pictographs
        .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // Transport & Map
        .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '') // Flags
        .replace(/[\u{2600}-\u{26FF}]/gu, '')   // Misc symbols
        .replace(/[\u{2700}-\u{27BF}]/gu, '')   // Dingbats
        .replace(/[\u{FE00}-\u{FE0F}]/gu, '')   // Variation Selectors
        .replace(/[\u{1F900}-\u{1F9FF}]/gu, '') // Supplemental Symbols
        .replace(/[\u{1FA00}-\u{1FA6F}]/gu, '') // Chess Symbols
        .trim();
      
      if (!cleanText) return; // Don't speak if only emojis
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      // Get available voices and select the best one
      const voices = speechSynthesis.getVoices();
      
      // Try to find a natural-sounding English voice
      // Priority: Google voices > Microsoft voices > Others
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
      
      // Adjust speech parameters for more natural sound
      utterance.rate = 1.0;      // Normal speed (0.1 to 10)
      utterance.pitch = 1.1;     // Slightly higher pitch (0 to 2)
      utterance.volume = 1.0;    // Full volume (0 to 1)
      
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
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const userInput = input.trim();
    setInput('');
    setIsLoading(true);
    setSelectedImage(null);

    try {
      // Groq API endpoint
      const apiUrl = 'https://api.groq.com/openai/v1/chat/completions';

      console.log('Sending request to Groq...');

      // Build conversation history
      const conversationHistory = newMessages.slice(-6).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text || ''
      }));

      // Add system prompt at the beginning
      const messagesPayload = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory
      ];

      const payload = {
        model: 'llama-3.3-70b-versatile', // Latest Llama 3.3 model
        messages: messagesPayload,
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 0.9,
        stream: false
      };

      console.log('Payload created with', messagesPayload.length, 'messages');

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorBody = await response.json();
        console.error('API Error:', errorBody);
        
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment! 😊');
        } else if (response.status === 401) {
          throw new Error('API key issue. Please check configuration.');
        } else {
          throw new Error(`API error: ${errorBody.error?.message || 'Unknown error'}`);
        }
      }

      const data = await response.json();
      console.log('Response received');
      
      if (!data.choices || !data.choices[0]?.message?.content) {
        console.error('Unexpected response:', data);
        throw new Error('Unexpected response format');
      }

      const botText = data.choices[0].message.content;
      console.log('Bot response length:', botText.length);
      
      const botMessage: Message = { sender: 'bot', text: botText };
      
      setMessages(prev => {
        const updatedMessages = [...prev, botMessage];
        speak(botText, updatedMessages.length - 1);
        return updatedMessages;
      });

    } catch (error: any) {
      console.error('Error:', error);
      let errorText = "Sorry, I'm having trouble right now. ";
      
      if (error.message.includes('Rate limit')) {
        errorText = "I've reached my rate limit. Please try again in a moment! 😊";
      } else if (error.message.includes('API key')) {
        errorText = "Configuration issue. Please contact Tarun directly through the contact form.";
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorText = "Network connection issue. Please check your internet and try again.";
      } else {
        errorText = `Error: ${error.message}. Please try again or use the contact form.`;
      }
      
      const errorMessage: Message = { sender: 'bot', text: errorText };
      setMessages(prev => [...prev, errorMessage]);
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
    // Note: Actual speech recognition would need additional implementation
  };
  
  const handlePaperclipClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      // Note: Groq doesn't support image analysis in the free tier
      // Images are shown but not analyzed
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