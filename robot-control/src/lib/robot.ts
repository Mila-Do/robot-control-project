export interface RobotAxis {
  angle: number;
  length: number;
  width: number;
}

export interface RobotState {
  axes: number[];
  parameters: { length: number; width: number }[];
}

export type RobotAction = 
  | { type: 'MOVE_AXIS'; axisIndex: number; delta: number }
  | { type: 'SET_AXIS_PARAMS'; axisIndex: number; length: number; width: number };

export function robotReducer(state: RobotState, action: RobotAction): RobotState {
  switch (action.type) {
    case 'MOVE_AXIS':
      return {
        ...state,
        axes: state.axes.map((angle, index) => 
          index === action.axisIndex 
            ? angle + action.delta
            : angle
        ),
      };
    case 'SET_AXIS_PARAMS':
      return {
        ...state,
        parameters: state.parameters.map((params, index) => 
          index === action.axisIndex 
            ? { length: action.length, width: action.width }
            : params
        ),
      };
    default:
      return state;
  }
} 