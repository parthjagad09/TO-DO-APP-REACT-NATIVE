import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from './components/TaskItem';
import AddTask from './components/AddTask';
import Colors from './theme/Colors';

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const saved = await AsyncStorage.getItem('tasks');
      if (saved) setTasks(JSON.parse(saved));
    };
    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    setTasks([{ id: Date.now().toString(), title, completed: false }, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };
  const pending = tasks.filter(t => !t.completed).length;
  const done = tasks.filter(t => t.completed).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Task Manager</Text>
          <Text style={styles.headerSubtitle}>Stay Organized, Stay Productive</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{done}</Text>
            <Text style={styles.statLabel}>Done</Text>
          </View>
        </View>
      </View>

      <View style={styles.listArea}>
        <AddTask onAdd={addTask} />
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TaskItem task={item} onToggle={toggleTask} onDelete={deleteTask} />
          )}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { backgroundColor: Colors.primary, paddingBottom: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  headerTop: { padding: 25, paddingTop: 40 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#FFF' },
  headerSubtitle: { fontSize: 24,fontWeight: 'bold', color: '#FFF', marginTop: 4 },
  statsRow: { flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 0.95)', marginHorizontal: 20, borderRadius: 20, padding: 15 },
  statBox: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 24, fontWeight: 'bold', color: '#050505' },
  statLabel: { fontSize: 12, color: '#000000' },
  divider: { width: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)' },
  listArea: { flex: 1, marginTop: -20 }
});