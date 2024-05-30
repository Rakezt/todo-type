export type todo = {
  id: number;
  todo: string;
  isDone: boolean;
};

export type State = todo[];

export type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; id: number }
  | { type: "DELETE_TODO"; id: number };

export const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: state.length + 1, todo: action.payload, isDone: false },
      ];
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, isDone: !todo.isDone } : todo
      );
    default:
      return state;
  }
};
