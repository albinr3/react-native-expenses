import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import globalStyles from '../styles';

const Spent = ({spent}) => {
  const {expenseName, expenseAmmount, expenseCategory} = spent;
  return (
    <View style={s.container}>
      <Text>{expenseName}</Text>
    </View>
  );
};

export default Spent;

const s = StyleSheet.create({
  container: {
    ...globalStyles.container,
    marginBottom: 20,
  },
});
