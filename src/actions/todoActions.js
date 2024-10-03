import api from '../api';
import {
  FETCH_TODOS_SUCCESS,
  ADD_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  TODO_ERROR,
} from './todoTypes';

// Fetch only the first 10 todos
export const fetchTodos = () => async (dispatch) => {
  try {
    const response = await api.get('/todos');  // Get all todos
    dispatch({
      type: FETCH_TODOS_SUCCESS,
      payload: response.data.slice(0, 10),  // Limit the result to the first 10 todos
    });
  } catch (error) {
    dispatch({
      type: TODO_ERROR,
      payload: error.message,
    });
  }
};

// Add a new to-do
export const addTodo = (newTodo) => async (dispatch) => {
  try {
    const response = await api.post('/todos', newTodo);
    dispatch({
      type: ADD_TODO_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: TODO_ERROR,
      payload: error.message,
    });
  }
};

// Simulate updating a to-do locally
export const updateTodo = (id, updatedTodo) => (dispatch, getState) => {
    try {
      const { todos } = getState().todos;
  
      // Simulate updating the todo locally by modifying the state
      const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo));
  
      dispatch({
        type: UPDATE_TODO_SUCCESS,
        payload: updatedTodos,
      });
    } catch (error) {
      console.error('Error updating to-do:', error.message);
      dispatch({
        type: TODO_ERROR,
        payload: error.message,
      });
    }
  };
  

// Delete a to-do
export const deleteTodo = (id) => async (dispatch) => {
  try {
    await api.delete(`/todos/${id}`);
    dispatch({
      type: DELETE_TODO_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: TODO_ERROR,
      payload: error.message,
    });
  }
};
