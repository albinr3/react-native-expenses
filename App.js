import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import Filter from './src/components/Filter';
import Header from './src/components/Header';
import NewBudget from './src/components/NewBudget';
import SpentsList from './src/components/SpentsList';


const App = () => {
  const [isValidBudget, setIsValidBudget] = useState(false)
  const [budget, setBudget] = useState(0) 
  const [spents, setSpents] = useState([])
  const [newExpenseModal, setNewExpenseModal] = useState(false)
  const [spentToEdit, setSpentToEdit] = useState({})
  const [filter, setFilter] = useState("select") 
  const [filterSpents, setfilterSpents] = useState([])
  const [showFilter, setShowFilter] = useState(false);

  //use effect to get the saved budget on the storage
  useEffect(()=>{
    const getAsyncBudget = async ()=>{
      try {
        const budgetStorage = await AsyncStorage.getItem("apv_budget") ?? 0;

        if(budgetStorage > 0){
          setBudget(budgetStorage) 
          setIsValidBudget(true)
        }
         
      } catch (error) {
        console.log(error)
      }
      
    }
    getAsyncBudget()
  }, [])
  
  //use effect to set the budget to the storage
  useEffect(() => {
    if(isValidBudget){
    const saveAsyncBudget = async ()=>{
      try {
        await AsyncStorage.setItem("apv_budget", budget)
        console.log("almacenado")
      } catch (error) {
        console.log(error)
      }
      
    }
    saveAsyncBudget()
  }
  }, [isValidBudget])

  //use effect to get the saved spents on the storage
  useEffect(() => {
    async function getAsyncSpents() {
      try {
        const spentsStorage = await AsyncStorage.getItem("apv_spents");
        
        setSpents(spentsStorage ? JSON.parse(spentsStorage) : []) 
      } catch (error) {
        console.log(error)
      }
    };

    getAsyncSpents()
  }, [])

  //use effect to set the spents to the storage
  useEffect(() => {
    
    const saveAsyncSpents = async () => {
        try {
          await AsyncStorage.setItem("apv_spents", JSON.stringify(spents))
          const spentsStorage = await AsyncStorage.getItem("apv_spents")
          console.log(spentsStorage)
        } catch (error) {
          console.log(error)
        }
     
    };

    saveAsyncSpents()
  }, [spents])

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

  const resetApp = () => {

    Alert.alert("Do you want to reset the app?", "This will delete your budget and all spents", 
    [
      {text: "No", style: "cancel"},
      {text: "Yes, Reset the app", onPress: async ()=>{
        try {
          await AsyncStorage.clear()
          setBudget(0)
          setSpents([])
          setIsValidBudget(false)
        } catch (error) {
          console.log(error)
        }
        
      }}
    ]);
    
  }


  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.header}>
        <Header/>
        {isValidBudget ? 
        <ControlBudget resetApp={resetApp} budget={budget} spents={spents}/> :
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
        <>
          {showFilter && (
            <Filter
            setFilter={setFilter}
            filter={filter}
            spents={spents}
            setfilterSpents={setfilterSpents}
          />
          )}
          <SpentsList
          spents={spents}
          setNewExpenseModal={setNewExpenseModal}
          setSpentToEdit={setSpentToEdit}
          filterSpents={filterSpents}
          filter={filter}
          setShowFilter={setShowFilter}
          />
        </>
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
