import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { getRandomQuote } from '../../services/quoteService';

export default function PauseScreen() {
  const { appName, seconds } = useLocalSearchParams<{
    appName?: string;
    seconds?: string;
  }>();

  const targetApp = appName || 'a distraction';
  const startSeconds = Number(seconds) > 0 ? Number(seconds) : 10;

  const [timeLeft, setTimeLeft] = useState(startSeconds);
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(null);

  useEffect(() => {
    getRandomQuote().then((q) => setQuote(q as unknown as { text: string; author: string }));
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const canContinue = timeLeft <= 0;

  const handleContinue = () => {
    if (!canContinue) return;
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  };

  return (
      <>
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.container}>
          <View style={styles.glowTop} />

          {/* Header */}
          <Text style={styles.title}>Pause Protocol</Text>
          <Text style={styles.subtitle}>
            Before opening {targetApp}, take a breath.
          </Text>

          {/* Timer ring */}
          <View style={styles.ringOuter}>
            <View style={styles.ringInner}>
              <Text style={styles.timer}>{timeLeft}</Text>
            </View>
          </View>

          {/* Quote card */}
          {quote && (
              <View style={styles.quoteContainer}>
                <Text style={styles.quoteText}>{'\u201C'}{quote.text}{'\u201D'}</Text>
                <Text style={styles.quoteAuthor}>— {quote.author}</Text>
              </View>
          )}

          {/* Prompt */}
          <Text style={styles.text}>
            Ask yourself whether you really want to open {targetApp} right now.
          </Text>

          {/* Button */}
          <Pressable
              disabled={!canContinue}
              onPress={handleContinue}
              style={({ pressed }) => [
                styles.button,
                !canContinue && styles.buttonDisabled,
                canContinue && pressed && styles.pressed,
              ]}
          >
            <Text style={[styles.buttonText, !canContinue && styles.buttonTextDisabled]}>
              {canContinue ? 'Continue' : `Wait ${timeLeft}s`}
            </Text>
          </Pressable>

          <Text style={styles.footer}>pause · reflect · proceed</Text>
        </View>
      </>
  );
}

const NAVY        = '#0D1B2E';
const NAVY_CARD   = '#162033';
const NAVY_BORDER = '#1E3050';
const CYAN        = '#38BDF8';
const WHITE       = '#FFFFFF';
const MUTED       = '#7A93B0';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
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

  // ── Header ──────────────────────────────
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: WHITE,
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: MUTED,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },

  // ── Timer ring ───────────────────────────
  ringOuter: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: CYAN,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: CYAN,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
  },
  ringInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: NAVY_BORDER,
    backgroundColor: NAVY_CARD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 52,
    fontWeight: '800',
    color: WHITE,
    letterSpacing: -1,
  },

  // ── Quote card ───────────────────────────
  quoteContainer: {
    backgroundColor: NAVY_CARD,
    borderLeftWidth: 3,
    borderLeftColor: CYAN,
    borderWidth: 1,
    borderColor: NAVY_BORDER,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 24,
    width: '100%',
  },
  quoteText: {
    fontSize: 15,
    color: WHITE,
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: 8,
  },
  quoteAuthor: {
    fontSize: 13,
    color: MUTED,
    textAlign: 'right',
    fontWeight: '500',
  },

  // ── Prompt ───────────────────────────────
  text: {
    fontSize: 15,
    color: MUTED,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },

  // ── Button ───────────────────────────────
  button: {
    backgroundColor: CYAN,
    paddingVertical: 18,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    shadowColor: CYAN,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
    marginBottom: 28,
  },
  buttonDisabled: {
    backgroundColor: NAVY_CARD,
    borderWidth: 1.5,
    borderColor: NAVY_BORDER,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: NAVY,
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  buttonTextDisabled: {
    color: MUTED,
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