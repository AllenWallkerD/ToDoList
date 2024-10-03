import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Button, TextInput, FlatList, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../actions/todoActions';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);
  const error = useSelector(state => state.todos.error);

  const [newTodo, setNewTodo] = useState('');
  const [editTexts, setEditTexts] = useState({});

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const todo = { title: newTodo, completed: false };
      dispatch(addTodo(todo));
      setNewTodo('');
    }
  };

  const handleEditTodo = (id) => {
    const updatedTodo = { title: editTexts[id], completed: false };
    dispatch(updateTodo(id, updatedTodo));

    setEditTexts((prevEditTexts) => ({
      ...prevEditTexts,
      [id]: '', 
    }));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTextChange = (id, text) => {
    setEditTexts((prevEditTexts) => ({
      ...prevEditTexts,
      [id]: text,
    }));
  };

  return (
    <View style={styles.container}>
     <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <TextInput
        placeholder="Add new todo"
        value={newTodo}
        onChangeText={setNewTodo}
        style={styles.input}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>Error: {error}</Text>}

      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()} 
        renderItem={({ item }) => (
            <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.title}</Text>
            <TextInput
                placeholder="Edit todo"
                value={editTexts[item.id] || ''}
                onChangeText={(text) => handleEditTextChange(item.id, text)} 
                style={styles.editInput}
            />
            <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEditTodo(item.id)}>
                <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteTodo(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
            </View>
        )}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  todoItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'column',
    elevation: 1,
  },
  todoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#28a745',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    flex: 1,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

export default TodoList;
