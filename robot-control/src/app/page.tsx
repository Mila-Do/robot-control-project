'use client';

import { useReducer } from 'react';
import { RobotState, robotReducer } from '@/lib/robot';
import { RobotVisualization } from '@/components/RobotVisualization';
import { ControlButtons } from '@/components/ControlButtons';

const initialState: RobotState = {
  axes: [0, 0],
  parameters: [
    { length: 1, width: 0.2 },
    { length: 1, width: 0.2 },
  ],
};

export default function Home() {
  const [state, dispatch] = useReducer(robotReducer, initialState);

  return (
    <main className="min-h-screen bg-black text-neon-cyan p-4">
      <div className="relative h-full">
        {/* Background effects */}
        <div className="fixed inset-0 bg-gradient-to-b from-transparent via-neon-cyan/10 to-transparent animate-scanline pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/50 to-black pointer-events-none" />
        
        <div className="container mx-auto h-full">
          <h1 className="text-4xl font-bold text-center mb-8 animate-glow">
            ROBOT CONTROL SYSTEM
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[calc(100vh-8rem)]">
            {/* Visualization panel */}
            <div className="relative h-full">
              <div className="absolute inset-0 border-2 border-neon-cyan/50 rounded-lg animate-flicker" />
              <div className="relative h-full p-4">
                <RobotVisualization state={state} />
              </div>
            </div>
            
            {/* Controls panel */}
            <div className="relative h-full z-10">
              <div className="absolute inset-0 border-2 border-neon-pink/50 rounded-lg animate-flicker" />
              <div className="relative h-full p-4 bg-black/50 backdrop-blur-sm">
                <ControlButtons state={state} dispatch={dispatch} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
