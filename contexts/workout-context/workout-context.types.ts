export enum WorkoutExerciseSetType {
  WARM_UP = "WARM_UP",
  WORKING = "WORKING",
}

export enum ActionType {
  START_EXERCISE,
  FINISH_EXERCISE,
  ADD_SET,
  RESET,
  START_WORKOUT,
}

interface StartExerciseAction {
  type: ActionType.START_EXERCISE;
  payload: {
    exerciseId: string;
    exerciseName: string;
    primaryMuscles: string[];
    secondaryMuscles: string[];
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

interface StartWorkoutAction {
  type: ActionType.START_WORKOUT;
}

export type WorkoutAction =
  | StartExerciseAction
  | FinishExerciseAction
  | AddSetAction
  | ResetAction
  | StartWorkoutAction;

export type WorkoutExerciseSet = {
  reps: number;
  weights: number;
  type: WorkoutExerciseSetType;
};

export type WorkoutExercise = {
  name: string;
  exerciseId: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
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
