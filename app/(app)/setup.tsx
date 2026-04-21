import { View, Text, Pressable, StyleSheet, Linking, ScrollView, Alert } from 'react-native';
import { Stack } from 'expo-router';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';

export default function SetupScreen() {
  const openShortcut = async () => {
    try {
      await Linking.openURL(
          'https://www.icloud.com/shortcuts/c90c212f52e74af99cebc7b6be414250'
      );
    } catch (error) {
      console.error('Could not open shortcut link:', error);
      Alert.alert('Error', 'Could not open the shortcut link.');
    }
  };

  const downloadJsonFile = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + 'cooldowns.json';

      const initialData = {
      };

      await FileSystem.writeAsStringAsync(
          fileUri,
          JSON.stringify(initialData, null, 2)
      );

      const available = await Sharing.isAvailableAsync();

      if (!available) {
        Alert.alert(
            'Sharing unavailable',
            'Could not open the share sheet on this device.'
        );
        return;
      }

      await Sharing.shareAsync(fileUri, {
        mimeType: 'application/json',
        dialogTitle: 'Save cooldowns.json to Files',
        UTI: 'public.json',
      });
    } catch (error) {
      console.error('Could not create JSON file:', error);
      Alert.alert('Error', 'Could not create or share the cooldown file.');
    }
  };

  const steps = [
    {
      title: 'Download the cooldown file',
      description:
          'Tap the cooldown file button below and save cooldowns.json to the Shortcuts folder under iCloud Drive.',
    },
    {
      title: 'Download the shortcut',
      description:
          'Tap the button below and add the Pause Protocol shortcut to your Shortcuts app. IMPORTANT NOTE: under the third block of the script, you must manually select the cooldowns file you saved previously.',
    },
    {
      title: 'Set up the automation',
      description:
          'In Shortcuts, go to Automation, create a Personal Automation, choose App, then pick the distracting apps you want.',
    },
    {
      title: 'Select the proper settings',
      description:
          "Select the option that says 'App', choose all apps you consider distractions, and set it to 'Is Opened' and 'Run Immediately' and make sure 'Notify When Run' is off.",
    },
    {
      title: 'Run the Pause Protocol shortcut',
      description:
          "Tap 'Next' and then under 'My Shortcuts' select 'The Pause Protocol'.",
    },
    {
      title: 'Congratulations!',
      description: 'You have successfully setup The Pause Protocol!',
    },
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
        </ScrollView>

        <View style={styles.footer}>
          <Pressable
              style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
              onPress={downloadJsonFile}
          >
            <Text style={styles.secondaryButtonText}>Download the Cooldown File</Text>
          </Pressable>
          <Pressable
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
              onPress={openShortcut}
          >
            <Text style={styles.primaryButtonText}>Download the Shortcut</Text>
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
    paddingBottom: 180,
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
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: NAVY_BORDER,
    borderRadius: 50,
    paddingVertical: 18,
    backgroundColor: NAVY_CARD,
  },
  secondaryButtonText: {
    color: WHITE,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.975 }],
  },
});