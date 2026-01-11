import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  variant?: 'modern' | 'retro';
}

const ContactForm: React.FC<ContactFormProps> = ({ variant = 'modern' }) => {
  const [formData, setFormData] = useState({
    email: '',
    title: '',
    description: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    // Email is required
    if (!formData.email.trim()) {
      newErrors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.push('Please enter a valid email address');
    }

    // At least title or description is required
    if (!formData.title.trim() && !formData.description.trim()) {
      newErrors.push('Please provide either a title or description');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus('sending');
    setMessage('');

    try {
      // Using Web3Forms API (free service)
      // User needs to get their access key from https://web3forms.com
      const accessKey = process.env.WEB3FORMS_ACCESS_KEY || '';
      
      if (!accessKey) {
        setStatus('error');
        setMessage('Contact form is not configured. Please set up WEB3FORMS_ACCESS_KEY.');
        return;
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          from_email: formData.email,
          subject: formData.title || 'New message from portfolio',
          message: formData.description || formData.title,
          email: formData.email,
          title: formData.title,
          description: formData.description
        })
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setMessage('Message sent successfully! I will get back to you soon.');
        setFormData({ email: '', title: '', description: '' });
        setErrors([]);
      } else {
        setStatus('error');
        setMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try emailing directly at lonshan3010@gmail.com');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  if (variant === 'retro') {
    return (
      <div className="border-2 border-black p-6 bg-white shadow-[6px_6px_0px_#000] mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center bg-black text-white py-2">
          📧 SEND MESSAGE
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-bold mb-1">Your Email: <span className="text-red-600">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-2 border-black p-2 font-mono text-sm"
              placeholder="your@email.com"
              disabled={status === 'sending'}
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Subject:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border-2 border-black p-2 font-mono text-sm"
              placeholder="Message subject"
              disabled={status === 'sending'}
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Message:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full border-2 border-black p-2 font-mono text-sm resize-none"
              placeholder="Your message here..."
              disabled={status === 'sending'}
            />
          </div>

          {errors.length > 0 && (
            <div className="bg-red-200 border-2 border-red-600 p-3">
              <p className="font-bold">⚠ Errors:</p>
              <ul className="list-disc pl-5 text-sm">
                {errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {message && (
            <div className={`border-2 p-3 ${status === 'success' ? 'bg-green-200 border-green-600' : 'bg-yellow-200 border-yellow-600'}`}>
              <p className="font-mono text-sm">{message}</p>
            </div>
          )}

          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-blue-700 active:shadow-none active:translate-x-1 active:translate-y-1 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? '⏳ SENDING...' : '📨 SEND MESSAGE'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Modern variant
  return (
    <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
          <Mail size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-200">Send me a message</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Your Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-gray-200 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="your@email.com"
            disabled={status === 'sending'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Subject
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-gray-200 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="What's this about?"
            disabled={status === 'sending'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Message
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-gray-200 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Your message here..."
            disabled={status === 'sending'}
          />
        </div>

        {errors.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                {errors.map((error, i) => (
                  <p key={i} className="text-sm text-red-300">{error}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {message && (
          <div className={`rounded-lg p-4 border ${
            status === 'success' 
              ? 'bg-green-500/10 border-green-500/30' 
              : 'bg-yellow-500/10 border-yellow-500/30'
          }`}>
            <div className="flex items-start gap-2">
              {status === 'success' ? (
                <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
              )}
              <p className={`text-sm ${status === 'success' ? 'text-green-300' : 'text-yellow-300'}`}>
                {message}
              </p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-bold py-3 px-6 rounded-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-2"
        >
          {status === 'sending' ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent" />
              Sending...
            </>
          ) : (
            <>
              <Send size={18} />
              Send Message
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-4 text-center">
        * Email is required. Please provide at least a subject or message.
      </p>
    </div>
  );
};

export default ContactForm;
