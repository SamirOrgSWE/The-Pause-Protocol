import { View, Text, Pressable, StyleSheet, Linking, ScrollView, Alert } from 'react-native';
import { Stack } from 'expo-router';

// TODO: replace after rehosting the rebuilt single shortcut (see setup steps below).
const SHORTCUT_URL = 'https://www.icloud.com/shortcuts/REPLACE_ME';

export default function SetupScreen() {
  const openShortcutLink = async () => {
    try {
      await Linking.openURL(SHORTCUT_URL);
    } catch (error) {
      console.error('Could not open the shortcut link:', error);
      Alert.alert('Error', 'Could not open the shortcut link.');
    }
  };

  const steps = [
    {
      title: 'Get the shortcut',
      description:
          'Tap "Get the Shortcut" below and add "The Pause Protocol" to your Shortcuts app.',
    },
    {
      title: 'Run it once, manually',
      description:
          'From the Shortcuts app, run "The Pause Protocol" once and approve every prompt (file access, opening links). This one-time approval is what lets it run silently later. It should land you on the pause screen.',
    },
    {
      title: 'Create one automation per blocked app',
      description:
          'In Shortcuts → Automation → New Personal Automation → App, choose ONE distracting app → "Is Opened" → Run Immediately, with Notify When Run turned OFF. Add a new blank action: a Text action containing that app\'s exact name, then Run Shortcut → "The Pause Protocol" with Input set to that Text. Repeat for each app you want blocked - one automation per app.',
    },
    {
      title: 'Set your cooldown',
      description:
          'Go to Profile and choose how long "Continue" should unlock an app for before the pause appears again.',
    },
    {
      title: 'Congratulations!',
      description:
          'Open one of your blocked apps to test - you should land on the pause screen within a second or two. The first time you tap Continue, approve the "open app?" prompt once.',
    },
  ];

  const notes = [
    'Popular apps (Instagram, TikTok, YouTube, X, Snapchat, Reddit, Facebook) work out of the box. For any other app, add it to the AppSchemes dictionary inside the shortcut.',
    'The shortcut keeps a small cooldowns.json file in your iCloud Drive → Shortcuts folder to remember your cooldowns. It contains only app names and times, and never leaves your iCloud.',
  ];

  return (
      <View style={styles.screen}>
        <Stack.Screen options={{
          headerShown: true,
          title: 'Setup',
          headerStyle: { backgroundColor: '#0D1B2E' },
          headerTintColor: '#38BDF8',
          headerTitleStyle: { fontWeight: '700', color: '#FFFFFF' },
          headerShadowVisible: false,
        }} />

        <View style={styles.glowTop} />

        <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
          {steps.map((step, index) => (
              <View key={index} style={styles.stepCard}>
                <View style={[styles.stepNumber, index === steps.length - 1 && styles.stepNumberFinal]}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.stepTextWrapper}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
              </View>
          ))}

          {notes.map((note, index) => (
              <View key={index} style={styles.noteCard}>
                <Text style={styles.stepDescription}>{note}</Text>
              </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <Pressable
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
              onPress={openShortcutLink}
          >
            <Text style={styles.primaryButtonText}>Get the Shortcut</Text>
          </Pressable>
        </View>
      </View>
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 140,
  },
  noteCard: {
    backgroundColor: NAVY_CARD,
    borderWidth: 1,
    borderColor: NAVY_BORDER,
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    opacity: 0.85,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: NAVY_CARD,
    borderWidth: 1,
    borderColor: NAVY_BORDER,
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: CYAN,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    marginTop: 2,
    backgroundColor: '#0E2A3D',
    shadowColor: CYAN,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  stepNumberFinal: {
    borderColor: '#4ADE80',
    backgroundColor: '#0D2E1A',
    shadowColor: '#4ADE80',
  },
  stepNumberText: {
    color: CYAN,
    fontSize: 14,
    fontWeight: '700',
  },
  stepTextWrapper: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: WHITE,
    marginBottom: 5,
    letterSpacing: 0.1,
  },
  stepDescription: {
    fontSize: 14,
    color: MUTED,
    lineHeight: 21,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 34,
    backgroundColor: NAVY,
    borderTopWidth: 1,
    borderTopColor: NAVY_BORDER,
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
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.975 }],
  },
});
