import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React from 'react'
import Spent from './Spent'

const SpentsList = ({spents, setNewExpenseModal, setSpentToEdit, filterSpents, filter, setShowFilter}) => {
  return (
    <View style={s.container}>
      
      <Text style={s.title}>Expense list</Text>
      <View style={s.presableContainer}>
        <Pressable onPress={()=>setShowFilter(true)}>
          <Text style={s.textBtn}>Filtrar</Text>
        </Pressable>
      </View>
      {filter !== "select" ? filterSpents.map( spent => 
        <Spent 
         key={spent.id}
         spent={spent} 
         setNewExpenseModal={setNewExpenseModal}
         setSpentToEdit={setSpentToEdit}/>
      ) : 
      (spents.map( spent => 
        <Spent 
         key={spent.id}
         spent={spent} 
         setNewExpenseModal={setNewExpenseModal}
         setSpentToEdit={setSpentToEdit}/>
      ))}

      {spents.length === 0 || filterSpents.length === 0 && (
        <Text style={s.noSpent}>There are no expenses</Text>
      )}
    </View>
  )
}

export default SpentsList

const s = StyleSheet.create({
    container: {
        marginTop: 30,
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
    },
    presableContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginHorizontal: 20,
      
    },
    textBtn: {
      fontSize: 20,
      fontWeight: "400",
      paddingHorizontal: 5,
      borderWidth: 1
    }
})