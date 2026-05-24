/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Loader2, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface ZipAvailabilityCheckerProps {
  onSuccess: (zip: string) => void;
}

export default function ZipAvailabilityChecker({ onSuccess }: ZipAvailabilityCheckerProps) {
  const [zip, setZip] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [results, setResults] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZip(e.target.value.replace(/\D/g, '').slice(0, 5));
    if (status === 'error' || status === 'success') {
      setStatus('idle');
    }
  };

  const checkAvailability = async (e: React.FormEvent) => {
    e.preventDefault();
    if (zip.length !== 5) {
      setErrorMsg('Please enter a valid 5-digit US ZIP code.');
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      // Hit our Express backend
      const response = await fetch('/api/check-zip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ zip }),
      });

      const data = await response.json();

      if (response.ok) {
        // Wait a small bit to simulate high-compute predictive scanning and calculations
        setTimeout(() => {
          setResults(data);
          setStatus('success');
        }, 1200);
      } else {
        setErrorMsg(data.error || 'Check failed. Please try again.');
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Connection error. Server may be in warm-up.');
      setStatus('error');
    }
  };

  return (
    <div id="zip-checker-container" className="w-full max-w-xl mx-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-stone-700 via-neutral-100 to-stone-700" />
        
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 text-center">
          ⚡ Secure Territory Lock Check
        </h3>
        <p className="text-stone-400 text-xs text-center mb-6 max-w-xs mx-auto">
          Predictive territories are strictly exclusive. Enter your zip code to query localized pre-market home listings.
        </p>

        <form onSubmit={checkAvailability} className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
            <input
              id="zip-input"
              type="text"
              placeholder="Enter 5-digit ZIP (e.g., 90210, 30303)"
              value={zip}
              onChange={handleTextChange}
              disabled={status === 'loading'}
              className="w-full bg-stone-950 border border-stone-800 hover:border-stone-700 focus:border-stone-500 rounded-xl py-3 pl-10 pr-4 text-stone-100 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-white text-xs transition-all font-mono"
            />
          </div>
          <button
            id="zip-search-button"
            type="submit"
            disabled={status === 'loading'}
            className="bg-white hover:bg-stone-200 disabled:bg-stone-850 text-black py-3 px-6 rounded-xl font-bold text-xs transition-all active:scale-[0.98] disabled:scale-100 flex items-center justify-center gap-2 cursor-pointer"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-stone-700" />
                <span>Scanning Databases...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Search Neighborhood</span>
              </>
            )}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {status === 'loading' && (
            <motion.div
              key="loading-prompt"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-3 bg-stone-950/40 rounded-xl text-[11px] text-stone-400 font-mono text-center space-y-1 border border-stone-900"
            >
              <div className="flex justify-center items-center gap-1.5 text-white">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Running localized predictive model pipeline...</span>
              </div>
              <p className="text-[10px] text-stone-500">Evaluating: Property deed history, local home equity triggers, neighborhood turnover index</p>
            </motion.div>
          )}

          {status === 'success' && results && (
            <motion.div
              key="success-prompt"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mt-5 p-4 bg-emerald-950/20 border border-emerald-900/40 rounded-xl space-y-3.5"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    {results.exclusiveStatus === 'AVAILABLE_EXCLUSIVE' ? '✨ UNLOCKED — Territory Available!' : '🔥 HIGH DEMAND — Limited Allotment'}
                  </h4>
                  <p className="text-stone-400 text-[11px] leading-relaxed mt-0.5">
                    We located a goldmine of pre-market behavioral signals in ZIP <strong>{results.zip}</strong>. This territory is currently open for complete exclusive lock.
                  </p>
                </div>
              </div>

              {/* Score indicators grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-center pt-1">
                <div className="bg-stone-950 p-2 rounded-lg border border-stone-800">
                  <div className="text-[10px] uppercase text-stone-500 font-mono">Behavioral Sellers</div>
                  <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">{results.leadsCount}</div>
                </div>
                <div className="bg-stone-950 p-2 rounded-lg border border-stone-800">
                  <div className="text-[10px] uppercase text-stone-500 font-mono">Hot Prospects</div>
                  <div className="text-base font-bold text-white font-mono mt-0.5">{results.hotSellersCount}</div>
                </div>
                <div className="bg-stone-950 p-2 rounded-lg border border-stone-800">
                  <div className="text-[10px] uppercase text-stone-500 font-mono">Demand Multiplier</div>
                  <div className="text-base font-bold text-white font-mono mt-0.5">{results.demandMultiplier}x</div>
                </div>
                <div className="bg-stone-950 p-2 rounded-lg border border-stone-800">
                  <div className="text-[10px] uppercase text-stone-500 font-mono">Turnover Index</div>
                  <div className="text-base font-bold text-white font-mono mt-0.5">+{results.growthPercent}%</div>
                </div>
              </div>

              <button
                id="claim-territory-button"
                type="button"
                onClick={() => onSuccess(results.zip)}
                className="w-full py-3 px-4 bg-emerald-500 text-black hover:bg-emerald-400 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md group/btn cursor-pointer"
              >
                <span>Securly Lock & Claim {results.zip} Territory</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              key="error-prompt"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-3.5 bg-red-950/20 border border-red-900/30 rounded-xl flex items-start gap-2.5 text-xs text-red-200"
            >
              <AlertTriangle className="w-4.5 h-4.5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-red-100">Territory Validation Issue</span>
                <p className="text-[11px] text-red-300 mt-0.5">{errorMsg}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 pt-4 border-t border-stone-800/60 flex items-center justify-between text-[10px] text-stone-500">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
            <span>Exclusivity Lock Guarantee</span>
          </div>
          <span>Active Territories: Exclusive (1 Seat Max)</span>
        </div>
      </div>
    </div>
  );
}
