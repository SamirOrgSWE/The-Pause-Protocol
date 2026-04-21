import { Redirect } from 'expo-router';
//redirect user to login screen when the app first opened
export default function Index() {
  return <Redirect href="/(auth)/login" />;
}
