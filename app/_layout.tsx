import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
      <Stack
          screenOptions={{
            headerShown: false,
          }}
      >
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="pause" options={{ headerShown: false }} />
        <Stack.Screen
            name="profile"
            options={{
              headerShown: true,
              title: 'Profile',
              headerStyle: { backgroundColor: '#0D1B2E' },
              headerTintColor: '#38BDF8',
              headerTitleStyle: { fontWeight: '700', color: '#FFFFFF' },
              headerShadowVisible: false,
            }}
        />
        <Stack.Screen
            name="setup"
            options={{
              headerShown: true,
              title: 'Setup',
              headerStyle: { backgroundColor: '#0D1B2E' },
              headerTintColor: '#38BDF8',
              headerTitleStyle: { fontWeight: '700', color: '#FFFFFF' },
              headerShadowVisible: false,
            }}
        />
        <Stack.Screen
            name="adminQuotes"
            options={{
              headerShown: true,
              title: 'Manage Quotes',
              headerStyle: { backgroundColor: '#0D1B2E' },
              headerTintColor: '#38BDF8',
              headerTitleStyle: { fontWeight: '700', color: '#FFFFFF' },
              headerShadowVisible: false,
            }}
        />
      </Stack>
  );
}