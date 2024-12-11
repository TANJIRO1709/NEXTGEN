'use client';

import { useState } from 'react';
import { X, Paperclip, Image, Smile, Link2, Send, FileText } from 'lucide-react';

interface ComposeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (data: { to: string; subject: string; content: string }) => void;
  onSaveDraft: (data: { to: string; subject: string; content: string }) => void;
}

export default function ComposeDialog({ isOpen, onClose, onSend, onSaveDraft }: ComposeDialogProps) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend({ to, subject, content });
    setTo('');
    setSubject('');
    setContent('');
  };

  const handleSaveDraft = () => {
    if (to || subject || content) {
      onSaveDraft({ to, subject, content });
      setTo('');
      setSubject('');
      setContent('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 right-4 w-[32rem] bg-white rounded-t-lg shadow-xl border border-gray-200 z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">New Message</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col h-[32rem]">
        <div className="px-4 py-2 border-b border-gray-200">
          <input
            type="email"
            placeholder="Recipients"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full px-2 py-1 text-sm focus:outline-none"
          />
        </div>
        <div className="px-4 py-2 border-b border-gray-200">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-2 py-1 text-sm focus:outline-none"
          />
        </div>
        <div className="flex-1 px-4 py-2">
          <textarea
            placeholder="Write your message..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full text-sm focus:outline-none resize-none"
          />
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button type="button" className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
              <Paperclip className="w-5 h-5" />
            </button>
            <button type="button" className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
              <Image className="w-5 h-5" />
            </button>
            <button type="button" className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
              <Link2 className="w-5 h-5" />
            </button>
            <button type="button" className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
              <Smile className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <FileText className="w-4 h-4" />
              Save Draft
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
