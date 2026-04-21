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
        <View style={styles.glowTop} />

        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>The Pause{'\n'}Protocol</Text>
            <Text style={styles.subtitle}>
              Before opening a distraction,{'\n'}choose where to go.
            </Text>
          </View>

          <View style={styles.ringWrap}>
            <View style={styles.ringOuter}>
              <View style={styles.ringInner}>
                <View style={styles.pauseIcon}>
                  <View style={styles.pauseBar} />
                  <View style={styles.pauseBar} />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.buttonGroup}>
            <Pressable
                style={({ pressed }) => [styles.outlineButton, pressed && styles.pressed]}
                onPress={() => router.push('/(app)/profile')}
            >
              <Text style={styles.outlineButtonText}>Profile</Text>
            </Pressable>

            <Pressable
                style={({ pressed }) => [styles.outlineButton, pressed && styles.pressed]}
                onPress={() => router.push('/(app)/setup')}
            >
              <Text style={styles.outlineButtonText}>Setup Instructions</Text>
            </Pressable>

            <Pressable
                style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
                onPress={() => router.push('/(app)/pause')}
            >
              <Text style={styles.primaryButtonText}>Manual Pause</Text>
            </Pressable>

            {role === 'admin' && (
                <Pressable
                    style={({ pressed }) => [styles.adminButton, pressed && styles.pressed]}
                    onPress={() => router.push('/(app)/adminQuotes')}
                >
                  <Text style={styles.primaryButtonText}>Manage Quotes</Text>
                </Pressable>
            )}
          </View>

          <Text style={styles.footer}>pause · reflect · proceed</Text>
        </View>
      </View>
  );
}

const NAVY        = '#0D1B2E';
const NAVY_CARD   = '#162033';
const NAVY_BORDER = '#1E3050';
const CYAN        = '#38BDF8';
const CYAN_DIM    = '#0EA5D0';
const WHITE       = '#FFFFFF';
const MUTED       = '#7A93B0';

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
    paddingHorizontal: 28,
    paddingTop: 90,
    paddingBottom: 44,
    justifyContent: 'space-between',
  },

  // ── Header ──────────────────────────────
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: WHITE,
    textAlign: 'center',
    letterSpacing: -0.5,
    lineHeight: 46,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: MUTED,
    textAlign: 'center',
    lineHeight: 22,
  },

  // ── Ring decoration ──────────────────────
  ringWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringOuter: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: CYAN,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: CYAN,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
  },
  ringInner: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: NAVY_BORDER,
    backgroundColor: NAVY_CARD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseIcon: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseBar: {
    width: 7,
    height: 28,
    borderRadius: 4,
    backgroundColor: CYAN,
    shadowColor: CYAN,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },

  // ── Buttons ──────────────────────────────
  buttonGroup: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: CYAN,
    borderRadius: 50,
    paddingVertical: 18,
    shadowColor: CYAN,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  primaryButtonText: {
    color: NAVY,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  outlineButton: {
    borderWidth: 1.5,
    borderColor: NAVY_BORDER,
    borderRadius: 50,
    paddingVertical: 18,
    backgroundColor: NAVY_CARD,
  },
  outlineButtonText: {
    color: WHITE,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  adminButton: {
    backgroundColor: CYAN_DIM,
    borderRadius: 50,
    paddingVertical: 18,
    shadowColor: CYAN_DIM,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 5,
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.975 }],
  },

  // ── Footer ───────────────────────────────
  footer: {
    textAlign: 'center',
    color: NAVY_BORDER,
    fontSize: 12,
    letterSpacing: 3,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
});