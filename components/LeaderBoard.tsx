// LeaderBoard.tsx
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { User } from '@/api/types';

interface LeaderBoardProps {
  users: User[];
  onPressUser?: (user: User) => void;
}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const LeaderBoard: React.FC<LeaderBoardProps> = ({ users, onPressUser }) => {
  const [visibleUsers, setVisibleUsers] = useState<User[]>(users.slice(0, 10));
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = () => {
    if (visibleUsers.length < users.length) {
      setLoadingMore(true);
      setTimeout(() => {
        setVisibleUsers(users.slice(0, visibleUsers.length + 10));
        setLoadingMore(false);
      }, 3000);
    }
  };

  const renderItem = ({ item, index }: { item: User; index: number }) => (
    <View style={styles.item}>
      <View style={styles.userInfo}>
        <View>
          <Text style={{ fontWeight: 700, fontSize: 18 }}>{`#${
            index + 1
          }`}</Text>
        </View>
        <View>
          <Image
            style={styles.image}
            source={item.picture}
            placeholder={{ blurhash }}
            contentFit='cover'
            transition={1000}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.points}>{item.points} points</Text>
        </View>
      </View>
      <View style={styles.goContainer}>
        <Text>{item.ticker}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={visibleUsers}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loadingMore ? (
          <Text
            style={{ textAlign: 'center', color: 'white', paddingVertical: 6 }}
          >
            Loading more...
          </Text>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 16,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  points: {
    fontSize: 16,
    color: '#555',
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    width: 50,
    borderRadius: 50,
  },
  goContainer: { position: 'absolute', right: 14 },
});

export default LeaderBoard;
