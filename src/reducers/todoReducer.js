import {
    FETCH_TODOS_SUCCESS,
    ADD_TODO_SUCCESS,
    UPDATE_TODO_SUCCESS,
    DELETE_TODO_SUCCESS,
    TODO_ERROR,
  } from '../actions/todoTypes';
  
  const initialState = {
    todos: [], 
    error: null,
  };
  
  export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TODOS_SUCCESS:
        return {
          ...state,
          todos: action.payload,
          error: null,
        };
      case ADD_TODO_SUCCESS:
        return {
          ...state,
          todos: [action.payload, ...state.todos],
          error: null,
        };
      case UPDATE_TODO_SUCCESS:
        return {
          ...state,
          todos: action.payload,
          error: null,
        };
      case DELETE_TODO_SUCCESS:
        return {
          ...state,
          todos: state.todos.filter((todo) => todo.id !== action.payload),
          error: null,
        };
      case TODO_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  