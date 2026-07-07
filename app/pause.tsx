import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, AppState, Linking, Alert } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { auth } from '../services/firebase';
import { getRandomQuote } from '../services/quoteService';
import { getCooldownMinutes, DEFAULT_COOLDOWN_MINUTES } from '../services/settingsService';

const FALLBACK_QUOTE = {
  text: 'The pause between stimulus and response is where your freedom lies.',
  author: 'Viktor Frankl',
};

const MIN_SECONDS = 3;
const MAX_SECONDS = 300;
const DEFAULT_SECONDS = 10;

export default function PauseScreen() {
  const { appName, seconds, t } = useLocalSearchParams<{
    appName?: string;
    seconds?: string;
    t?: string;
  }>();

  const targetApp = typeof appName === 'string' && appName.trim() ? appName.trim() : null;

  const parsedSeconds = Number(seconds);
  const startSeconds = Number.isFinite(parsedSeconds) && parsedSeconds > 0
      ? Math.min(Math.max(Math.round(parsedSeconds), MIN_SECONDS), MAX_SECONDS)
      : DEFAULT_SECONDS;

  const [endTime, setEndTime] = useState(() => Date.now() + startSeconds * 1000);
  const [now, setNow] = useState(Date.now());
  const [quote, setQuote] = useState<{ text: string; author: string }>(FALLBACK_QUOTE);
  const [cooldownMinutes, setCooldownMinutes] = useState(DEFAULT_COOLDOWN_MINUTES);

  const appStateRef = useRef(AppState.currentState);

  // Fresh countdown whenever the shortcut re-fires with new params (or the same
  // app re-fires with a new nonce), so leaving and returning to the blocked app
  // always restarts the pause instead of resuming a stale one.
  useEffect(() => {
    setEndTime(Date.now() + startSeconds * 1000);
  }, [appName, seconds, t, startSeconds]);

  useEffect(() => {
    getRandomQuote()
        .then((q) => {
          const candidate = q as unknown as { text?: string; author?: string } | undefined;
          if (candidate?.text && candidate?.author) {
            setQuote({ text: candidate.text, author: candidate.author });
          }
        })
        .catch(() => {});

    getCooldownMinutes()
        .then(setCooldownMinutes)
        .catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(interval);
  }, []);

  // A real backgrounding (not just the notification shade / control center,
  // which only sets "inactive") restarts the timer, so the pause can't be
  // cheesed by switching away and back.
  useEffect(() => {
    const sub = AppState.addEventListener('change', (next) => {
      if (appStateRef.current === 'background' && next === 'active') {
        setEndTime(Date.now() + startSeconds * 1000);
      }
      appStateRef.current = next;
    });
    return () => sub.remove();
  }, [startSeconds]);

  const timeLeft = Math.max(0, Math.ceil((endTime - now) / 1000));
  const canContinue = timeLeft <= 0;

  const goToOwnApp = () => {
    if (router.canDismiss()) router.dismissAll();
    router.replace(auth.currentUser ? '/(app)/home' : '/(auth)/login');
  };

  const handleManualDone = () => {
    if (!canContinue) return;
    if (router.canGoBack()) {
      router.back();
    } else {
      goToOwnApp();
    }
  };

  const handleContinue = async () => {
    if (!canContinue || !targetApp) return;
    // Pipe-delimited on purpose: the shortcut branches on "contains CONTINUE|",
    // so trigger-mode input (a bare app name) never hits a JSON parser.
    const payload = `CONTINUE|${targetApp}|${cooldownMinutes}`;
    const url = `shortcuts://run-shortcut?name=${encodeURIComponent('The Pause Protocol')}&input=text&text=${encodeURIComponent(payload)}`;
    try {
      await Linking.openURL(url);
      goToOwnApp();
    } catch {
      Alert.alert(
          'Shortcut missing',
          'Install "The Pause Protocol" shortcut from Setup, then try again.'
      );
    }
  };

  const handleSkip = () => {
    if (!canContinue) return;
    goToOwnApp();
  };

  const displayApp = targetApp || 'a distraction';

  return (
      <>
        <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} />

        <View style={styles.container}>
          <View style={styles.glowTop} />

          {/* Header */}
          <Text style={styles.title}>Pause Protocol</Text>
          <Text style={styles.subtitle}>
            Before opening {displayApp}, take a breath.
          </Text>

          {/* Timer ring */}
          <View style={styles.ringOuter}>
            <View style={styles.ringInner}>
              <Text style={styles.timer}>{timeLeft}</Text>
            </View>
          </View>

          {/* Quote card */}
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>{'“'}{quote.text}{'”'}</Text>
            <Text style={styles.quoteAuthor}>— {quote.author}</Text>
          </View>

          {/* Prompt */}
          <Text style={styles.text}>
            Ask yourself whether you really want to open {displayApp} right now.
          </Text>

          {/* Buttons */}
          {targetApp ? (
              <>
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
                    {canContinue ? `Continue to ${targetApp}` : `Wait ${timeLeft}s`}
                  </Text>
                </Pressable>

                {canContinue && (
                    <Pressable
                        onPress={handleSkip}
                        style={({ pressed }) => [styles.skipButton, pressed && styles.pressed]}
                    >
                      <Text style={styles.skipButtonText}>Skip</Text>
                    </Pressable>
                )}
              </>
          ) : (
              <Pressable
                  disabled={!canContinue}
                  onPress={handleManualDone}
                  style={({ pressed }) => [
                    styles.button,
                    !canContinue && styles.buttonDisabled,
                    canContinue && pressed && styles.pressed,
                  ]}
              >
                <Text style={[styles.buttonText, !canContinue && styles.buttonTextDisabled]}>
                  {canContinue ? 'Done' : `Wait ${timeLeft}s`}
                </Text>
              </Pressable>
          )}

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
    marginBottom: 14,
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
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
    marginBottom: 14,
  },
  skipButtonText: {
    color: MUTED,
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 0.3,
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
