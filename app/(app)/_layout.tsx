import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="profile"
        options={{
          headerShown: true,
          title: '',
          headerBackTitle: 'Back',
          // headerTitleStyle: {
          // fontSize: 29,
          // fontWeight: "700"
          // }
        }}
      />

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