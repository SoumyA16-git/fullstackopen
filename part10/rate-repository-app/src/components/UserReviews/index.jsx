import { FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { ME } from '../../graphql/queries';
import useDeleteReview from '../../hooks/useDeleteReview';
import ReviewItem from '../SingleRepository/ReviewItem';
import ItemSeparator from '../ItemSeparator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const UserReviews = () => {
  const { data, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  const [deleteReview] = useDeleteReview();

  const reviews = data?.me?.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      await refetch();
    } catch (e) {
      console.error('Delete review error', e);
    }
  };

  return (
    <FlatList
      style={styles.container}
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem review={item} showActions onDelete={handleDelete} />
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default UserReviews;
