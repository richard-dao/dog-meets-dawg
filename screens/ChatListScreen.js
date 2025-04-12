import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const mockChats = [
  { id: '1', name: 'Buddy (Golden Retriever)', lastMessage: 'Wanna sniff later?' },
  { id: '2', name: 'Luna (Poodle)', lastMessage: 'I barked at a squirrel today!' },
  { id: '3', name: 'Max (Beagle)', lastMessage: 'What are you doing this weekend?' },
];

const ChatListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ChatRoom', { chat: item })}
            style={styles.chatItem}
          >
            <Text style={styles.chatName}>{item.name}</Text>
            <Text style={styles.chatPreview}>{item.lastMessage}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  chatItem: {
    paddingVertical: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  chatPreview: {
    color: '#777',
    marginTop: 4,
  },
});

export default ChatListScreen;