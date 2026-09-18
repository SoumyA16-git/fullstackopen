import { StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Text from '../Text';

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 18,
  },
});

const AppBarTab = ({ children, to, onPress }) => {
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={styles.tab}>
        <Text color="tab" fontWeight="bold" fontSize="subheading">
          {children}
        </Text>
      </Pressable>
    );
  }

  return (
    <Link to={to} style={styles.tab}>
      <Text color="tab" fontWeight="bold" fontSize="subheading">
        {children}
      </Text>
    </Link>
  );
};

export default AppBarTab;
