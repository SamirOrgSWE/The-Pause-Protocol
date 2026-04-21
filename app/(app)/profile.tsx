import { View, Text, Pressable, StyleSheet, Alert, TextInput } from 'react-native';
import { Stack, router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../services/firebase';
import { useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function ProfileScreen() {
  const [adminCode, setAdminCode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

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
        <Stack.Screen options={{
          headerShown: true,
          title: 'Profile',
          headerStyle: { backgroundColor: '#0D1B2E' },
          headerTintColor: '#38BDF8',
          headerTitleStyle: { fontWeight: '700', color: '#FFFFFF' },
          headerShadowVisible: false,
        }} />

        <View style={styles.glowTop} />

        <View style={styles.container}>
          {/* Email card */}
          <View style={styles.card}>
            <Text style={styles.label}>EMAIL</Text>
            <Text style={styles.value}>{auth.currentUser?.email || 'No email found'}</Text>
          </View>

          {/* Role card */}
          <View style={styles.card}>
            <Text style={styles.label}>ROLE</Text>
            <View style={styles.roleRow}>
              <View style={[styles.roleBadge, isAdmin && styles.roleBadgeAdmin]}>
                <Text style={[styles.roleBadgeText, isAdmin && styles.roleBadgeTextAdmin]}>
                  {isAdmin ? '★  Admin' : 'User'}
                </Text>
              </View>
            </View>
          </View>

          {/* Admin code card */}
          {!isAdmin && (
              <View style={styles.card}>
                <Text style={styles.label}>ADMIN CODE</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter code..."
                    placeholderTextColor={MUTED}
                    value={adminCode}
                    onChangeText={setAdminCode}
                    secureTextEntry
                />
                <Pressable
                    style={({ pressed }) => [styles.codeButton, pressed && styles.pressed]}
                    onPress={handleAdminCode}
                >
                  <Text style={styles.codeButtonText}>Submit</Text>
                </Pressable>
              </View>
          )}
        </View>

        <Pressable
            style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}
            onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </Pressable>
      </View>
  );
}

const NAVY        = '#0D1B2E';
const NAVY_CARD   = '#162033';
const NAVY_BORDER = '#1E3050';
const CYAN        = '#38BDF8';
const WHITE       = '#FFFFFF';
const MUTED       = '#7A93B0';
const RED         = '#EF4444';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: NAVY,
  },
  glowTop: {
    position: 'absolute',
    top: -120,
    alignSelf: 'center',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: CYAN,
    opacity: 0.07,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  card: {
    borderWidth: 1,
    borderColor: NAVY_BORDER,
    borderRadius: 18,
    padding: 20,
    backgroundColor: NAVY_CARD,
    marginBottom: 14,
  },
  label: {
    fontSize: 11,
    color: MUTED,
    fontWeight: '700',
    letterSpacing: 1.8,
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: WHITE,
    fontWeight: '500',
  },
  roleRow: {
    flexDirection: 'row',
  },
  roleBadge: {
    borderWidth: 1,
    borderColor: NAVY_BORDER,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  roleBadgeAdmin: {
    borderColor: CYAN,
    backgroundColor: '#0E2A3D',
  },
  roleBadgeText: {
    color: MUTED,
    fontSize: 14,
    fontWeight: '600',
  },
  roleBadgeTextAdmin: {
    color: CYAN,
  },
  input: {
    borderWidth: 1,
    borderColor: NAVY_BORDER,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: WHITE,
    backgroundColor: NAVY,
    marginBottom: 12,
    marginTop: 4,
  },
  codeButton: {
    backgroundColor: CYAN,
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: CYAN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  codeButtonText: {
    color: NAVY,
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.3,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    backgroundColor: '#1E1215',
    borderWidth: 1,
    borderColor: RED,
    borderRadius: 50,
    paddingVertical: 18,
  },
  logoutButtonText: {
    color: RED,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.975 }],
  },
});