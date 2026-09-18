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
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
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
  ownerName: yup.string().required('Repository owner username is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: yup.string().optional(),
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

export const CreateReviewContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <TextInput
          placeholder="Repository owner name"
          value={formik.values.ownerName}
          onChangeText={formik.handleChange('ownerName')}
          onBlur={formik.handleBlur('ownerName')}
          error={formik.touched.ownerName && Boolean(formik.errors.ownerName)}
        />
        {formik.touched.ownerName && formik.errors.ownerName && (
          <Text color="error" style={styles.errorText}>
            {formik.errors.ownerName}
          </Text>
        )}
      </View>

      <View style={styles.field}>
        <TextInput
          placeholder="Repository name"
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange('repositoryName')}
          onBlur={formik.handleBlur('repositoryName')}
          error={formik.touched.repositoryName && Boolean(formik.errors.repositoryName)}
        />
        {formik.touched.repositoryName && formik.errors.repositoryName && (
          <Text color="error" style={styles.errorText}>
            {formik.errors.repositoryName}
          </Text>
        )}
      </View>

      <View style={styles.field}>
        <TextInput
          placeholder="Rating between 0 and 100"
          keyboardType="numeric"
          value={formik.values.rating}
          onChangeText={formik.handleChange('rating')}
          onBlur={formik.handleBlur('rating')}
          error={formik.touched.rating && Boolean(formik.errors.rating)}
        />
        {formik.touched.rating && formik.errors.rating && (
          <Text color="error" style={styles.errorText}>
            {formik.errors.rating}
          </Text>
        )}
      </View>

      <View style={styles.field}>
        <TextInput
          placeholder="Review"
          multiline
          style={styles.multilineInput}
          value={formik.values.text}
          onChangeText={formik.handleChange('text')}
          onBlur={formik.handleBlur('text')}
          error={formik.touched.text && Boolean(formik.errors.text)}
        />
        {formik.touched.text && formik.errors.text && (
          <Text color="error" style={styles.errorText}>
            {formik.errors.text}
          </Text>
        )}
      </View>

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color="tab" fontWeight="bold">
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export default CreateReviewContainer;
