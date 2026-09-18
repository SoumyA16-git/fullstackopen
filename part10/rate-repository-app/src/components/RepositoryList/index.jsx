import { useState } from 'react';
import { View } from 'react-native';
import { useDebounce } from 'use-debounce';
import useRepositories from '../../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';
import RepositoryOrderPicker, { ORDER_OPTIONS } from './RepositoryOrderPicker';
import RepositorySearchBar from './RepositorySearchBar';

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('LATEST');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const orderConfig = ORDER_OPTIONS[selectedOrder] || ORDER_OPTIONS.LATEST;

  const { repositories, fetchMore } = useRepositories({
    orderBy: orderConfig.orderBy,
    orderDirection: orderConfig.orderDirection,
    searchKeyword: debouncedSearch,
    first: 8,
  });

  const onEndReach = () => {
    fetchMore();
  };

  const renderHeader = (
    <View>
      <RepositorySearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <RepositoryOrderPicker
        selectedOrder={selectedOrder}
        onOrderChange={setSelectedOrder}
      />
    </View>
  );

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      headerComponent={renderHeader}
    />
  );
};

export default RepositoryList;
