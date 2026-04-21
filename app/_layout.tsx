import { Stack } from 'expo-router';
//root layout, hides default header across all screen
export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
