export type todo = {
  id: number;
  todo: string;
  isDone: boolean;
};

export type State = { todos: todo[]; isAuthenticated: boolean };

export type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; id: number }
  | { type: "DELETE_TODO"; id: number }
  | { type: "LOGIN" }
  | { type: "LOGOUT" };

export const initialState: State = { todos: [], isAuthenticated: false };

export const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: state.todos.length + 1, todo: action.payload, isDone: false },
        ],
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, isDone: !todo.isDone } : todo
        ),
      };
    case "LOGIN":
      return { ...state, isAuthenticated: true };
    case "LOGOUT":
      return { ...initialState };
    default:
      return state;
  }
};
