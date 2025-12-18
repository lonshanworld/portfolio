import React, { useState, useEffect, useRef } from 'react';
import GamePreview from './GamePreview';
import SitePreview from './SitePreview';
import { ChatMessage } from '../types';
import { EXPERIENCES, PROJECTS, SKILLS, PERSONAL_INFO } from '../constants';
import { sendMessageToGemini } from '../services/geminiService';
import { ArrowUpRight, Github, Linkedin, Mail, Phone, MapPin, Copy, Check, Terminal, Send, Smartphone, Globe, Layers, Cpu, FileText, Activity, Zap, Wifi, Clock, Eye } from 'lucide-react';

const RESUME_DRIVE_FILE_ID = '1PVrbOFLAhq9TmPhe2m0cxcF-pRzqzl5h';

const ModernView: React.FC = () => {
  // Chat State
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `System Online. I am the portfolio assistant. Accessing data nodes... Ready for queries about ${PERSONAL_INFO.name}.`, timestamp: new Date() }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // UI State
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: chatInput, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    const replyText = await sendMessageToGemini(chatInput);
    
    setMessages(prev => [...prev, { role: 'model', text: replyText, timestamp: new Date() }]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Filter Projects
  const webProjects = PROJECTS.filter(p => p.category === 'web' || p.category === 'iot');
  const mobileProjects = PROJECTS.filter(p => p.category === 'mobile' || p.category === 'cross-platform');
  const gameProjects = PROJECTS.filter(p => p.category === 'game' || p.category === 'html5');

  const SocialRow = ({ icon: Icon, label, value, link, fieldId }: any) => (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group/item">
       <div className="flex items-center gap-3 overflow-hidden">
         <div className="p-2 rounded-lg bg-black/50 text-gray-400 group-hover/item:text-cyan-400 transition-colors">
            <Icon size={18} />
         </div>
         <div className="flex flex-col min-w-0">
           <span className="text-xs text-gray-500 font-mono">{label}</span>
           {link ? (
               <a href={link} target="_blank" rel="noreferrer" className="text-sm text-gray-200 truncate font-medium hover:text-cyan-400 transition-colors">
                  {value}
               </a>
           ) : (
               <span className="text-sm text-gray-200 truncate font-medium">{value}</span>
           )}
         </div>
       </div>
       <button onClick={() => copyToClipboard(link || value, fieldId)} className="p-2 hover:text-cyan-400 text-gray-500 transition-colors">
         {copiedField === fieldId ? <Check size={18} className="text-green-500"/> : <Copy size={18} />}
       </button>
    </div>
  );

  // (No modal preview state — inline previews are used and lazy-loaded)

  const ProjectCard: React.FC<{ project: typeof PROJECTS[0]; index?: number }> = ({ project, index = 0 }) => (
    <div className="group flex flex-col bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all hover:bg-white/[0.02] h-full">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-2 rounded-lg ${project.category === 'mobile' ? 'bg-purple-500/10 text-purple-400' : project.category === 'game' ? 'bg-amber-500/10 text-amber-400' : 'bg-cyan-500/10 text-cyan-400'}`}>
            {project.category === 'mobile' ? <Smartphone size={24} /> : project.category === 'game' ? <Activity size={24} /> : <Globe size={24} />}
        </div>
        <ArrowUpRight size={20} className="text-gray-600 group-hover:text-white transition-colors" />
      </div>
      <h3 className="text-xl font-bold text-gray-200 mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
      <p className="text-sm text-gray-400 mb-4 line-clamp-3 flex-1">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map(t => (
          <span key={t} className="text-[10px] uppercase font-bold tracking-wider text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5 group-hover:border-white/10">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => window.open(project.link, '_blank', 'noopener')}
          className="px-3 py-1 rounded bg-white/5 text-sm hover:bg-white/10 border border-white/5"
        >
          Open
        </button>
        {(project.category === 'web' || project.category === 'iot' || project.category === 'game') && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              const btn = e.currentTarget as HTMLElement;
              const card = btn.closest('.group') as HTMLElement | null;
              if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="px-3 py-1 rounded bg-cyan-500/10 text-sm text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/10 flex items-center gap-2"
          >
            <Eye size={14} /> Preview
          </button>
        )}
      </div>

      {/* Inline lazy preview for web/iot/game projects (auto-open but lazy-loaded) */}
      {(project.category === 'web' || project.category === 'iot' || project.category === 'game') && (
        project.category === 'game' ? (
          <GamePreview url={project.link} index={index} />
        ) : (
          <SitePreview url={project.link} index={index} />
        )
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-cyan-500 selection:text-black pb-20 pt-24">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* LEFT: Intro & Skills */}
          <div className="space-y-10 animate-fade-in-up">
             <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-2">
                  Available for Hire
                </div>
                <h1 className="text-5xl md:text-6xl font-bold font-space text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                  {PERSONAL_INFO.name}
                </h1>
                <h2 className="text-2xl text-gray-400 font-light">{PERSONAL_INFO.title}</h2>
                <p className="text-gray-400 leading-relaxed text-lg max-w-xl">
                  {PERSONAL_INFO.summary}
                </p>

                {/* Experience Box */}
                <div className="inline-flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider leading-none mb-1">Total Experience</p>
                    <p className="text-lg font-bold text-gray-200 leading-none">3+ Years</p>
                  </div>
                </div>
             </div>

             <div className="space-y-4">
               <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Full Tech Stack</h3>
               <div className="flex flex-wrap gap-2">
                  {SKILLS.flatMap(s => s.items).map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-mono hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
               </div>
             </div>
          </div>

          {/* RIGHT: Contact Card */}
          <div className="lg:pl-12 flex flex-col justify-center">
            <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/20 transition-all duration-500" />
               
               <h3 className="text-xl font-bold font-space mb-6 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 Contact Information
               </h3>

               <div className="space-y-3">
                  <SocialRow icon={Mail} label="Email" value={PERSONAL_INFO.email} fieldId="email" />
                  <SocialRow icon={Phone} label="Phone" value={PERSONAL_INFO.phone} fieldId="phone" />
                  <SocialRow icon={Github} label="GitHub" value="github.com/lonshanworld" link={PERSONAL_INFO.github} fieldId="github" />
                  <SocialRow icon={Linkedin} label="LinkedIn" value="linkedin.com/in/lon-shan" link={PERSONAL_INFO.linkedin} fieldId="linkedin" />
                  <SocialRow icon={FileText} label="JobsDB" value="th.jobsdb.com/profile..." link={PERSONAL_INFO.jobsdb} fieldId="jobsdb" />
                  {/* Download CV (Google Drive) */}
                  <button
                    onClick={() => {
                      const url = `https://drive.google.com/uc?export=download&id=${RESUME_DRIVE_FILE_ID}`;
                      window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                    className="w-full mt-2 px-4 py-2 rounded-lg bg-cyan-500 text-black font-medium hover:bg-cyan-600 flex items-center justify-center gap-2"
                  >
                    <FileText size={16} />
                    <span>Download CV</span>
                  </button>

                  {/* Location */}
                  <div className="flex items-start gap-3 p-3 text-xs text-gray-500 mt-2">
                      <MapPin size={16} className="mt-0.5 shrink-0" />
                      <span>{PERSONAL_INFO.location}</span>
                   </div>
               </div>
            </div>
          </div>
        </div>

        {/* AI INTERFACE - NEURAL HUD DESIGN */}
        <div className="max-w-4xl mx-auto mb-24 animate-fade-in-up animation-delay-200">
           {/* Glass Container */}
           <div className="relative bg-[#080808]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[450px]">
             
             {/* Decorative HUD Elements */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
             <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />
             
             {/* Tech Header */}
             <div className="relative bg-black/40 px-6 py-3 border-b border-white/5 flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2 text-cyan-400">
                      <Zap size={16} className="fill-cyan-400/20" />
                      <span className="font-space font-bold text-sm tracking-wider">AI_CORE_V2.5</span>
                   </div>
                   <div className="h-4 w-px bg-white/10" />
                   <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                      <Wifi size={12} className="text-green-500" />
                      <span>UPLINK_ESTABLISHED</span>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-400 animate-pulse">
                     LIVE
                   </div>
                   <Activity size={16} className="text-gray-600" />
                </div>
             </div>

             {/* Messages Area */}
             <div className="relative flex-1 overflow-y-auto modern-scroll p-6 space-y-6 z-10">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`
                      max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed relative
                      ${msg.role === 'user' 
                        ? 'bg-cyan-500/10 text-cyan-100 border border-cyan-500/20 rounded-tr-sm' 
                        : 'bg-white/5 text-gray-300 border border-white/10 rounded-tl-sm'}
                    `}>
                      {/* Technical Label for Message */}
                      <span className="absolute -top-3 text-[9px] font-mono text-gray-500 px-2 bg-[#080808] border border-white/5 rounded">
                        {msg.role === 'user' ? 'USR_INPUT' : 'SYS_RESP'}
                      </span>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                     <div className="bg-white/5 text-gray-400 px-4 py-3 rounded-2xl rounded-tl-sm border border-white/10 text-xs font-mono flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-500/50 rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-cyan-500/50 rounded-full animate-bounce delay-75" />
                        <span className="w-2 h-2 bg-cyan-500/50 rounded-full animate-bounce delay-150" />
                        PROCESSING...
                     </div>
                  </div>
                )}
             </div>

             {/* Input Area */}
             <div className="relative p-2 z-20">
                <div className="relative flex items-center bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus-within:border-cyan-500/50 focus-within:bg-black/80 transition-all duration-300 shadow-lg">
                   <Terminal size={18} className="text-gray-500 mr-3" />
                   <input
                     type="text"
                     value={chatInput}
                     onChange={(e) => setChatInput(e.target.value)}
                     onKeyPress={handleKeyPress}
                     placeholder="Initialize query protocol..."
                     className="flex-1 bg-transparent border-none outline-none ring-0 focus:ring-0 text-gray-200 font-mono text-sm placeholder-gray-600 w-full"
                     autoComplete="off"
                   />
                   <button 
                     onClick={handleSendMessage}
                     disabled={!chatInput.trim()}
                     className="ml-2 p-2 text-gray-400 hover:text-cyan-400 disabled:opacity-30 hover:bg-cyan-500/10 rounded-lg transition-all"
                   >
                     <Send size={18} />
                   </button>
                </div>
             </div>
           </div>
        </div>

        {/* PROJECTS SECTION - Separated by Category */}
        <section className="mb-24">
            <div className="flex items-center gap-3 mb-12">
                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400"><Cpu size={24} /></div>
                <h2 className="text-3xl font-bold font-space">Featured Projects</h2>
                <div className="h-px bg-white/10 flex-1 ml-4" />
            </div>
            
            {/* Games Section (render first) */}
            {gameProjects.length > 0 && (
              <div className="mb-16">
                <h3 className="text-xl font-bold text-gray-300 mb-6 flex items-center gap-2 pl-2">
                    <Activity size={20} className="text-amber-400" /> Games
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {gameProjects.map((project, idx) => (
                      <ProjectCard key={project.id} project={project} index={idx} />
                    ))}
                </div>
              </div>
            )}

            {/* Web Projects */}
            <div className="mb-16">
              <h3 className="text-xl font-bold text-gray-300 mb-6 flex items-center gap-2 pl-2">
                  <Globe size={20} className="text-cyan-400" /> Web Development
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {webProjects.map((project, idx) => (
                    <ProjectCard key={project.id} project={project} index={idx + gameProjects.length} />
                  ))}
              </div>
            </div>

            {/* Mobile Projects */}
            <div>
              <h3 className="text-xl font-bold text-gray-300 mb-6 flex items-center gap-2 pl-2">
                  <Smartphone size={20} className="text-purple-400" /> Mobile & Cross-Platform
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {mobileProjects.map((project, idx) => (
                    <ProjectCard key={project.id} project={project} index={idx + webProjects.length + gameProjects.length} />
                  ))}
              </div>
            </div>
        </section>

        {/* WORK HISTORY SECTION - Full Width Row */}
        <section className="mb-20">
            <div className="flex items-center gap-3 mb-10">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Layers size={24} /></div>
                <h2 className="text-3xl font-bold font-space">Work History</h2>
                <div className="h-px bg-white/10 flex-1 ml-4" />
            </div>

            <div className="relative border-l-2 border-white/10 ml-3 md:ml-6 space-y-12 pl-8 md:pl-12 py-2">
                {EXPERIENCES.map((exp, idx) => (
                  <div key={idx} className="relative group">
                      <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-5 h-5 rounded-full bg-[#050505] border-2 border-gray-600 group-hover:border-purple-500 transition-colors" />
                      
                      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-4">
                        <h3 className="text-xl font-bold text-gray-200 group-hover:text-purple-400 transition-colors">{exp.role}</h3>
                        <span className="font-mono text-sm text-cyan-400/80 bg-cyan-500/5 px-3 py-1 rounded-full border border-cyan-500/10">{exp.period}</span>
                      </div>
                      
                      <div className="text-base text-gray-400 mb-4 font-mono flex items-center gap-2">
                        <span className="text-white">{exp.company}</span>
                      </div>
                      
                      <p className="text-gray-400 leading-relaxed text-base max-w-4xl">{exp.description}</p>
                  </div>
                ))}
            </div>
        </section>

        {/* Built with Vite Badge */}
        <div className="mt-12 text-sm text-gray-400 flex items-center gap-2 justify-center">
          <img src="https://vitejs.dev/logo.svg" alt="Vite" className="w-5 h-5" />
          <span>Built with <a href="https://vitejs.dev" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">Vite</a></span>
        </div>

      </div>
    </div>
  );
};

export default ModernView;