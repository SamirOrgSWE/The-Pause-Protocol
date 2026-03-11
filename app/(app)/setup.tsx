import { View, Text, Pressable, StyleSheet, Alert, Linking } from 'react-native';
import { router } from 'expo-router';

export default function ProfileScreen() {
    const openShortcut = async () => {
    await Linking.openURL('https://www.icloud.com/shortcuts/30519d6c7a1e444fb90bea4b0ed0a5b9');
    };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Setup</Text>
        <Text style={styles.subtitle}>
          Learn how to setup The Pause Protocol here.
        </Text>

        <Pressable
          style={styles.primaryButton}
          onPress={openShortcut}
        >
          <Text style={styles.primaryButtonText}>Download Shortcut</Text>
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
    paddingTop: 0,
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
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    color: '#111111',
    fontWeight: '500',
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
  primaryButton: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    backgroundColor: '#4c00ff',
    borderRadius: 14,
    paddingVertical: 16,
  },
  primaryButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});