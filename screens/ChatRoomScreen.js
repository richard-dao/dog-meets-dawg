import React, { useState, useContext, useEffect, useRef } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	FlatList,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import { UserContext } from '../context/UserContext';
import { getChatHistory } from '../services/api-endpoints';
import { websocket_baseURL } from '../services/websocket';

const ChatRoomScreen = ({ route }) => {
	const { user } = useContext(UserContext);
	const { chat } = route.params;
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState('');
	const socketRef = useRef(null);


	useEffect(() => {
		async function fetchMessages() {
			const result = await getChatHistory(chat.latestMessageInfo.chatID);
			if (result) {
				setMessages(result);
				console.log(result);
			}
		}
		if (messages.length === 0) {
			fetchMessages();
		} else {
			console.log("Messages: ", messages);
		}
	}, [user?.userID]);

	useEffect(() => {
		const ws = new WebSocket(websocket_baseURL + `?userID=${user?.userID}`);
		socketRef.current = ws;
		ws.onopen = () => {
			console.log("WebSocket connection opened");
		};

		ws.onmessage = (event) => {
			console.log("Message received: ", event);
			const messageData = JSON.parse(event.data);
			console.log("Parsed message data: ", messageData);
			if (messageData) {
				setMessages((prevMessages) => [
					{
						message: messageData.message,
						userID: messageData.from,
						timestamp: messageData.timestamp,
					},
					...prevMessages,
				]);
			}
		};
		ws.onclose = () => {
			console.log("WebSocket connection closed");
		};
		ws.onerror = (error) => {
			console.error("WebSocket error: ", error);
		};

		return () => {
			ws.close();
		};
	}, [chat.latestMessageInfo.chatID]);

	const handleSend = () => {
		if (!input.trim()) return;

		// WebSocket Stuff

		const messagePayload = {
			chatID: chat.latestMessageInfo.chatID,
			message: input.trim(),
			action: "sendMessage"
		};
		socketRef.current.send(JSON.stringify(messagePayload));
		setInput('');
	}

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			{messages.length > 0 && (
				<>
					<FlatList
						data={messages}
						inverted
						keyExtractor={(item) => item.timestamp}
						renderItem={({ item }) => (
							<View style={[styles.message, item.userID === user?.userID ? styles.yours : styles.theirs]}>
								<Text>{item.message}</Text>
							</View >
						)}
						contentContainerStyle={{ padding: 15 }}
					/>
				</>
			)}
			<View style={styles.inputContainer}>
				<TextInput
					value={input}
					onChangeText={setInput}
					placeholder="Type a message..."
					style={styles.input}
				/>
				<TouchableOpacity onPress={handleSend} style={styles.sendButton}>
					<Text style={styles.sendText}>Send</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView >
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },
	message: {
		padding: 10,
		borderRadius: 8,
		marginVertical: 6,
		maxWidth: '80%',
	},
	yours: {
		backgroundColor: '#dcf8c6',
		alignSelf: 'flex-end',
	},
	theirs: {
		backgroundColor: '#f1f1f1',
		alignSelf: 'flex-start',
	},
	sender: {
		fontWeight: 'bold',
		marginBottom: 4,
	},
	inputContainer: {
		flexDirection: 'row',
		padding: 10,
		borderTopColor: '#ccc',
		borderTopWidth: 1,
	},
	input: {
		flex: 1,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#ccc',
		paddingHorizontal: 15,
		paddingVertical: 8,
		marginRight: 10,
	},
	sendButton: {
		backgroundColor: '#007AFF',
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 20,
	},
	sendText: {
		color: '#fff',
		fontWeight: 'bold',
	},
});

export default ChatRoomScreen;