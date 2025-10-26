import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, StatusBar, TextInput, Animated, Easing, ImageBackground, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 


const ELEGANT_PINK = '#FFC0CB';  
const DEEP_ROSE = '#C2185B';     
const SOFT_LILAC = '#D8BFD8';    
const CREAM_WHITE = '#F8F8FF';   
const DARK_CHARCOAL = '#36454F'; 
const PALE_GREY = '#DCDCDC';     
const ACCENT_GOLD_LIGHT = '#FFD700'; 

function TodoItem({ todo, index, onToggle, onDelete }) {
  const animatedOpacity = useState(new Animated.Value(1))[0];
  const animatedScale = useState(new Animated.Value(1))[0];

  useEffect(() => {
    animatedOpacity.setValue(0);
    animatedScale.setValue(0.9);
    Animated.parallel([
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(animatedScale, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleDelete = () => {
    Animated.timing(animatedOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onDelete(index));
  };

  return (
    <Animated.View style={[styles.todoItemContainer, { opacity: animatedOpacity, transform: [{ scale: animatedScale }] }]}>
      <Pressable
        style={styles.checkButton}
        onPress={() => onToggle(index)}
      >
        <Text style={[styles.checkText, { color: todo.completed ? DEEP_ROSE : PALE_GREY }]}>
          {todo.completed ? '✓' : '•'}
        </Text>
      </Pressable>
      <Text style={[styles.todoText, {
        textDecorationLine: todo.completed ? 'line-through' : 'none',
        color: todo.completed ? PALE_GREY : CREAM_WHITE,
      }]}>
        {todo.text}
      </Text>
      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>✕</Text>
      </Pressable>
    </Animated.View>
  );
}

export default function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const handleAddTodo = () => {
    if (task.trim() !== '') {
      const newTodo = { id: Date.now(), text: task.trim(), completed: false };
      setTodos([newTodo, ...todos]);
      setTask('');
    }
  };

  const handleToggleTodo = (index) => {
    const newTodos = todos.slice();
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDeleteTodo = (indexToDelete) => {
    setTodos(todos.filter((_, index) => index !== indexToDelete));
  };
  
  const incompleteCount = todos.filter(todo => !todo.completed).length;

  return (
    <ImageBackground source={require('./assets/background.jpg')} style={styles.background}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <LinearGradient 
          colors={[DEEP_ROSE, ELEGANT_PINK]}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.title}>TO DO LIST</Text>
           <Text style={styles.counterText}>{incompleteCount} Tugas Belum Selesai</Text>
        </LinearGradient>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.taskInput}
            placeholder="Tambahkan tugas baru..."
            placeholderTextColor={PALE_GREY}
            value={task}
            onChangeText={setTask}
          />
          <Pressable style={styles.addButton} onPress={handleAddTodo}>
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>

        <ScrollView style={styles.todoList}>
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
          ))}
          {todos.length === 0 && (
            <Text style={styles.emptyText}>Tidak ada tugas. Mari mulai!</Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)', 
    alignItems: 'center',
  },
  headerGradient: { 
    width: '100%',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 3,
    borderColor: ACCENT_GOLD_LIGHT, 
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: CREAM_WHITE,
    fontFamily: 'serif',
    textShadowColor: DEEP_ROSE,
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 20,
    color: CREAM_WHITE,
    marginBottom: 10,
    fontFamily: 'serif',
    textShadowColor: DEEP_ROSE,
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 8
  },
  counterText: {
    fontSize: 16,
    color: ACCENT_GOLD_LIGHT,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '90%',
    maxWidth: 500,
    marginVertical: 20,
    borderRadius: 12, 
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    borderWidth: 1,
    borderColor: ELEGANT_PINK, 
    shadowColor: DARK_CHARCOAL,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  taskInput: {
    flex: 1,
    paddingHorizontal: 20,
    color: DARK_CHARCOAL, 
    backgroundColor: 'transparent',
    height: 55,
  },
  addButton: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SOFT_LILAC, 
    borderLeftWidth: 1,
    borderColor: DEEP_ROSE,
  },
  addButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: DARK_CHARCOAL,
  },
  todoList: {
    flex: 1,
    width: '90%',
    maxWidth: 500,
    paddingBottom: 40,
  },
  todoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 192, 203, 0.3)', 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderRadius: 10,
    marginVertical: 6,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  checkButton: {
    padding: 5,
    marginRight: 15,
  },
  checkText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  todoText: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'serif',
    color: CREAM_WHITE,
  },
  deleteButton: {
    padding: 5,
    marginLeft: 15,
  },
  deleteText: {
    fontSize: 22,
    color: PALE_GREY,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: PALE_GREY,
    marginTop: 50,
    fontSize: 18,
    fontFamily: 'serif',
  }
});