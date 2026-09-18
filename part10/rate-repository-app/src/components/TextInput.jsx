import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    backgroundColor: '#ffffff',
  },
  error: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyles = [styles.input, error && styles.error, style];

  return <NativeTextInput style={textInputStyles} {...props} />;
};

export default TextInput;
