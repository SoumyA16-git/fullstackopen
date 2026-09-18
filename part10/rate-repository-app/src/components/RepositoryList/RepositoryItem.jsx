import { View, Image, StyleSheet, Pressable, Linking } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardBackground,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  info: {
    flex: 1,
    alignItems: 'flex-start',
  },
  name: {
    marginBottom: 5,
  },
  description: {
    marginBottom: 8,
  },
  languageBadge: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    marginBottom: 4,
  },
  githubButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
});

export const formatCount = (count) => {
  if (count >= 1000) {
    const formatted = (count / 1000).toFixed(1);
    return formatted.endsWith('.0')
      ? `${formatted.slice(0, -2)}k`
      : `${formatted}k`;
  }
  return String(count);
};

const RepositoryItem = ({ item, showGithubButton = false }) => {
  const navigate = useNavigate();

  const handlePress = () => {
    if (item?.id) {
      navigate(`/repositories/${item.id}`);
    }
  };

  const handleOpenGithub = () => {
    if (item?.url) {
      void Linking.openURL(item.url);
    }
  };

  return (
    <Pressable onPress={handlePress} testID="repositoryItem">
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
          <View style={styles.info}>
            <Text
              fontWeight="bold"
              fontSize="subheading"
              style={styles.name}
              testID="name"
            >
              {item.fullName}
            </Text>
            <Text
              color="textSecondary"
              style={styles.description}
              testID="description"
            >
              {item.description}
            </Text>
            <View style={styles.languageBadge}>
              <Text color="tab" fontWeight="bold" testID="language">
                {item.language}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text fontWeight="bold" style={styles.statValue} testID="stargazersCount">
              {formatCount(item.stargazersCount)}
            </Text>
            <Text color="textSecondary">Stars</Text>
          </View>

          <View style={styles.statItem}>
            <Text fontWeight="bold" style={styles.statValue} testID="forksCount">
              {formatCount(item.forksCount)}
            </Text>
            <Text color="textSecondary">Forks</Text>
          </View>

          <View style={styles.statItem}>
            <Text fontWeight="bold" style={styles.statValue} testID="reviewCount">
              {formatCount(item.reviewCount)}
            </Text>
            <Text color="textSecondary">Reviews</Text>
          </View>

          <View style={styles.statItem}>
            <Text fontWeight="bold" style={styles.statValue} testID="ratingAverage">
              {item.ratingAverage}
            </Text>
            <Text color="textSecondary">Rating</Text>
          </View>
        </View>

        {showGithubButton && (
          <Pressable style={styles.githubButton} onPress={handleOpenGithub}>
            <Text color="tab" fontWeight="bold">
              Open in GitHub
            </Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export default RepositoryItem;
