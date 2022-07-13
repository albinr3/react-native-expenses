import React, { useState } from 'react';

import {
  ScrollView,
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
import SpentsList from './src/components/SpentsList';

const App = () => {
  const [isValidBudget, setIsValidBudget] = useState(false)
  const [budget, setBudget] = useState(0) 
  const [spents, setSpents] = useState([])
  const [newExpenseModal, setNewExpenseModal] = useState(false)
  const [spentToEdit, setSpentToEdit] = useState({})

  const handleNewBudget = (budget) => {
    if(Number(budget) > 0) {
      setIsValidBudget(true);

    } else {
      Alert.alert("Error", "Budget can not be less than 0")
    }
  }

  //this function is used in the add a new expense form, to add a new expense.
  const handleSpent = spent => {
    if([spent.expenseName, spent.expenseAmmount, spent.ExpenseCategory].includes("")) {
      Alert.alert("Error", "There are empty fields")
    } else {

      if(spent.id) {
        const updatedSpents = spents.map( spentState => 
          spentState.id === spent.id ? spent : spentState
        ); //check for the expense with id we are tryng to edit, and create a new object with the edited spent
        setSpents(updatedSpents)
      } else {
        //add the new expense to the state
        spent.id= Date.now()
        spent.date= spent.id;
        setSpents([...spents, spent]);
      }
      
      setNewExpenseModal(false);
    }
    
  }

  //this function is used to delete an spent
  const handleDelete = spentId => {
    Alert.alert("Do you want to delete this Expense?", "This action can not be undone", [
      {
        text: "No", style: "cancel"
      },
      {
        text: "Yes, delete it", onPress: ()=>{
          const updatedSpents = spents.filter( spentState => spentState.id !== spentId);
          setSpents(updatedSpents);
          setNewExpenseModal(false);
          setSpentToEdit({})
        }
      }
    ])
  }



  return (
    <View style={styles.container}>
      <ScrollView>
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
          handleSpent={handleSpent}
          setSpentToEdit={setSpentToEdit}
          spentToEdit={spentToEdit}
          handleDelete={handleDelete}
          />
        </Modal>
      )}

      {isValidBudget && (
        <SpentsList
        spents={spents}
        setNewExpenseModal={setNewExpenseModal}
        setSpentToEdit={setSpentToEdit}
        />
      )}
    </ScrollView>
    
      {isValidBudget && (
        <Pressable style={styles.btnAdd} onPress={ ()=> setNewExpenseModal(true)}>
          <Image style={styles.addImage}
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
    flex: 1,
    zIndex: 20
  },
  header: {
    backgroundColor:"#3B82F6",
    minHeight: 400
  },
  addImage: {
    width: 60,
    height: 60,
    
  },
  btnAdd: {
    position: "absolute",
    bottom: 10,
    right: 20
  }
});

export default App;
