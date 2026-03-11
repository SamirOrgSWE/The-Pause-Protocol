import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function PauseScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Pause</Text>
        <Text style={styles.subtitle}>
          This is where the guided pause feature will go.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Take a moment</Text>
          <Text style={styles.cardText}>
            Breathe in slowly. Hold. Breathe out. Let this be your reset space.
          </Text>
        </View>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push('/(app)/reflect')}
        >
          <Text style={styles.primaryButtonText}>Go to Reflection</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.secondaryButtonText}>Back</Text>
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
    paddingTop: 100,
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
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555555',
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
  },
  secondaryButtonText: {
    textAlign: 'center',
    color: '#111111',
    fontSize: 16,
    fontWeight: '500',
  },
});