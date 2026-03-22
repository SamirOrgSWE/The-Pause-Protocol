import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

type FloatingInputProps = TextInputProps & {
  label: string;
  error?: string;
};

export default function FloatingInput({
  label,
  value = '',
  error,
  ...props
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const animated = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 80,
      useNativeDriver: false,
    }).start();
  }, [animated, isFocused, value]);

  const labelStyle = {
    top: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -10],
    }),
    fontSize: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: error
      ? '#c62828'
      : isFocused
      ? '#111111'
      : '#7a7a7a',
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          !!error && styles.inputContainerError,
        ]}
      >
        <Animated.Text style={[styles.label, labelStyle]}>
          {label}
        </Animated.Text>

        <TextInput
          {...props}
          value={value}
          style={styles.input}
          placeholder=""
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },
  inputContainer: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#d6d6d6',
    borderRadius: 14,
    backgroundColor: '#ffffff',
    paddingTop: 18,
    paddingHorizontal: 14,
    minHeight: 64,
    justifyContent: 'center',
  },
  inputContainerFocused: {
    borderColor: '#111111',
  },
  inputContainerError: {
    borderColor: '#c62828',
  },
  label: {
    position: 'absolute',
    left: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 6,
    zIndex: 10,
    fontWeight: '500',
  },
  input: {
    fontSize: 16,
    color: '#111111',
    paddingVertical: 8,
  },
  errorText: {
    marginTop: 6,
    marginLeft: 4,
    fontSize: 13,
    color: '#c62828',
  },
});