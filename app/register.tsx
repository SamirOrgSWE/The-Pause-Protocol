import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function RegisterScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Register Screen</Text>

      <Button title="Back to Login" onPress={() => router.push('/login')} />
    </View>
  );
}