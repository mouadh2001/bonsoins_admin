import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://randomuser.me/api/portraits/women/68.jpg' }}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.date}>5 hours ago</Text>
        </View>
      </View>
      <Text style={styles.title}>Nurse Care and Health Formation</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri:  'https://fastly.picsum.photos/id/239/1739/1391.jpg?hmac=-Zh20gMdOuV7tHr4wGEUqACAxdvb7gkDlKKS9MIE1TU' }}
        />
      </View>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in metus at nulla faucibus auctor.
        Duis eu purus elit. Praesent id molestie nibh. Cras blandit lectus sed dui lobortis, nec tincidunt dui tristique.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque vehicula feugiat justo,
        ut convallis odio lacinia vel. Curabitur at commodo purus.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => alert('Registered!')}>
        <Text style={styles.buttonText}>Register for the formation</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#777',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  imageContainer: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#008080',
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
