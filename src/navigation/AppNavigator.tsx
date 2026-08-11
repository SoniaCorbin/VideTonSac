import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import { FeedScreen } from '../features/feed/screens/FeedScreen';
import { JournalScreen } from '../features/journal/screens/JournalScreen';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';
import { ComplaintInputScreen } from '../features/catharsis/screens/ComplaintInputScreen';
import { CatharsisAnimationScreen } from '../features/catharsis/screens/CatharsisAnimationScreen';
import { ReleaseScreen } from '../features/catharsis/screens/ReleaseScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }: any) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#16181E',
          borderTopColor: '#262933',
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarActiveTintColor: '#CCFF00',
        tabBarInactiveTintColor: '#8A8F9E',
      }}
    >
      <Tab.Screen
        name="Feed"
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🗣️</Text>,
        }}
      >
        {() => <FeedScreen onOpenCatharsisFlow={() => navigation.navigate('ComplaintInput')} />}
      </Tab.Screen>

      <Tab.Screen
        name="Journal"
        component={JournalScreen}
        options={{
          tabBarLabel: 'Journal',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🔒</Text>,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>📊</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0D0E11' } }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="ComplaintInput" component={ComplaintInputScreenNav} />
      <Stack.Screen name="CatharsisAnimation" component={CatharsisAnimationScreenNav} />
      <Stack.Screen name="Release" component={ReleaseScreenNav} />
    </Stack.Navigator>
  );
};

const ComplaintInputScreenNav = ({ navigation }: any) => {
  return <ComplaintInputScreen onNext={(data) => navigation.navigate('CatharsisAnimation', data)} />;
};

const CatharsisAnimationScreenNav = ({ route, navigation }: any) => {
  const { complaintText, category } = route.params || {};
  return (
    <CatharsisAnimationScreen
      complaintText={complaintText}
      category={category}
      onComplete={() => navigation.navigate('Release', { complaintText, category })}
    />
  );
};

const ReleaseScreenNav = ({ navigation }: any) => {
  return <ReleaseScreen onFinishFlow={() => navigation.popToTop()} />;
};