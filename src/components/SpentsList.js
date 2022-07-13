import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Spent from './Spent'

const SpentsList = ({spents, setNewExpenseModal, setSpentToEdit}) => {
  return (
    <View style={s.container}>
      <Text style={s.title}>Expense list</Text>

      {spents.length === 0 ? (
        <Text style={s.noSpent}>There are no expenses</Text>
      ) : 
      (spents.map( spent => 
        <Spent 
         key={spent.id}
         spent={spent} 
         setNewExpenseModal={setNewExpenseModal}
         setSpentToEdit={setSpentToEdit}/>
      ))}
    </View>
  )
}

export default SpentsList

const s = StyleSheet.create({
    container: {
        marginTop: 70,
        marginBottom: 100
    },
    title: {
        color: "#64748b",
        fontSize: 30,
        textAlign: "center",
        fontWeight: "700"
    },
    noSpent: {
        marginVertical: 20,
        textAlign: "center",
        fontSize: 20
    }
})