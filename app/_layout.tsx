import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
      <Stack
          screenOptions={{
            headerShown: false,
          }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
        <Stack.Screen
            name="pause"
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
        />
      </Stack>
  );
}
