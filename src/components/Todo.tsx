import React, { useReducer, useState } from "react";
import { Action, State, todoReducer } from "../reducer/todoReducer";
import {
  Box,
  Button,
  Card,
  Container,
  Input,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { EventNote } from "@mui/icons-material";

const initialState: State = [];

const Todo = () => {
  const [input, setInput] = useState<string>("");
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    todoReducer,
    initialState
  );

  const inputHandler = (e: any) => {
    setInput(e);
  };

  const addBtnHandler = () => {
    if (input.trim()) {
      dispatch({ type: "ADD_TODO", payload: input });
      setInput("");
    }
  };
  const removeBtnHandler = (id: number) => {
    dispatch({ type: "DELETE_TODO", id });
  };
  const toggleBtnHandler = (id: number) => {
    dispatch({ type: "TOGGLE_TODO", id });
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addBtnHandler();
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          margin: "5rem 2rem",
          padding: "2rem",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Typography variant="h3">
          <EventNote
            sx={{
              fontSize: "2.5rem",
              marginRight: "1rem",
              marginLeft: "-2rem",
            }}
          />
          Todo App
        </Typography>
        <Input
          type="text"
          value={input}
          onChange={(e) => inputHandler(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Input your add todo"
          sx={{ width: "100%" }}
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: "grey", margin: "1rem" }}
          onClick={addBtnHandler}
        >
          Add Todo
        </Button>
        {state.map((todos, index) => (
          <>
            <List key={todos.id}>
              <ListItem
                key={todos.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {index + 1}.{todos.todo} {todos.isDone ? "✅" : "❌"}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    sx={{ margin: "0rem 1rem" }}
                    variant="outlined"
                    onClick={() => toggleBtnHandler(todos.id)}
                  >
                    {todos.isDone ? "Mark as Undone" : "Mark as Done"}
                  </Button>

                  <Button
                    sx={{ backgroundColor: "red", margin: "0rem 1rem" }}
                    variant="contained"
                    onClick={() => removeBtnHandler(todos.id)}
                  >
                    Remove
                  </Button>
                </Box>
              </ListItem>
            </List>
          </>
        ))}
      </Card>
    </Container>
  );
};

export default Todo;
