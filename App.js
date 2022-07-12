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
  const [spents, setSpents] = useState([])
  const [newExpenseModal, setNewExpenseModal] = useState(false)

  const handleNewBudget = (budget) => {
    if(Number(budget) > 0) {
      setIsValidBudget(true);

    } else {
      Alert.alert("Error", "Budget can not be less than 0")
    }
  }

  //this function is used in the add a new expense form, to add a new expense.
  const handleSpent = spent => {
    if(Object.values(spent).includes("")) {
      Alert.alert("Error", "There are empty fields")
    } else {
      //add the new expense to the state
      spent.id=Date.now()
      setSpents([...spents, spent]);
      setNewExpenseModal(false);
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
          <ExpenseForm 
          setNewExpenseModal={setNewExpenseModal}
          handleSpent={handleSpent}/>
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
