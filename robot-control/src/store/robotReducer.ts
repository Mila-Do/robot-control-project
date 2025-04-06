import { RobotState, RobotAction } from '@/types/robot';

export function robotReducer(state: RobotState, action: RobotAction): RobotState {
  switch (action.type) {
    case 'MOVE_AXIS':
      const newAxes = [...state.axes];
      newAxes[action.axisIndex] += action.direction;
      return {
        ...state,
        axes: newAxes,
      };
    default:
      return state;
  }
} 