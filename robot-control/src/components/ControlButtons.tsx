'use client';

import { RobotState, RobotAction } from '@/lib/robot';

interface ControlButtonsProps {
  state: RobotState;
  dispatch: (action: RobotAction) => void;
}

export function ControlButtons({ state, dispatch }: ControlButtonsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4 animate-glow">CONTROLS</h2>
      
      {state.axes.map((axis, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-lg font-semibold">Axis {index + 1}</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => dispatch({ type: 'MOVE_AXIS', axisIndex: index, delta: 0.1 })}
              className="px-4 py-2 bg-neon-cyan/20 border border-neon-cyan rounded hover:bg-neon-cyan/30 transition-colors"
            >
              +
            </button>
            <button
              onClick={() => dispatch({ type: 'MOVE_AXIS', axisIndex: index, delta: -0.1 })}
              className="px-4 py-2 bg-neon-cyan/20 border border-neon-cyan rounded hover:bg-neon-cyan/30 transition-colors"
            >
              -
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 