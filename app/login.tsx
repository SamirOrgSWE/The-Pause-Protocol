import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pause Protocol Login</Text>

      <Button title="Go to Home" onPress={() => router.push('/home')} />
      <Button title="Register" onPress={() => router.push('/register')} />
    </View>
  );
}