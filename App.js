
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

function getRandomColor() {
  // Tạo một màu sắc ngẫu nhiên bằng cách tạo giá trị RGB ngẫu nhiên
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function App() {
  const [task, setTask] = useState('');
  const [listTask, setListTask] = useState([{ task: 'hello world', color: '#fff' }]);
  const [editingTaskIdx, setEditingTaskIdx] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');

  const submitHandler = () => {
    if (task === '') {
      return;
    }
    setListTask((prev) => [...prev, { task, color: getRandomColor() }]);
    setTask('');
  };

  const onChangeTextHandler = (newText) => {
    setTask(newText);
  };

  const removeItemHandler = (id) => {
    setListTask((prev) => prev.filter((value, index) => index !== id));
    if (editingTaskIdx !== null) {
      setEditingTaskIdx(null);
    }
  };
  const finishEditItemHandler = (idx) => {
    setListTask((pre) => pre.map((item, index) => index === idx ? {...item, task: editingTaskText} : item))
    setEditingTaskIdx(null)
    setEditingTaskText('');
  };
  const startEditItemHandler = (idx, editingText) => {
    setEditingTaskText(editingText);
    setEditingTaskIdx(idx);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.textInput}
          placeholder="enter task"
          onChangeText={onChangeTextHandler}
          value={task}
        />
        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text style={styles.buttonText}>add</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.containerList}>
        {listTask.map((item, index) => (
          <View style={[styles.item, { backgroundColor: item.color }]} key={index}>
            {editingTaskIdx === index ? (
              <TextInput
                style={styles.textInput}
                placeholder="enter task"
                onChangeText={(newText => {setEditingTaskText(newText)})}
                value={editingTaskText}
              />
            ): (
              <Text style={styles.itemText} selectable={true}>
                {item.task}
              </Text>
            )}
            
            <View style={{flexDirection: 'row'}}>
              {editingTaskIdx === index ? (
                <TouchableOpacity onPress={() => finishEditItemHandler(index)} style={{paddingRight: 15}}>
                  <FontAwesome name="check" size={24} color="#090530" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => startEditItemHandler(index, item.task)} style={{paddingRight: 15}}>
                  <FontAwesome name="edit" size={24} color="#090530" />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => removeItemHandler(index)}>
                <FontAwesome name="remove" size={24} color="#090530" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'flex-start', // Changed from 'start' to 'flex-start'
  },
  header: {
    flexDirection: 'row',
    marginTop: 45,
    marginHorizontal: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    flex: 1,
    marginRight: 20,
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 10,
    color: 'black',
    borderRadius: 5,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  buttonText: {
    color: 'white',
  },
  containerList: {
    marginHorizontal: 20,
    marginTop: 20,
    flex: 1,
    marginBottom: 20,
  },
  item: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    minHeight: 50,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 18,
    flex: 0.98,
  },
  icon: {
    color: '#090530',
  },
});
