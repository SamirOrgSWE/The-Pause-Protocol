import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
      <Stack
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#0D1B2E',
            },
            headerTintColor: '#38BDF8',
            headerTitleStyle: {
              fontWeight: '700',
              color: '#FFFFFF',
            },
            headerShadowVisible: false,
          }}
      >
        <Stack.Screen name="(auth)/Login" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/Register" options={{ headerShown: true, title: 'Register' }} />
      </Stack>
  );
}