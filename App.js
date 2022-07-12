import React, { useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Modal,
  View,
  Alert,
  Pressable,
  Image
} from 'react-native';
import ControlBudget from './src/components/ControlBudget';
import ExpenseForm from './src/components/ExpenseForm';
import Header from './src/components/Header';
import NewBudget from './src/components/NewBudget';


const App = () => {
  const [isValidBudget, setIsValidBudget] = useState(false)
  const [budget, setBudget] = useState(0) 
  const [spents, setSpents] = useState( [
    {id: 1, qty: 100},
    {id: 2, qty: 150},
    {id: 3, qty: 180},
  ])
  const [newExpenseModal, setNewExpenseModal] = useState(false)

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
        <ControlBudget budget={budget} spents={spents}/> :
        <NewBudget
         handleNewBudget={handleNewBudget}
         setBudget={setBudget}
         budget={budget}/> }
        
      </View>

      {newExpenseModal && (
        <Modal animationType='slide' visible={newExpenseModal}>
          <ExpenseForm/>
        </Modal>
      )}
      {isValidBudget && (
        <Pressable onPress={ ()=> setNewExpenseModal(true)}>
          <Image style={styles.image}
            source={require("./src/img/nuevo-gasto.png")}
          />
        </Pressable>
      )}
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
  image: {
    width: 60,
    height: 60,
    position: "absolute",
    top: 90,
    right: 20
  }
});

export default App;
