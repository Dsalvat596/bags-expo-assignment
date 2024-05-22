import { StyleSheet, View, Text } from 'react-native';

import { fetchLeaderboard } from '../../api';
import { useEffect, useState } from 'react';
import { User } from '../../api/types';
import LeaderBoard from '@/components/LeaderBoard';

export default function HomeScreen() {
  const [leaderBoard, setLeaderBoard] = useState<User[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetchLeaderboard();
        if (res.success) {
          setLeaderBoard(res.response);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function sortByProperty<T>(arr: T[], prop: keyof T): T[] {
    return arr.slice().sort((a, b) => {
      if (a[prop] < b[prop]) return 1;
      if (a[prop] > b[prop]) return -1;
      return 0;
    });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{'BAGS LEADERBOARD'}</Text>
      <View style={styles.divider} />
      {leaderBoard && (
        <LeaderBoard users={sortByProperty(leaderBoard, 'points')} />
      )}
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
  },
});
