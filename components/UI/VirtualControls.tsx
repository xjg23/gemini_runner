
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUp, Shield, Zap } from 'lucide-react';
import { useStore } from '../../store';

export const VirtualControls: React.FC = () => {
    const { isImmortalityActive, hasImmortality } = useStore();

    const emit = (event: string) => {
        window.dispatchEvent(new Event(event));
    };

    const handleInput = (e: React.PointerEvent, eventName: string) => {
        e.preventDefault();
        e.stopPropagation();
        emit(eventName);
    };

    return (
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 flex justify-between items-end z-[60] pointer-events-none select-none lg:hidden">
            {/* Left Hand: Movement */}
            <div className="flex gap-4 pointer-events-auto">
                <button
                    className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_10px_rgba(0,255,255,0.2)] active:bg-cyan-500/40 active:scale-95 transition-all flex items-center justify-center group"
                    onPointerDown={(e) => handleInput(e, 'virtual-move-left')}
                    aria-label="Move Left"
                >
                    <ArrowLeft className="w-8 h-8 text-cyan-100 group-active:text-white" />
                </button>
                <button
                    className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_10px_rgba(0,255,255,0.2)] active:bg-cyan-500/40 active:scale-95 transition-all flex items-center justify-center group"
                    onPointerDown={(e) => handleInput(e, 'virtual-move-right')}
                    aria-label="Move Right"
                >
                    <ArrowRight className="w-8 h-8 text-cyan-100 group-active:text-white" />
                </button>
            </div>

            {/* Right Hand: Action & Jump */}
            <div className="flex items-end gap-6 pointer-events-auto">
                {/* Ability Button - Only show if possessed */}
                {hasImmortality && (
                     <button
                        className={`w-14 h-14 mb-1 rounded-full backdrop-blur-md border shadow-[0_0_10px_rgba(255,215,0,0.3)] active:scale-95 transition-all flex items-center justify-center ${
                            isImmortalityActive 
                            ? 'bg-yellow-500/40 border-yellow-300' 
                            : 'bg-yellow-500/10 border-yellow-500/30 active:bg-yellow-500/40'
                        }`}
                        onPointerDown={(e) => handleInput(e, 'virtual-ability')}
                        aria-label="Use Ability"
                    >
                        <Shield className={`w-6 h-6 ${isImmortalityActive ? 'text-white' : 'text-yellow-400'}`} />
                    </button>
                )}

                {/* Jump Button - Larger */}
                <button
                    className="w-20 h-20 rounded-full bg-purple-600/20 backdrop-blur-md border border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.3)] active:bg-purple-600/50 active:scale-95 transition-all flex items-center justify-center group"
                    onPointerDown={(e) => handleInput(e, 'virtual-jump')}
                    aria-label="Jump"
                >
                    <ArrowUp className="w-10 h-10 text-purple-100 group-active:text-white" />
                </button>
            </div>
        </div>
    );
};
