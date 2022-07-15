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
import { categoryToKey } from '../helpers';
import {Picker} from '@react-native-picker/picker';

const ExpenseForm = ({setNewExpenseModal,handleDelete, handleSpent, setSpentToEdit,spentToEdit}) => {

  const [expenseName, setExpenseName] = useState("");
  const [expenseAmmount, setExpenseAmmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [initialPicker, setInitialPicker] = useState(0);
  const [id, setId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if(spentToEdit?.expenseName) {
      setExpenseAmmount(spentToEdit.expenseAmmount)
      setExpenseCategory(spentToEdit.expenseCategory)
      setExpenseName(spentToEdit.expenseName)
      setId(spentToEdit.id)
      setDate(spentToEdit.date)
      setInitialPicker(categoryToKey(spentToEdit.expenseCategory, pickerData)[0].key) 
    }
  }, [spentToEdit]);

  const pickerData = [
    {key: 0, label: '-- SELECT --', value: 'select'},
    {key: 1, label: '💰 Saving', value: 'save'},
    {key: 2, label: '🍕 Food', value: 'food'},
    {key: 3, label: '🏠 Home', value: 'home'},
    {key: 4, label: '💸 Various Expenses', value: 'various'},
    {key: 5, label: '🧰 Hobbies', value: 'hobbies'},
    {key: 6, label: '💊 Health', value: 'health'},
    {key: 7, label: '💻 Subscriptions', value: 'subscriptions'},
  ];

  

  return (
    <SafeAreaView style={s.container}>
      <View style={s.btnContainer}>
        <Pressable onPress={()=> {
          setNewExpenseModal(false)
          setSpentToEdit({})
        }} 
        style={[s.btnCancel, s.btn]}>
          <Text style={s.textBtnCancel}>Cancel</Text>
        </Pressable>

        {!!id && (
          <Pressable onPress={()=>handleDelete(id)} 
          style={[s.btnEdit, s.btn]}>
            <Text style={s.textBtnCancel}>Delete</Text>
          </Pressable>
        )}
      </View>

      <View style={s.form}>
        <Text style={s.title}>{spentToEdit?.expenseName ? "Editing Expense":"New Expense"}</Text>

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
                setExpenseCategory(option.value)
                setInitialPicker(option.key)
              }}
            data={pickerData}
            selectedKey={initialPicker}
          />
        </View>

        <Pressable onPress={() => handleSpent({expenseName, expenseAmmount, expenseCategory, id, date})} style={s.submitBtn}>
          <Text style={s.textBtn}> {spentToEdit?.expenseName ? "Edit Expense":"Add Expense"}</Text>
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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
  btn: {
    padding: 10,
    marginTop: 30,
    marginHorizontal: 10,
    width: "40%",
    flex: 1
  },
  btnEdit: {
    backgroundColor: "red",
  },
  btnCancel: {
    backgroundColor: "#db2777",
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
