import api from '../api';
import {
  FETCH_TODOS_SUCCESS,
  ADD_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  TODO_ERROR,
} from './todoTypes';

export const fetchTodos = () => async (dispatch) => {
  try {
    const response = await api.get('/todos');
    dispatch({
      type: FETCH_TODOS_SUCCESS,
      payload: response.data.slice(0, 10),
    });
  } catch (error) {
    dispatch({
      type: TODO_ERROR,
      payload: error.message,
    });
  }
};

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

export const updateTodo = (id, updatedTodo) => (dispatch, getState) => {
    try {
      const { todos } = getState().todos;

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
