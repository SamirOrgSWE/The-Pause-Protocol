import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';

export default function ProfileScreen() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/(auth)/login');
    } catch (error: any) {
      Alert.alert('Logout failed', error?.message || 'Please try again.');
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>
          Manage your account and app settings here.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{auth.currentUser?.email || 'No email found'}</Text>
        </View>

        {/*<Pressable
          style={styles.secondaryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.secondaryButtonText}>Back</Text>
        </Pressable>*/}

        <Pressable
          style={styles.primaryButton}
          onPress={handleLogout}
        >
          <Text style={styles.primaryButtonText}>Log Out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 0,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    color: '#111111',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 28,
  },
  card: {
    borderWidth: 1,
    borderColor: '#d6d6d6',
    borderRadius: 16,
    padding: 18,
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    color: '#111111',
    fontWeight: '500',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#d6d6d6',
    borderRadius: 14,
    paddingVertical: 16,
    marginBottom: 14,
  },
  secondaryButtonText: {
    textAlign: 'center',
    color: '#111111',
    fontSize: 16,
    fontWeight: '500',
  },
  primaryButton: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    backgroundColor: '#ff0000a8',
    borderRadius: 14,
    paddingVertical: 16,
  },
  primaryButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});