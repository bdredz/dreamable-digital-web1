/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, PhoneCall, Volume2, Award, ArrowUpRight, ArrowRight, Play, RefreshCw, Layers } from 'lucide-react';
import { SCRIPTS } from '../data';
import { ScriptTemplate } from '../types';

export default function PhoneScriptPlayer() {
  const [activeScript, setActiveScript] = useState<ScriptTemplate>(SCRIPTS[0]);
  const [isSimulatorMode, setIsSimulatorMode] = useState(false);
  const [simulatorStep, setSimulatorStep] = useState(0);

  const resetSimulator = () => {
    setSimulatorStep(0);
  };

  const currentDialogue = activeScript.dialogue[simulatorStep];

  return (
    <div id="phone-script-player" className="w-full bg-stone-950 border border-stone-900 rounded-3xl overflow-hidden shadow-2xl">
      {/* Script Section Header */}
      <div className="bg-stone-900 px-6 py-5 border-b border-stone-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <PhoneCall className="w-5 h-5 text-emerald-400" />
          <div>
            <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider font-bold">Included Asset Preview</span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Proven Outreach Script Library</h3>
          </div>
        </div>
        <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto">
          {SCRIPTS.map(script => (
            <button
              id={`select-script-${script.id}`}
              key={script.id}
              onClick={() => {
                setActiveScript(script);
                setIsSimulatorMode(false);
                resetSimulator();
              }}
              className={`py-1.5 px-3.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeScript.id === script.id
                  ? 'bg-white text-black'
                  : 'bg-stone-850 text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              {script.title.split(' ')[0]} {script.title.split(' ')[1] || ''}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
        {/* LEFT COMPONENT: Detailed Script Layout or Call Simulator */}
        <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-900">
          <AnimatePresence mode="wait">
            {!isSimulatorMode ? (
              /* STANDARD VIEW */
              <motion.div
                key="script-standard"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="py-0.5 px-2 bg-stone-850 rounded text-[10px] font-mono font-semibold text-stone-300">
                      {activeScript.category}
                    </span>
                    <span className="py-0.5 px-2 bg-stone-850 rounded text-[10px] font-mono font-semibold text-stone-300">
                      Difficulty: {activeScript.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight mt-3">{activeScript.title}</h3>
                  <p className="text-stone-400 text-xs mt-1 leading-relaxed italic">Scenario: {activeScript.scenario}</p>

                  {/* Standard Static dialogue tree */}
                  <div className="space-y-3 mt-5 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                    {activeScript.dialogue.slice(0, 3).map((line, idx) => (
                      <div key={idx} className="text-xs space-y-1">
                        <span className={`font-bold uppercase tracking-wider text-[10px] ${
                          line.role === 'agent' ? 'text-emerald-400' : 'text-stone-400'
                        }`}>
                          {line.role === 'agent' ? '👤 Agent (You)' : '🏡 Homeowner'}
                        </span>
                        <p className={`p-2.5 rounded-xl border leading-relaxed ${
                          line.role === 'agent' 
                            ? 'bg-emerald-950/10 border-emerald-900/30 text-emerald-100' 
                            : 'bg-stone-900/60 border-stone-850 text-stone-300'
                        }`}>
                          {line.text}
                        </p>
                      </div>
                    ))}
                    <div className="text-[10px] text-stone-500 text-center font-semibold pt-1">
                      + {activeScript.dialogue.length - 3} more dialogue steps included in package
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-900 mt-5">
                  <button
                    id="launch-call-simulator"
                    onClick={() => {
                      setIsSimulatorMode(true);
                      resetSimulator();
                    }}
                    className="py-3 px-5 bg-stone-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-stone-700 transition-colors w-full sm:w-auto cursor-pointer"
                  >
                    <Play className="w-4 h-4 text-emerald-400" />
                    <span>Launch Dialogue Training Simulator</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              /* PROGRESSIVE SIMULATOR VIEW */
              <motion.div
                key="script-simulator"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center pb-2 border-b border-stone-900">
                    <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 py-0.5 px-2 rounded font-bold flex items-center gap-1">
                      <Volume2 className="w-3 h-3 animate-pulse" /> Live Dialogue Simulation
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono">
                      Dialogue Step {simulatorStep + 1} of {activeScript.dialogue.length}
                    </span>
                  </div>

                  <div className="space-y-4 mt-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={simulatorStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-2.5"
                      >
                        <span className={`font-semibold uppercase tracking-[0.15em] text-[10px] flex items-center gap-1.5 ${
                          currentDialogue.role === 'agent' ? 'text-emerald-400' : 'text-stone-400'
                        }`}>
                          {currentDialogue.role === 'agent' ? (
                            <>
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                              🔊 Read this aloud to the prospect:
                            </>
                          ) : (
                            <>
                              <span className="w-2 h-2 rounded-full bg-stone-600" />
                              🏡 HOMEOWNER REPLY:
                            </>
                          )}
                        </span>
                        
                        <div className={`p-5 rounded-2xl text-xs leading-relaxed border shadow-sm ${
                          currentDialogue.role === 'agent'
                            ? 'bg-emerald-950/10 border-emerald-900/50 text-emerald-100 font-medium text-sm'
                            : 'bg-stone-900/80 border-stone-850 text-stone-200 text-sm italic'
                        }`}>
                          "{currentDialogue.text}"
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-900 flex flex-col sm:flex-row gap-2.5 justify-between items-center">
                  <button
                    id="exit-simulator"
                    onClick={() => setIsSimulatorMode(false)}
                    className="text-stone-400 hover:text-white text-xs font-semibold cursor-pointer"
                  >
                    Exit Simulator
                  </button>

                  <div className="flex gap-2">
                    {simulatorStep > 0 && (
                      <button
                        id="prev-sim-step"
                        onClick={() => setSimulatorStep(prev => prev - 1)}
                        className="py-2.5 px-3.5 rounded-xl border border-stone-800 text-stone-400 hover:text-white hover:bg-stone-900 transition-all text-xs cursor-pointer"
                      >
                        Previous Line
                      </button>
                    )}

                    {simulatorStep < activeScript.dialogue.length - 1 ? (
                      <button
                        id="next-sim-step"
                        onClick={() => setSimulatorStep(prev => prev + 1)}
                        className="py-2.5 px-4 bg-white text-black hover:bg-stone-200 transition-all font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{currentDialogue.role === 'agent' ? 'Listen to homeowner reply' : 'Deliver counter pitch'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        id="reset-sim"
                        onClick={resetSimulator}
                        className="py-2.5 px-4 bg-emerald-500/10 border border-emerald-900/30 text-emerald-400 hover:bg-emerald-500/20 transition-all font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Restart Sourcing Session</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT COMPONENT: Critical advisor tips (REDX-Style pro checklist insights) */}
        <div className="lg:col-span-5 p-6 md:p-8 bg-stone-950/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-stone-400 mb-4">
              <Award className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Prospect Sourcing Coach Tips</h4>
            </div>

            <ul className="space-y-4">
              {activeScript.proTips.map((tip, idx) => (
                <li key={idx} className="flex gap-2.5 items-start text-xs text-stone-300">
                  <div className="w-5 h-5 rounded-full bg-stone-900 text-[10px] font-bold flex items-center justify-center border border-stone-850 flex-shrink-0 text-white mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-stone-900 mt-6 md:mt-0 text-[11px] text-stone-500 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-stone-400" /> High-conversion Blueprint
            </span>
            <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1 text-[10px]">
              Proven closing rates of +18.4% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
