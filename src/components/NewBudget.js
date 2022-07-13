import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import globalStyles from '../styles'


const NewBudget = ({handleNewBudget, budget, setBudget}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Write Your Budget</Text>

      <TextInput
        keyboardType='numeric'
        placeholder='Add your budget ex. 300'
        style={styles.input}
        value={budget.toString()}
        onChangeText={setBudget}
        />
      <Pressable style={styles.button}
        onPress={() => handleNewBudget(budget)}>
        <Text style={styles.btnText}>Add Budget</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      ...globalStyles.container,
    },
    label: {
        textAlign: "center",
        fontSize: 24,
        color: "#3b82f6"
    },
    input: {
        backgroundColor: "#f5f5f5",
        padding: 10,
        borderRadius: 10,
        textAlign: "center",
        marginTop: 30
    },
    button: {
        marginTop: 30,
        backgroundColor: "#1048a4",
        padding: 10,
        borderRadius: 10
    },
    btnText: {
        color: "#fff",
        textAlign: "center",
        textTransform: "uppercase",
        fontWeight: "bold"
    }
})

export default NewBudget