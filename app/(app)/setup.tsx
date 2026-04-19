import { View, Text, Pressable, StyleSheet, Linking, ScrollView, Alert } from 'react-native';
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
            <Text style={styles.stepTitle}>Download the cooldown file</Text>

            <Text style={styles.stepDescription}>
              Tap the cooldown file button below and save cooldowns.json to the Shortcuts folder under iCloud Drive.
            </Text>
          </View>
        </View>

        <View style={styles.stepCard}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>

          <View style={styles.stepTextWrapper}>
            <Text style={styles.stepTitle}>Download the shortcut</Text>

            <Text style={styles.stepDescription}>
              Tap the button below and add the Pause Protocol shortcut to your Shortcuts app. IMPORTANT NOTE: under the third block of the script, you must manually select the cooldowns file you saved previously.
            </Text>
          </View>
        </View>

        <View style={styles.stepCard}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>

          <View style={styles.stepTextWrapper}>
            <Text style={styles.stepTitle}>Set up the automation</Text>

            <Text style={styles.stepDescription}>
              In Shortcuts, go to Automation, create a Personal Automation, choose App, then pick
              the distracting apps you want.
            </Text>
          </View>
        </View>

        <View style={styles.stepCard}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>4</Text>
          </View>

          <View style={styles.stepTextWrapper}>
            <Text style={styles.stepTitle}>Select the proper settings</Text>

            <Text style={styles.stepDescription}>
              Select the option that says 'App', choose all apps you consider distractions, and set it to 'Is Opened' and 'Run Immediately' and make sure 'Notify When Run' is off.
            </Text>
          </View>
        </View>

        <View style={styles.stepCard}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>5</Text>
          </View>

          <View style={styles.stepTextWrapper}>
            <Text style={styles.stepTitle}>Run the Pause Protocol shortcut</Text>

            <Text style={styles.stepDescription}>
              Tap 'Next' and then under 'My Shortcuts' select 'The Pause Protocol'.
            </Text>
          </View>
        </View>

        <View style={styles.stepCard}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>6</Text>
          </View>

          <View style={styles.stepTextWrapper}>
            <Text style={styles.stepTitle}>Congratulations!</Text>

            <Text style={styles.stepDescription}>
              You have successfully setup The Pause Protocol!
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.secondaryButton} onPress={downloadJsonFile}>
          <Text style={styles.secondaryButtonText}>Download the Cooldown File</Text>
        </Pressable>
        <Pressable style={styles.primaryButton} onPress={openShortcut}>
          <Text style={styles.primaryButtonText}>Download the Shortcut</Text>
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 180,
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
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#4c00ff',
    borderRadius: 14,
    paddingVertical: 16,
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: '#4c00ff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});