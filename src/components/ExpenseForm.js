import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import ModalSelector from 'react-native-modal-selector';
import globalStyles from '../styles';

const ExpenseForm = ({setNewExpenseModal, handleSpent}) => {

  const [expenseName, setExpenseName] = useState("");
  const [expenseAmmount, setExpenseAmmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [initialPicker, setInitialPicker] = useState(0);

  const pickerData = [
    {key: 0, label: '-- SELECT --', value: 'select'},
    {key: 1, label: 'Save', value: 'save'},
    {key: 2, label: 'Food', value: 'food'},
    {key: 3, label: 'Home', value: 'home'},
    {key: 4, label: 'Various Expenses', value: 'various'},
    {key: 5, label: 'Hobbies', value: 'hobbies'},
    {key: 6, label: 'Health', value: 'health'},
    {key: 7, label: 'Subscriptions', value: 'subscriptions'},
  ];

  return (
    <SafeAreaView style={s.container}>
      <View>
        <Pressable onPress={()=>setNewExpenseModal(false)} style={s.btnCancel}>
          <Text style={s.textBtnCancel}>Cancel</Text>
        </Pressable>
      </View>

      <View style={s.form}>
        <Text style={s.title}>New Expense</Text>

        <View style={s.field}>
          <Text style={s.label}>Expense Name</Text>
          <TextInput 
          value={expenseName} 
          placeholder="Name of the expense" 
          style={s.input}
          onChangeText={setExpenseName} />
        </View>

        <View style={s.field}>
          <Text style={s.label}>Expense Ammount</Text>
          <TextInput
            style={s.input}
            placeholder="Ammount of the expense"
            keyboardType="numeric"
            value={expenseAmmount}
            onChangeText={setExpenseAmmount}
          />
        </View>

        <View style={s.field}>
          <Text style={s.label}>Expense Category</Text>
          <ModalSelector
            style={s.input}
            onChange={(option) => {
                const keySelected = pickerData.filter(item => item.value === option.value)
                setExpenseCategory(option.value)
                setInitialPicker(keySelected[0].key)
              }}
            initValue="-- Select --"
            data={pickerData}
            selectedKey={initialPicker}
          />
        </View>

        <Pressable onPress={() => handleSpent({expenseName, expenseAmmount, expenseCategory})} style={s.submitBtn}>
          <Text style={s.textBtn}>Add Expense</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ExpenseForm;

const s = StyleSheet.create({
  container: {
    backgroundColor: '#1e40af',
    flex: 1,
  },
  btnCancel: {
    backgroundColor: "#db2777",
    padding: 10,
    marginTop: 30,
    marginHorizontal: 10
  },
  textBtnCancel: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  form: {
    ...globalStyles.container,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 30,
    color: '#64748b',
  },
  field: {
    marginVertical: 10,
  },
  label: {
    color: '#64748b',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  submitBtn: {
    marginTop: 30,
    backgroundColor: '#1048a4',
    padding: 10,
    borderRadius: 10,
  },
  textBtn: {
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
