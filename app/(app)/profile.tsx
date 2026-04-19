import { View, Text, Pressable, StyleSheet, Alert, TextInput } from 'react-native';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../services/firebase';
import { useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function ProfileScreen() {
  const [adminCode, setAdminCode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is already admin on mount
  useState(() => {
    const checkRole = async () => {
      const user = auth.currentUser;
      if (!user) return;
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists() && snap.data().role === 'admin') setIsAdmin(true);
      } catch {}
    };
    checkRole();
  });

  const handleAdminCode = async () => {
    const user = auth.currentUser;
    if (!user) return;

    if (adminCode !== 'Productive') {
      Alert.alert('Invalid Code', 'That code is incorrect. Please try again.');
      return;
    }

    try {
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'admin',
      }, { merge: true });
      setIsAdmin(true);
      Alert.alert('Success!', 'You are now an admin. The Manage Quotes button will appear on the home screen.');
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Something went wrong.');
    }
  };

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

          <View style={styles.card}>
            <Text style={styles.label}>Role</Text>
            <Text style={styles.value}>{isAdmin ? '⭐ Admin' : 'User'}</Text>
          </View>

          {!isAdmin && (
              <View style={styles.card}>
                <Text style={styles.label}>Enter Admin Code</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter code..."
                    placeholderTextColor="#aaaaaa"
                    value={adminCode}
                    onChangeText={setAdminCode}
                    secureTextEntry
                />
                <Pressable style={styles.codeButton} onPress={handleAdminCode}>
                  <Text style={styles.codeButtonText}>Submit</Text>
                </Pressable>
              </View>
          )}

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
  input: {
    borderWidth: 1,
    borderColor: '#d6d6d6',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#111111',
    marginBottom: 10,
    marginTop: 4,
  },
  codeButton: {
    backgroundColor: '#111111',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  codeButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
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