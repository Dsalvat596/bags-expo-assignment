import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
import { User } from '@/api/types';
import { fetchUser } from '@/api';

export default function TabTwoScreen() {
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [userResult, setUserResult] = useState<User | null>(null);

  const handleSearch = async () => {
    setError(null);
    if (usernameInput && usernameInput.length > 0) {
      try {
        setLoading(true);
        const res = await fetchUser(usernameInput);

        if (res.success) {
          setUserResult(res.response);
          setError(null);
        }
      } catch (err) {
        setUserResult(null);
        setError(`User: ${usernameInput} not found. Please try again.`);
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
      <View style={styles.resultsContainer}>
        {loading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        )}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        {userResult && !error && (
          <View style={styles.userCard}>
            <View style={styles.cardHeader}>
              <Image
                source={{ uri: userResult.picture }}
                style={styles.avatar}
              />
              <Text style={styles.username}>{userResult.username}</Text>
            </View>
            <View style={styles.infoContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={styles.points}>{userResult.points} points</Text>
                <Text style={styles.rank}>{`Rank: ${userResult.rank}`}</Text>
              </View>
              <View style={styles.metaContainer}>
                <Text style={styles.metaText}>
                  Invites: {userResult.invites}
                </Text>
                <Text style={styles.metaText}>
                  Followers: {userResult.twitter_data.followers_count}
                </Text>
                <Text style={styles.metaText}>
                  Verified: {userResult.twitter_data.verified ? 'Yes' : 'No'}
                </Text>
                <Text style={styles.metaText}>
                  Membership Tier: {userResult.membership.tier}
                </Text>
                <Text style={styles.metaText}>
                  Premium Since:{' '}
                  {new Date(
                    userResult.membership.premium_since
                  ).toLocaleDateString()}
                </Text>
                <Text style={styles.metaText}>
                  Expires At:{' '}
                  {new Date(
                    userResult.membership.expires_at
                  ).toLocaleDateString()}
                </Text>
                <Text style={styles.metaText}>
                  Payment Method: {userResult.membership.payment_method}
                </Text>
                <Text style={styles.metaText}>
                  Price: {userResult.membership.price}{' '}
                  {userResult.membership.currency}
                </Text>
                {userResult.preorder && (
                  <>
                    <Text style={styles.metaText}>
                      Preorder Claimed:{' '}
                      {userResult.preorder.claimed ? 'Yes' : 'No'}
                    </Text>
                    <Text style={styles.metaText}>
                      Claimed At:{' '}
                      {new Date(
                        userResult.preorder.claimed_at
                      ).toLocaleDateString()}
                    </Text>
                    <Text style={styles.metaText}>
                      Invited By: {userResult.preorder.invited_by}
                    </Text>
                    <Text style={styles.metaText}>
                      Users Invited: {userResult.preorder.users_invited}
                    </Text>
                    <Text style={styles.metaText}>
                      Claimed Android:{' '}
                      {userResult.preorder.claimed_android ? 'Yes' : 'No'}
                    </Text>
                    <Text style={styles.metaText}>
                      Claimed At Android:{' '}
                      {new Date(
                        userResult.preorder.claimed_at_android
                      ).toLocaleDateString()}
                    </Text>
                    <Text style={styles.metaText}>
                      Invited By Android:{' '}
                      {userResult.preorder.invited_by_android}
                    </Text>
                  </>
                )}
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#36454f', paddingTop: 20 },
  header: {
    backgroundColor: '#b0bec5',
    fontSize: 24,
    paddingVertical: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#36454f',
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#4d8b99',
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultsContainer: {
    paddingHorizontal: 12,
    marginVertical: 12,
  },
  loadingContainer: {
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorContainer: {
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
  },
  userCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginVertical: 8,
    alignItems: 'center',
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#36454f',
  },
  points: {
    fontSize: 18,
    color: '#888',
    marginVertical: 8,
  },
  rank: {
    fontSize: 18,
    color: '#888',
    marginVertical: 8,
    fontWeight: 'bold',
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#555',
    marginRight: 8,
    marginBottom: 4,
  },
  infoContainer: {
    width: '100%',
  },
});
