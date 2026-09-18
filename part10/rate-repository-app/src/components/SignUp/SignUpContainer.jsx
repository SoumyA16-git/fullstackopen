import { View, StyleSheet, Pressable } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextInput from '../TextInput';
import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardBackground,
    padding: 15,
  },
  field: {
    marginBottom: 12,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  errorText: {
    marginTop: 4,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must be at least 1 character')
    .max(30, 'Username cannot be longer than 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password cannot be longer than 50 characters')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

export const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <TextInput
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          onBlur={formik.handleBlur('username')}
          error={formik.touched.username && Boolean(formik.errors.username)}
        />
        {formik.touched.username && formik.errors.username && (
          <Text color="error" style={styles.errorText}>
            {formik.errors.username}
          </Text>
        )}
      </View>

      <View style={styles.field}>
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          error={formik.touched.password && Boolean(formik.errors.password)}
        />
        {formik.touched.password && formik.errors.password && (
          <Text color="error" style={styles.errorText}>
            {formik.errors.password}
          </Text>
        )}
      </View>

      <View style={styles.field}>
        <TextInput
          placeholder="Password confirmation"
          secureTextEntry
          value={formik.values.passwordConfirm}
          onChangeText={formik.handleChange('passwordConfirm')}
          onBlur={formik.handleBlur('passwordConfirm')}
          error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
        />
        {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
          <Text color="error" style={styles.errorText}>
            {formik.errors.passwordConfirm}
          </Text>
        )}
      </View>

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color="tab" fontWeight="bold">
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUpContainer;
