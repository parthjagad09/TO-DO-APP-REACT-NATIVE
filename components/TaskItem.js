import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Colors from '../theme/Colors';

export default function TaskItem({ task, onToggle, onDelete }) {
  if (!task) return null;
  const isDone = task.completed;

  return (
    <View style={[styles.card, isDone && styles.cardDone]}>
      <TouchableOpacity 
        style={styles.content} 
        onPress={() => onToggle(task.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, isDone && styles.checkboxDone]}>
          {isDone && <Text style={styles.checkIcon}>✓</Text>}
        </View>
        <View style={styles.textGroup}>
          <Text style={[styles.title, isDone && styles.titleDone]}>
            {task.title}
          </Text>
          <View style={[styles.badge, isDone ? styles.badgeDone : styles.badgePending]}>
            <View style={[styles.dot, { backgroundColor: isDone ? Colors.success : Colors.pending }]} />
            <Text style={[styles.badgeText, { color: isDone ? Colors.success : Colors.pending }]}>
              {isDone ? 'Completed' : 'Pending'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onDelete(task.id)}
        style={styles.deleteButton}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteIcon}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardDone: { backgroundColor: '#b0d2e3' },
  content: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: '#D1D5DB', marginRight: 15, justifyContent: 'center', alignItems: 'center' },
  checkboxDone: { backgroundColor: Colors.success, borderColor: Colors.success },
  checkIcon: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  textGroup: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600', color: Colors.text },
  titleDone: { textDecorationLine: 'line-through', color: Colors.textLight },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20, alignSelf: 'flex-start', marginTop: 6 },
  badgePending: { backgroundColor: '#eba875' },
  badgeDone: { backgroundColor: '#D1FAE5' },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  badgeText: { fontSize: 11, fontWeight: '700' },
  deleteBtn: { padding: 8, opacity: 0.6 },
  deleteIcon: { fontSize: 18 }
});


