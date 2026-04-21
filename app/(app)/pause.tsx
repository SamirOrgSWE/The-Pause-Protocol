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
    getRandomQuote().then((q) => setQuote(q as unknown as { text: string; author: string }));  }, []);

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
      <Stack.Screen/>

      <View style={styles.container}>
        <Text style={styles.title}>Pause Protocol</Text>

        <Text style={styles.subtitle}>
          Before opening {targetApp}, take a breath.
        </Text>

        <View style={styles.circle}>
          <Text style={styles.timer}>{timeLeft}</Text>
        </View>

        {quote && (
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteText}>{'\u201C'}{quote.text}{'\u201D'}</Text>
              <Text style={styles.quoteAuthor}>— {quote.author}</Text>
            </View>
        )}

        <Text style={styles.text}>
          Ask yourself whether you really want to open {targetApp} right now.
        </Text>

        <Pressable
          disabled={!canContinue}
          onPress={handleContinue}
          style={[styles.button, !canContinue && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>
            {canContinue ? 'Continue' : `Wait ${timeLeft}s`}
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 24,
  },
  circle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 6,
    borderColor: '#38bdf8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  timer: {
    fontSize: 56,
    fontWeight: '700',
    color: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#e2e8f0',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 28,
  },
  button: {
    backgroundColor: '#38bdf8',
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: 14,
    minWidth: 220,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#334155',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  quoteContainer: {
    backgroundColor: '#1e293b',
    borderLeftWidth: 4,
    borderLeftColor: '#38bdf8',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    width: '100%',
  },
  quoteText: {
    fontSize: 15,
    color: '#e2e8f0',
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: 6,
  },
  quoteAuthor: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'right',
  },
});