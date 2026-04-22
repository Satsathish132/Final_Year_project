import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Mic, MicOff } from 'lucide-react';
import { userKey } from '@/lib/userStorage';

const API_BASE = "http://localhost:8000";

interface Message {
  text: string;
  who: 'user' | 'bot';
}

function cleanTextForDisplay(text: string): string {
  let cleaned = text;
  cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, "$1");
  cleaned = cleaned.replace(/\*(.*?)\*/g, "$1");
  cleaned = cleaned.replace(/^[\s]*[*\-•]+\s*/gm, "");
  cleaned = cleaned.replace(/^[\s]*\d+[.)]\s*/gm, "");
  cleaned = cleaned.replace(/[ \t]+/g, " ");
  return cleaned.trim();
}

function formatBotText(text: string): string {
  const cleaned = cleanTextForDisplay(text);
  const parts = cleaned.split(/(?<=[.:?])\s+/);
  return parts.join("\n");
}

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const sessionKey = userKey('pathalytics_session');
    if (!localStorage.getItem(sessionKey)) {
      localStorage.setItem(sessionKey, Math.random().toString(36).slice(2));
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      const recognition = new SpeechRecognitionAPI();
      recognition.lang = 'en-IN';
      recognition.interimResults = true;
      recognition.continuous = true;

      recognition.onresult = (event: any) => {
        let fullTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          fullTranscript += event.results[i][0].transcript + ' ';
        }
        setInput(fullTranscript.trim());
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleMic = useCallback(() => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  }, [isListening]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    setMessages(prev => [...prev, { text, who: 'user' }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          current_page: window.location.pathname,
          user_level: 'intermediate',
          session_id: 'browser-' + (localStorage.getItem(userKey('pathalytics_session')) || 'default'),
        }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { text: formatBotText(data.reply), who: 'bot' }]);
    } catch {
      setMessages(prev => [...prev, { text: 'Sorry, I had trouble reaching the server.', who: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 96) + 'px';
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999] font-sans">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-br from-primary to-accentext-primary-foreground rounded-full p-4 shadow-[0_10px_30px_hsl(var(--primary)/0.5)] hover:shadow-[0_14px_36px_hsl(var(--primary)/0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="w-80 h-[420px] rounded-2xl shadow-[0_18px_55px_hsl(var(--background)/0.85)] border border-primary/40 flex flex-col overflow-hidden animate-fade-in bg-card">
          {/* Header */}
          <div className="px-3 py-2.5 bg-gradient-to-r from-primary to-blaccentext-primary-foreground font-semibold text-sm flex items-center justify-between">
            <span>Pathalytics Assistant</span>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-80 transition-opacity">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-background text-foreground text-[13px] scrollbar-thin">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-xs mt-8">
                Ask about careers, skills, or roadmaps...
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.who === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span
                  className={`inline-block px-3 py-1.5 max-w-[80%] whitespace-pre-wrap ${
                    msg.who === 'user'
                      ? 'bg-primary text-primary-foreground rounded-[14px] rounded-br-[4px]'
                      : 'bg-muted text-foreground rounded-[14px] rounded-bl-[4px] border border-border'
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <span className="inline-block px-3 py-1.5 bg-muted text-muted-foreground rounded-[14px] rounded-bl-[4px] border border-border animate-pulse">
                  Thinking...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Controls */}
          <div className="flex items-end gap-1.5 p-2 border-t border-border bg-card">
            {recognitionRef.current && (
              <button
                onClick={toggleMic}
                className={`rounded-full p-2 transition-colors ${
                  isListening
                    ? 'bg-destructive text-destructive-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            )}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => { setInput(e.target.value); autoResize(); }}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Ask about careers, skills..."
              className="flex-1 px-2 py-1.5 rounded-lg border border-border bg-background text-foreground text-[13px] resize-none min-h-[32px] max-h-[96px] overflow-y-auto focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="rounded-full p-2 bg-primary text-primary-foreground shadow-[0_6px_18px_hsl(var(--primary)/0.6)] hover:shadow-[0_8px_24px_hsl(var(--primary)/0.7)] hover:-translate-y-px active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
