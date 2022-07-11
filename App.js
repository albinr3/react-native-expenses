import React, { useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import ControlBudget from './src/img/components/ControlBudget';
import Header from './src/img/components/Header';
import NewBudget from './src/img/components/NewBudget';

const App = () => {
  const [isValidBudget, setIsValidBudget] = useState(true)

  const handleNewBudget = (budget) => {
    if(Number(budget) > 0) {
      setIsValidBudget(true);

    } else {
      Alert.alert("Error", "Budget can not be less than 0")
    }
  }

  return (
    <View>
      <View style={styles.header}>
        <Header/>
        {isValidBudget ? 
        <ControlBudget/> :
        <NewBudget handleNewBudget={handleNewBudget}/> }
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1
  },
  header: {
    backgroundColor:"#3B82F6",
  },
});

export default App;
