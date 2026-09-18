import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';
import { ME } from '../graphql/queries';

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: ME, variables: { includeReviews: true } }],
  });

  const deleteReview = async (id) => {
    const { data } = await mutate({
      variables: { id },
    });
    return data;
  };

  return [deleteReview, result];
};

export default useDeleteReview;
