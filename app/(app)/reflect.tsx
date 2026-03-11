// //Idea discontinued for now

// import { useState } from 'react';
// import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
// import { router } from 'expo-router';

// export default function ReflectScreen() {
//   const [reflection, setReflection] = useState('');

//   const handleSave = () => {
//     Alert.alert('Reflection saved', 'Your reflection has been saved.');
//     setReflection('');
//   };

//   return (
//     <View style={styles.screen}>
//       <View style={styles.container}>
//         <Text style={styles.title}>Reflect</Text>
//         <Text style={styles.subtitle}>
//           Write a short reflection about how you feel right now.
//         </Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Type your reflection here..."
//           placeholderTextColor="#888888"
//           multiline
//           value={reflection}
//           onChangeText={setReflection}
//           textAlignVertical="top"
//         />

//         <Pressable style={styles.primaryButton} onPress={handleSave}>
//           <Text style={styles.primaryButtonText}>Save Reflection</Text>
//         </Pressable>

//         <Pressable
//           style={styles.secondaryButton}
//           onPress={() => router.back()}
//         >
//           <Text style={styles.secondaryButtonText}>Back</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: 24,
//     paddingTop: 100,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: '700',
//     textAlign: 'center',
//     color: '#111111',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#666666',
//     marginBottom: 28,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#d6d6d6',
//     borderRadius: 16,
//     paddingHorizontal: 16,
//     paddingTop: 16,
//     paddingBottom: 16,
//     fontSize: 16,
//     minHeight: 180,
//     color: '#111111',
//     backgroundColor: '#ffffff',
//     marginBottom: 20,
//   },
//   primaryButton: {
//     backgroundColor: '#111111',
//     borderRadius: 14,
//     paddingVertical: 16,
//     marginBottom: 14,
//   },
//   primaryButtonText: {
//     color: '#ffffff',
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   secondaryButton: {
//     borderWidth: 1,
//     borderColor: '#d6d6d6',
//     borderRadius: 14,
//     paddingVertical: 16,
//   },
//   secondaryButtonText: {
//     textAlign: 'center',
//     color: '#111111',
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });