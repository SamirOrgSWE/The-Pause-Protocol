import { useState } from 'react';
import {
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
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import FloatingInput from '../../components/FloatingInput';
import { auth } from '../../services/firebase';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!email.trim()) {
      setEmailError('Enter your email');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError('Enter a valid email address');
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError('Create a password');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Confirm your password');
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    return valid;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      router.replace({ pathname: '/(auth)/login', params: { registered: 'true' } });
    } catch (error: any) {
      Alert.alert('Registration failed', error?.message || 'Please try again.');
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
          <View style={styles.glowTop} />

          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Create{'\n'}Account</Text>
              <Text style={styles.subtitle}>Set up your Pause Protocol account</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <FloatingInput
                  label="Email"
                  value={email}
                  onChangeText={(text) => { setEmail(text); if (emailError) setEmailError(''); }}
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
                  textContentType="newPassword"
              />
              <FloatingInput
                  label="Confirm Password"
                  value={confirmPassword}
                  onChangeText={(text) => { setConfirmPassword(text); if (confirmPasswordError) setConfirmPasswordError(''); }}
                  error={confirmPasswordError}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="password"
              />
              <Pressable
                  style={({ pressed }) => [styles.primaryButton, loading && styles.buttonDisabled, pressed && styles.pressed]}
                  onPress={handleRegister}
                  disabled={loading}
              >
                <Text style={styles.primaryButtonText}>
                  {loading ? 'Creating account...' : 'Create Account'}
                </Text>
              </Pressable>
              <Pressable
                  style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
                  onPress={() => router.back()}
              >
                <Text style={styles.secondaryButtonText}>Back to Login</Text>
              </Pressable>
            </View>
          </View>

          <Text style={styles.footer}>pause · reflect · proceed</Text>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
  );
}

const NAVY        = '#0D1B2E';
const NAVY_CARD   = '#162033';
const NAVY_BORDER = '#1E3050';
const CYAN        = '#38BDF8';
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
  },

  // ── Header ──────────────────────────────
  header: {
    alignItems: 'center',
    marginBottom: 36,
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: WHITE,
    textAlign: 'center',
    letterSpacing: -0.5,
    lineHeight: 46,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: MUTED,
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
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 12,
    color: NAVY_BORDER,
    letterSpacing: 3,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
});