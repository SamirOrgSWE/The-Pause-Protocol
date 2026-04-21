import { useState, useEffect } from 'react';
import {
  Animated,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';

import FloatingInput from '../../components/FloatingInput';
import { auth } from '../../services/firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const { registered } = useLocalSearchParams();

  useEffect(() => {
    if (registered === 'true') {
      setShowSuccess(true);
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.delay(3000),
        Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]).start(() => setShowSuccess(false));
    }
  }, [registered]);

  const validate = () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');
    if (!email.trim()) { setEmailError('Enter your email'); valid = false; }
    if (!password.trim()) { setPasswordError('Enter your password'); valid = false; }
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace('/(app)/home');
    } catch (error: any) {
      const code = error?.code;
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setPasswordError('Incorrect password');
      } else if (code === 'auth/user-not-found' || code === 'auth/invalid-email') {
        setEmailError('Invalid email address');
      } else {
        Alert.alert('Login failed', error?.message || 'Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <TouchableWithoutFeedback onPress={Platform.OS !== 'web' ? Keyboard.dismiss : undefined} accessible={false}>
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {/* Background glow */}
          <View style={styles.glowTop} />

          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
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
              <Text style={styles.title}>The Pause{'\n'}Protocol</Text>
              <Text style={styles.subtitle}>Log in to continue</Text>
            </View>

            {/* Success banner */}
            {showSuccess && (
                <Animated.View style={[styles.successBanner, { opacity: fadeAnim }]}>
                  <Text style={styles.successText}>✓ Account created successfully! Please log in.</Text>
                </Animated.View>
            )}

            {/* Form */}
            <View style={styles.form}>
              <FloatingInput
                  label="Email"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (emailError && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim())) setEmailError('');
                  }}
                  error={emailError}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  textContentType="emailAddress"
              />
              <FloatingInput
                  label="Password"
                  value={password}
                  onChangeText={(text) => { setPassword(text); if (passwordError) setPasswordError(''); }}
                  error={passwordError}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="password"
              />
              <Pressable
                  style={({ pressed }) => [styles.primaryButton, loading && styles.buttonDisabled, pressed && styles.pressed]}
                  onPress={handleLogin}
                  disabled={loading}
              >
                <Text style={styles.primaryButtonText}>{loading ? 'Logging in...' : 'Log In'}</Text>
              </Pressable>
              <Pressable
                  style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
                  onPress={() => router.push('/(auth)/register')}
              >
                <Text style={styles.secondaryButtonText}>Create Account</Text>
              </Pressable>
            </View>
          </View>

          <Text style={styles.extranote}>Brought to you by the "C's Get Degrees"</Text>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
    paddingTop: 70,
  },

  // ── Header ──────────────────────────────
  header: {
    alignItems: 'center',
    marginBottom: 36,
  },
  ringWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  ringOuter: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: CYAN,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: CYAN,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
  },
  ringInner: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: NAVY_BORDER,
    backgroundColor: NAVY_CARD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseIcon: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseBar: {
    width: 5,
    height: 20,
    borderRadius: 3,
    backgroundColor: CYAN,
    shadowColor: CYAN,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: WHITE,
    textAlign: 'center',
    letterSpacing: -0.5,
    lineHeight: 42,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: MUTED,
    textAlign: 'center',
  },

  // ── Success banner ───────────────────────
  successBanner: {
    backgroundColor: '#0D2E1A',
    borderColor: '#22C55E',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  successText: {
    color: '#4ADE80',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },

  // ── Form ─────────────────────────────────
  form: {
    flexShrink: 1,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: CYAN,
    borderRadius: 50,
    paddingVertical: 18,
    marginTop: 4,
    shadowColor: CYAN,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: NAVY,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: NAVY_BORDER,
    borderRadius: 50,
    paddingVertical: 18,
    backgroundColor: NAVY_CARD,
  },
  secondaryButtonText: {
    textAlign: 'center',
    color: WHITE,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.975 }],
  },

  // ── Footer ───────────────────────────────
  extranote: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 13,
    color: NAVY_BORDER,
    letterSpacing: 0.3,
  },
});