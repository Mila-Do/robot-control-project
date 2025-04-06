export interface AxisParameters {
  length: number;
  width: number;
}

export interface RobotState {
  axes: number[];
  parameters: AxisParameters[];
}

export type RobotAction = 
  | { type: 'MOVE_AXIS'; axisIndex: number; direction: 1 | -1 };

export const initialRobotState: RobotState = {
  axes: [0, 0], // Initial state with 2 axes
  parameters: [
    { length: 1, width: 0.2 }, // First axis
    { length: 1, width: 0.2 }, // Second axis
  ],
}; 