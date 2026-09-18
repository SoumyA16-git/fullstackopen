import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  picker: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
});

export const ORDER_OPTIONS = {
  LATEST: {
    label: 'Latest repositories',
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  HIGHEST_RATED: {
    label: 'Highest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  LOWEST_RATED: {
    label: 'Lowest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
};

const RepositoryOrderPicker = ({ selectedOrder, onOrderChange }) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedOrder}
        onValueChange={(itemValue) => onOrderChange(itemValue)}
        style={styles.picker}
      >
        <Picker.Item
          label={ORDER_OPTIONS.LATEST.label}
          value="LATEST"
        />
        <Picker.Item
          label={ORDER_OPTIONS.HIGHEST_RATED.label}
          value="HIGHEST_RATED"
        />
        <Picker.Item
          label={ORDER_OPTIONS.LOWEST_RATED.label}
          value="LOWEST_RATED"
        />
      </Picker>
    </View>
  );
};

export default RepositoryOrderPicker;
