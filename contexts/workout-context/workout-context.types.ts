export enum WorkoutExerciseSetType {
  WARM_UP,
  WORKING,
}

export enum ActionType {
  START_EXERCISE,
  FINISH_EXERCISE,
  ADD_SET,
  RESET,
}

interface StartExerciseAction {
  type: ActionType.START_EXERCISE;
  payload: {
    exerciseId: string;
  };
}

interface FinishExerciseAction {
  type: ActionType.FINISH_EXERCISE;
}

interface AddSetAction {
  type: ActionType.ADD_SET;
  payload: WorkoutExerciseSet;
}

interface ResetAction {
  type: ActionType.RESET;
}

export type WorkoutAction =
  | StartExerciseAction
  | FinishExerciseAction
  | AddSetAction
  | ResetAction;

export type WorkoutExerciseSet = {
  reps: number;
  weights: number;
  type: WorkoutExerciseSetType;
};

export type WorkoutExercise = {
  name: string;
  exerciseId: string;
  sets: WorkoutExerciseSet[];
};

export type Workout = {
  workoutStartTime: Date | null;
  currentExercise: WorkoutExercise | null;
  prevExercises: WorkoutExercise[];
};

export type WorkoutContext = {
  state: Workout;
  dispatch: React.Dispatch<WorkoutAction>;
};
