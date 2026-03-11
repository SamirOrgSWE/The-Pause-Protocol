import { View, Text, Pressable, StyleSheet, Linking, ScrollView } from 'react-native';

export default function ProfileScreen() {
  const openShortcut = async () => {
    await Linking.openURL(
      'https://www.icloud.com/shortcuts/79062e800f7e4ff990a9e2689a803ae8'
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Setup</Text>
        <Text style={styles.subtitle}>
          Learn how to set up The Pause Protocol on your iPhone.
        </Text>

        <View style={styles.stepCard}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <View style={styles.stepTextWrapper}>
            <Text style={styles.stepTitle}>Download the shortcut</Text>
            <Text style={styles.stepDescription}>
              Tap the button below and add the Pause Protocol shortcut to your Shortcuts app.
            </Text>
          </View>
        </View>

        <View style={styles.stepCard}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <View style={styles.stepTextWrapper}>
            <Text style={styles.stepTitle}>Within the Shortcuts app...</Text>
            <Text style={styles.stepDescription}>
              Go to the Automation tab and create a new personal automation (+ sign in the top right).
            </Text>
          </View>
        </View>

        <View style={styles.stepCard}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <View style={styles.stepTextWrapper}>
            <Text style={styles.stepTitle}>Choose the app triggers</Text>
            <Text style={styles.stepDescription}>
              Select the option that says 'App', choose all apps you consider distractions, and set it to 'Is Opened' and 'Run Immediately'.
            </Text>
          </View>
        </View>

        <View style={styles.stepCard}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>4</Text>
          </View>
          <View style={styles.stepTextWrapper}>
            <Text style={styles.stepTitle}>Run the Pause Protocol shortcut</Text>
            <Text style={styles.stepDescription}>
              Search for 'The Pause Protocol' and select it.
            </Text>
          </View>
        </View>

        <View style={styles.stepCard}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>5</Text>
          </View>
          <View style={styles.stepTextWrapper}>
            <Text style={styles.stepTitle}>Congratulations!</Text>
            <Text style={styles.stepDescription}>
              You have successfully setup The Pause Protocol!
            </Text>
          </View>
        </View>
      </ScrollView>

        <Pressable style={styles.primaryButton} onPress={openShortcut}>
          <Text style={styles.primaryButtonText}>Download the Shortcut</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 140,
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
    lineHeight: 22,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f8f8fb',
    borderWidth: 1,
    borderColor: '#ececf2',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4c00ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  stepTextWrapper: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 34,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
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