import { View, StyleSheet } from 'react-native';
import RepositoryItem from '../RepositoryList/RepositoryItem';
import ItemSeparator from '../ItemSeparator';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});

const RepositoryInfo = ({ repository }) => {
  if (!repository) {
    return null;
  }

  return (
    <View style={styles.container}>
      <RepositoryItem item={repository} showGithubButton={true} />
      <ItemSeparator />
    </View>
  );
};

export default RepositoryInfo;
