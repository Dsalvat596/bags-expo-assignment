import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'trending-up' : 'trending-up-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profileLookup'
        options={{
          title: 'Profile Lookup',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'search' : 'search-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
