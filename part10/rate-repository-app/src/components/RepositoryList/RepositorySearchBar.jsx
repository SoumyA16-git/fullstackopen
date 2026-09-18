import { View, StyleSheet } from 'react-native';
import TextInput from '../TextInput';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 5,
  },
  searchBar: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
});

const RepositorySearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search repositories..."
        value={searchQuery}
        onChangeText={onSearchChange}
      />
    </View>
  );
};

export default RepositorySearchBar;
