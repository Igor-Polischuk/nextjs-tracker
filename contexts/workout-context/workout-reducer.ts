import { ActionType, Workout, WorkoutAction } from "./workout-context.types";

export const initValue: Workout = {
  currentExercise: null,
  prevExercises: [],
  workoutStartTime: null,
};

export const workoutReducer = (
  state: Workout,
  action: WorkoutAction
): Workout => {
  switch (action.type) {
    case ActionType.START_EXERCISE:
      if (state.currentExercise) {
        throw new Error(
          `Cannot do action ${ActionType.START_EXERCISE}. Current exercise already exist`
        );
      }
      return {
        ...state,
        currentExercise: {
          name: action.payload.exerciseName,
          exerciseId: action.payload.exerciseId,
          sets: [],
        },
      };
    case ActionType.FINISH_EXERCISE:
      if (!state.currentExercise) {
        throw new Error(`Cannot ${action.type}. currentExercise is null`);
      }
      return {
        ...state,
        prevExercises: [...state.prevExercises, state.currentExercise],
        currentExercise: null,
      };
    case ActionType.ADD_SET:
      if (!state.currentExercise) {
        throw new Error(`Cannot ${action.type}. currentExercise is null`);
      }
      return {
        ...state,
        currentExercise: {
          ...state.currentExercise,
          sets: [...state.currentExercise.sets, action.payload],
        },
      };
    case ActionType.RESET:
      return initValue;
    case ActionType.START_WORKOUT:
      return {
        ...state,
        workoutStartTime: new Date(),
      };
    default:
      return state;
  }
};
