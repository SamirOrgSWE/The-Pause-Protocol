import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Pause Protocol</Text>
        <Text style={styles.subtitle}>
          Choose where you want to go next.
        </Text>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push('/(app)/setup')}
        >
          <Text style={styles.primaryButtonText}>Setup</Text>
        </Pressable>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push('/(app)/pause')}
        >
          <Text style={styles.primaryButtonText}>Manual Pause</Text>
        </Pressable>
        {/*button for reflection page (not including for this project)*/}
        {/* <Pressable
          style={styles.primaryButton}
          onPress={() => router.push('/(app)/reflect')}
        >
          <Text style={styles.primaryButtonText}>Reflect</Text>
        </Pressable> */}

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.push('/(app)/profile')}
        >
          <Text style={styles.secondaryButtonText}>Profile</Text>
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
  },
  secondaryButtonText: {
    textAlign: 'center',
    color: '#111111',
    fontSize: 16,
    fontWeight: '500',
  },
});