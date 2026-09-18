import React from 'react';
import { FlatList } from 'react-native';
import RepositoryItem from './RepositoryItem';
import ItemSeparator from '../ItemSeparator';

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    return this.props.headerComponent || null;
  };

  render() {
    const { repositories, onEndReach } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

export default RepositoryListContainer;
