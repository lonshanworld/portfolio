import React, { useState } from 'react';
import { EXPERIENCES, PROJECTS, SKILLS, PERSONAL_INFO } from '../constants';
import GamePreview from './GamePreview';
import SitePreview from './SitePreview';
import { sendMessageToGemini } from '../services/geminiService';

// Cast marquee to any to bypass TypeScript validation
const Marquee = 'marquee' as any;

const RetroView: React.FC = () => {
  const [chatInput, setChatInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setLoading(true);
    setResponse(null);
    const text = await sendMessageToGemini(chatInput);
    setResponse(text);
    setLoading(false);
  };

  const webProjects = PROJECTS.filter(p => p.category === 'web' || p.category === 'iot');
  const mobileProjects = PROJECTS.filter(p => p.category === 'mobile' || p.category === 'cross-platform');
  const gameProjects = PROJECTS.filter(p => p.category === 'game' || p.category === 'html5');

  const ProjectList = ({ projects }: { projects: typeof PROJECTS }) => (
    <div className="space-y-8 mb-8">
      {projects.map((p, i) => (
        <fieldset key={p.id} className="border-2 border-black p-4 bg-[#f0f0f0] shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
          <legend className="px-2 font-bold text-lg border-2 border-black bg-white shadow-[2px_2px_0px_#000]">{p.title}</legend>

          <div className="flex flex-col gap-3">
            <div className="font-mono text-sm bg-gray-200 border border-gray-400 p-1 inline-block self-start">TYPE: {p.category.toUpperCase()}</div>

            <p className="text-base font-serif leading-relaxed">{p.description}</p>

            <div><strong>Stack:</strong> {p.tech.join(", ")}</div>

            <div className="mt-2 text-center">
               <a href={p.link} target="_blank" rel="noreferrer" className="inline-block w-full md:w-auto bg-gray-300 border-2 border-outset border-white px-6 py-1 text-black font-bold active:border-inset active:bg-gray-400">[ ACCESS PROJECT ]</a>
            </div>

            {/* Inline preview for website / IoT projects */}
            {(p.category === 'web' || p.category === 'iot') && (
              <div className="mt-4 flex justify-center">
                <SitePreview url={p.link} index={i} />
              </div>
            )}
          </div>
        </fieldset>
      ))}
    </div>
  );

  return (
    <div className="bg-[#c0c0c0] min-h-screen text-black font-serif p-4 pt-16">
      <div className="max-w-6xl mx-auto bg-white border-[2px] border-inset border-gray-400 p-8 shadow-none">
        
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <h1 className="text-5xl font-bold mb-2 tracking-tighter">{PERSONAL_INFO.name}'s Homepage</h1>
          <p className="font-mono text-lg">{PERSONAL_INFO.title}</p>
          <Marquee scrollamount="5" className="bg-black text-[#00FF00] font-mono py-2 text-lg mb-6 mt-4">
            *** WELCOME TO MY WORLD WIDE WEB CORNER *** CONSTRUCTION COMPLETE *** HIRE ME TODAY ***
          </Marquee>
          <hr className="border-t-4 border-gray-400 border-b border-white my-6" />
        </div>

        {/* Content Area */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-1/3 min-w-[250px] space-y-8">
             
             {/* AI Assistant - DOS TERMINAL STYLE */}
            <div className="bg-black border-4 border-double border-gray-500 p-2 shadow-[8px_8px_0px_#888]">
              <div className="border-b border-green-700 pb-1 mb-2 text-green-500 font-mono text-xs font-bold tracking-wider">
                C:\SYSTEM\AI_HELPER.EXE
              </div>
              
              <div className="font-mono text-green-400 text-sm min-h-[150px] mb-2 p-1 overflow-y-auto max-h-[300px]">
                <p className="mb-2">HOST_SYSTEM: Online</p>
                <p className="mb-2">READY_FOR_QUERY...</p>
                {loading && <p className="animate-pulse">&gt; PROCESSING_REQUEST...</p>}
                {response && (
                  <div className="mt-2 text-white">
                    <span className="text-green-500">&gt;&gt;</span> {response}
                  </div>
                )}
              </div>

              <form onSubmit={handleAsk} className="flex gap-2 border-t border-green-900 pt-2 items-center">
                <span className="text-green-500 font-mono animate-pulse">&gt;</span>
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="w-full bg-transparent text-green-300 font-mono text-sm border-none outline-none placeholder-green-900"
                  placeholder="INPUT..."
                  autoComplete="off"
                />
                <button type="submit" className="bg-green-900 text-green-100 px-2 py-0.5 text-xs font-mono uppercase border border-green-700 hover:bg-green-700">
                  [SEND]
                </button>
              </form>
            </div>

            {/* Experience Info (Pure HTML Style) */}
            <div className="border border-black p-3 bg-white">
              <p className="font-mono text-sm mb-1">
                <b>YEARS OF EXPERIENCE:</b> 3+
              </p>
              <p className="font-mono text-sm">
                 <b>STATUS:</b> OPEN FOR WORK
              </p>
            </div>

            {/* Contact Card */}
            <div className="border border-black p-4 bg-[#ffffcc] text-center shadow-[6px_6px_0px_#000]">
              <p className="text-base font-bold bg-black text-white mb-3 py-1">CONTACT CARD</p>
              <div className="text-sm space-y-2 font-mono">
                <p><b>Tel:</b><br/>{PERSONAL_INFO.phone}</p>
                <p><b>Email:</b><br/><a href={`mailto:${PERSONAL_INFO.email}`} className="retro-link">{PERSONAL_INFO.email}</a></p>
                <p><b>Loc:</b><br/>Bangkok, TH</p>
              </div>
            </div>
            
            {/* Links */}
            <div className="border border-black p-4 bg-white shadow-[6px_6px_0px_#000]">
                <h3 className="font-bold border-b-2 border-black mb-3 text-lg">Web Links</h3>
                <ul className="list-disc pl-6 text-sm space-y-3 font-mono">
                  <li>
                    <b>LinkedIn:</b><br/>
                    <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="retro-link break-all">{PERSONAL_INFO.linkedin}</a>
                  </li>
                  <li>
                    <b>GitHub:</b><br/>
                    <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="retro-link break-all">{PERSONAL_INFO.github}</a>
                  </li>
                  <li>
                    <b>JobsDB:</b><br/>
                    <a href={PERSONAL_INFO.jobsdb} target="_blank" rel="noreferrer" className="retro-link break-all">{PERSONAL_INFO.jobsdb}</a>
                  </li>
                </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3">
            
            <a id="about"></a>
            <h2 className="text-2xl font-bold bg-blue-800 text-white px-3 py-2 mb-4 border-4 border-outset border-gray-400 shadow-md">1. Introduction</h2>
            <p className="mb-8 font-medium text-lg leading-relaxed font-sans">
              {PERSONAL_INFO.summary}
            </p>

            <a id="skills"></a>
            <h2 className="text-2xl font-bold bg-blue-800 text-white px-3 py-2 mb-4 border-4 border-outset border-gray-400 shadow-md">2. My Skills</h2>
            <ul className="list-square pl-8 mb-8 text-lg">
              {SKILLS.map(s => (
                <li key={s.category} className="mb-3">
                  <b>{s.category}:</b> {s.items.join(", ")}
                </li>
              ))}
            </ul>

            <a id="experience"></a>
             <h2 className="text-2xl font-bold bg-blue-800 text-white px-3 py-2 mb-4 border-4 border-outset border-gray-400 shadow-md">3. Work History</h2>
             {EXPERIENCES.map((exp, i) => (
               <dl key={i} className="mb-8 border-l-8 border-gray-500 pl-6 bg-gray-50 p-4 border border-r-2 border-b-2 border-gray-300">
                 <dt className="font-bold text-xl">{exp.role}</dt>
                 <dd className="font-mono text-base bg-yellow-200 inline-block px-2 border border-black my-2 shadow-[2px_2px_0px_#000]">@ {exp.company}</dd>
                 <dd className="italic mb-3 text-base text-gray-700">({exp.period})</dd>
                 <dd className="text-base leading-relaxed font-serif">{exp.description}</dd>
               </dl>
             ))}

            <a id="projects"></a>
            <h2 className="text-2xl font-bold bg-blue-800 text-white px-3 py-2 mb-4 border-4 border-outset border-gray-400 shadow-md">4. Projects</h2>
            
            <div className="mb-8">
                {gameProjects.length > 0 && (
                  <>
                    <h3 className="font-bold text-xl mb-4 border-b-2 border-black inline-block">4.1 Games</h3>
                    <div className="space-y-8 mb-8">
                      {gameProjects.map((p, gi) => (
                        <fieldset key={p.id} className="border-2 border-black p-4 bg-[#f0f0f0] shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
                          <legend className="px-2 font-bold text-lg border-2 border-black bg-white shadow-[2px_2px_0px_#000]">{p.title}</legend>
                          <div className="flex flex-col gap-3">
                            <div className="font-mono text-sm bg-gray-200 border border-gray-400 p-1 inline-block self-start">TYPE: {p.category.toUpperCase()}</div>
                            <p className="text-base font-serif leading-relaxed">{p.description}</p>
                            <div><strong>Stack:</strong> {p.tech.join(", ")}</div>
                            <div className="mt-2 text-center">
                              <a href={p.link} target="_blank" rel="noreferrer" className="inline-block w-full md:w-auto bg-gray-300 border-2 border-outset border-white px-6 py-1 text-black font-bold active:border-inset active:bg-gray-400">[ ACCESS PROJECT ]</a>
                            </div>
                            <div className="mt-4 flex justify-center">
                              <GamePreview url={p.link} index={gi} />
                            </div>
                          </div>
                        </fieldset>
                      ))}
                    </div>
                  </>
                )}

                <h3 className="font-bold text-xl mb-4 border-b-2 border-black inline-block mt-2">4.2 Web Applications</h3>
                <ProjectList projects={webProjects} />

                <h3 className="font-bold text-xl mb-4 border-b-2 border-black inline-block mt-4">4.3 Mobile Solutions</h3>
                <ProjectList projects={mobileProjects} />
            </div>

          </div>
        </div>

        <div className="text-center mt-12 text-sm text-gray-500 border-t border-gray-400 pt-4">
          <p>Best viewed with Netscape Navigator 4.0 or Internet Explorer 5.0</p>
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
          <p>&copy; 1999 {PERSONAL_INFO.name}. All rights reserved.</p>
          <p className="mt-2">Built with <a href="https://vitejs.dev" target="_blank" rel="noreferrer" className="retro-link">Vite</a></p>
        </div>

      </div>
    </div>
  );
};

export default RetroView;