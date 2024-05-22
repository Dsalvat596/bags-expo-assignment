import Ionicons from '@expo/vector-icons/Ionicons';
import {
  StyleSheet,
  Image,
  Platform,
  View,
  Text,
  TextInput,
  Button,
  Pressable,
} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { User } from '@/api/types';
import { fetchLeaderboard, fetchUser } from '@/api';

export default function TabTwoScreen() {
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [userResult, setUserResult] = useState<User | null>(null);

  const handleSearch = async () => {
    if (usernameInput && usernameInput.length > 0) {
      console.log(`Searching for user: ${usernameInput.toLowerCase()}`);
      try {
        setLoading(true);
        const res = await fetchUser(usernameInput);

        if (res.success) {
          setUserResult(res.response);
          setError(null);
        }
      } catch (err) {
        setUserResult(null);
        if (error.response && error.response.status === 400) {
          setError(`User: ${usernameInput} not found.  Please try again.`);
        } else {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PROFILE LOOKUP</Text>
      <View style={styles.divider} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={usernameInput}
          onChangeText={(text) => setUsernameInput(text)}
          placeholder='Enter username'
        />
        <Pressable onPress={handleSearch} style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#36454f', paddingTop: 20 },
  header: {
    backgroundColor: '#b0bec5',
    fontSize: 24,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    marginBottom: 20,
  },
  searchLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    marginRight: 0,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#4d8b99',
    paddingVertical: 11,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
