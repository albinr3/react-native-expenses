import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import globalStyles from '../styles';
import ModalSelector from 'react-native-modal-selector';
import { categoryToKey } from '../helpers';

const Filter = ({setFilter, filter, setfilterSpents, spents}) => {

  useEffect(() => {
    if(filter === "select"){
      setfilterSpents([])
    } else {
      const filterOfSpents = spents.filter(spentState => spentState.expenseCategory === filter)
      setfilterSpents(filterOfSpents)
    }
  }, [filter]);

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
    <View style={s.container}>
      <Text style={s.label}>Filter</Text>
      <View style={s.modalContainer}>
        <ModalSelector
          onChange={option => {
            setFilter(option.value);
          }}
          data={pickerData}
          selectedKey={categoryToKey(filter, pickerData)[0].key}
          childrenContainerStyle={{backgroundColor: "white", borderBottomWidth:2,borderRadius: 10}}
          selectStyle={{borderRadius: 10, }}
          selectTextStyle={{fontSize: 20, fontWeight: "600"}}
        />
      </View>
    </View>
  );
};

export default Filter;

const s = StyleSheet.create({
  container: {
    ...globalStyles.container,
    transform: [{translateY: 0}],
    marginTop: 60,
    
    
  },
  label: {
    color: '#64748b',
    fontWeight: '900',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 5,
    
  },
  
});
