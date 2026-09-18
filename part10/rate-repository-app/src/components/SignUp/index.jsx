import { useNavigate } from 'react-router-native';
import useSignUp from '../../hooks/useSignUp';
import SignUpContainer from './SignUpContainer';

const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signUp({ username, password });
      if (data) {
        navigate('/');
      }
    } catch (e) {
      console.error('Sign up error', e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
