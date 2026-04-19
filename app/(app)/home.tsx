import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebase';

export default function HomeScreen() {
  const [role, setRole] = useState<string | null>(null);

  useFocusEffect(
      useCallback(() => {
        const fetchRole = async () => {
          const user = auth.currentUser;
          if (!user) return;
          try {
            const snap = await getDoc(doc(db, 'users', user.uid));
            if (snap.exists()) setRole(snap.data().role);
          } catch {}
        };
        fetchRole();
      }, [])
  );

  return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <Text style={styles.title}>The Pause Protocol</Text>
          <Text style={styles.subtitle}>
            Choose where you want to go next.
          </Text>

          <Pressable
              style={styles.secondaryButton}
              onPress={() => router.push('/(app)/profile')}
          >
            <Text style={styles.secondaryButtonText}>Profile</Text>
          </Pressable>

          <Pressable
              style={styles.primaryButton}
              onPress={() => router.push('/(app)/setup')}
          >
            <Text style={styles.primaryButtonText}>Setup Instructions</Text>
          </Pressable>

          <Pressable
              style={styles.primaryButton}
              onPress={() => router.push('/(app)/pause')}
          >
            <Text style={styles.primaryButtonText}>Manual Pause</Text>
          </Pressable>

          {role === 'admin' && (
              <Pressable
                  style={styles.adminButton}
                  onPress={() => router.push('/(app)/adminQuotes')}
              >
                <Text style={styles.primaryButtonText}>Manage Quotes</Text>
              </Pressable>
          )}
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
    paddingTop: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: '#111111',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: '#111111',
    borderRadius: 14,
    paddingVertical: 16,
    marginBottom: 14,
  },
  primaryButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
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
  adminButton: {
    backgroundColor: '#38bdf8',
    borderRadius: 14,
    paddingVertical: 16,
    marginBottom: 14,
  },
});