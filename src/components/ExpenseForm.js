import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable } from 'react-native'
import React from 'react'
import ModalSelector from 'react-native-modal-selector'


const ExpenseForm = () => {
  let index = 0;
  const data = [ 
    {key: index++, label: "Save", value: "save"},
    {key: index++, label: "Food", value: "food"},
    {key: index++, label: "Home", value: "home"},
    {key: index++, label: "Various Expenses", value: "various"},
    {key: index++, label: "Hobbies", value: "hobbies"},
    {key: index++, label: "Health", value: "health"},
    {key: index++, label: "Subscriptions", value: "subscriptions"},
   ]
  return (
    <SafeAreaView>
      <View>
        <Pressable >
            <Text>Cancel</Text>
        </Pressable>
      </View>

      <View>
        <Text>Expense Name</Text>
        <TextInput 
            placeholder='Name of the expense'
        />
      </View>

      <View>
        <Text>Expense Ammount</Text>
        <TextInput 
            placeholder='Ammount of the expense'
            keyboardType='numeric'
        />
      </View>

      <View>
        <Text>Expense Category</Text>
        <ModalSelector  onChange={(option)=>{ }} initValue="-- Select --"  data={data} />
      </View>

      <Pressable>
        <Text>Add Expense</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default ExpenseForm

const s = StyleSheet.create({

})