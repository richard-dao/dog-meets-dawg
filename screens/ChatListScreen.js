import React, { useEffect, useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getAccounts, getMatches } from '../services/api-endpoints';
import { UserContext } from '../context/UserContext';
import { MatchesContext } from '../context/MatchesContext';

const ChatListScreen = ({ navigation }) => {
	const { user, setUser } = useContext(UserContext);
	const { matches, setMatches } = useContext(MatchesContext);
	useEffect(() => {
		async function fetchChats() {
			const result = await getMatches(user?.userID);
			if (result) {
				setMatches(result);
				console.log(matches);
			}
		}
		if (matches.length === 0) {
			fetchChats();
		} else {
			console.log("Matches: ", matches);
		}
	}, [user?.userID]);

	return (
		<View style={styles.container}>
			{matches.length > 0 && (
				<FlatList
					data={matches}
					keyExtractor={(match) => { return match.chatID }}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => navigation.navigate('ChatRoom', { chat: item })}
							style={styles.chatItem}
						>
							<Text style={styles.chatName}>{item.userInfo?.dogName || "Unknown Dog"}</Text>
							<Text style={styles.chatPreview}>{item.latestMessageInfo?.message || "No messages yet"}</Text>
						</TouchableOpacity>
					)}
				/>
			)
			}
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