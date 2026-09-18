import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';
import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardBackground,
    padding: 15,
  },
  content: {
    flexDirection: 'row',
  },
  ratingContainer: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  username: {
    marginBottom: 4,
  },
  date: {
    marginBottom: 8,
  },
  text: {
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
});

const ReviewItem = ({ review, showActions = false, onDelete }) => {
  const navigate = useNavigate();

  const formattedDate = review.createdAt
    ? format(new Date(review.createdAt), 'dd.MM.yyyy')
    : '';

  const handleViewRepo = () => {
    if (review.repositoryId) {
      navigate(`/repositories/${review.repositoryId}`);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (onDelete) {
              onDelete(review.id);
            }
          },
        },
      ]
    );
  };

  const title = showActions
    ? review.repositoryId || 'Repository'
    : review.user?.username || 'User';

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.ratingContainer}>
          <Text color="primary" fontWeight="bold" fontSize="subheading">
            {review.rating}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.username}>
            {title}
          </Text>
          <Text color="textSecondary" style={styles.date}>
            {formattedDate}
          </Text>
          {Boolean(review.text) && (
            <Text style={styles.text}>{review.text}</Text>
          )}
        </View>
      </View>

      {showActions && (
        <View style={styles.actionsRow}>
          <Pressable style={styles.viewButton} onPress={handleViewRepo}>
            <Text color="tab" fontWeight="bold">
              View repository
            </Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={handleDelete}>
            <Text color="tab" fontWeight="bold">
              Delete review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
