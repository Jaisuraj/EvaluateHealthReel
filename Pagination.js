import React from 'react';
import {View, StyleSheet} from 'react-native';

const Pagination = ({totalItems, activeIndex}) => {
  const renderPaginationDots = () => {
    const dots = [];
    const startIndex = Math.max(0, Math.min(totalItems - 6, activeIndex - 2));
    const endIndex = Math.min(totalItems, startIndex + 6);

    for (let i = startIndex; i < endIndex; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.paginationDot,
            i === activeIndex ? styles.activePaginationDot : null,
          ]}
        />,
      );
    }

    return dots;
  };

  return (
    <View style={styles.paginationContainer}>{renderPaginationDots()}</View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#888', // Color for inactive dots
    margin: 2,
  },
  activePaginationDot: {
    backgroundColor: 'blue', // Color for active dot
  },
});

export default Pagination;
