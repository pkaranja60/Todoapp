import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity, Keyboard } from 'react-native';
import Task from './components/Task';

export default function App() {

  const [task, setTask] = useState();
  const [taskItem, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItem, task])
    setTask(null);
  }

  const deleteTask = (index) => {
    let itemCopy = [...taskItem];
    itemCopy.splice(index, 1);
    setTaskItems(itemCopy);
  }

  return (
    <View style={styles.container}>

      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>
          Today's tasks
        </Text>
        <View style={styles.items}>
          {
            taskItem.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => deleteTask(index)}>
                  < Task text={item} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>

      {/* Create a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.createTaskWrapper}>
        <TextInput style={styles.input} placeholder={'Create a task'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginBottom: 20,
    marginTop: 30,
  },
  createTaskWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    marginLeft: 7,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 240,
  },
  addWrapper: {
    marginRight: 7,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
