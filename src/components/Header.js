import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View>
      <Text style={styles.text}>Expense Planner</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    
    text: {
        textAlign: "center",
        fontSize: 30,
        color: "#FFF",
        textTransform: "uppercase",
        fontWeight: "bold",
        paddingVertical: 20
    }
})

export default Header