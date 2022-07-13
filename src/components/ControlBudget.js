import {View, Text, Image, StyleSheet} from 'react-native';
import React, { useEffect, useState } from 'react';
import globalStyles from '../styles';
import CircularProgress from 'react-native-circular-progress-indicator';

const ControlBudget = ({budget, spents}) => {

  const [available, setAvailable] = useState(0);
  const [spent, setSpent] = useState(0)
  const [percSpent, setPercSpent] = useState(0);
  
  

  useEffect( () => {
    //with this we sum al the ammounts from the spents
    const spentTotal = spents.reduce( (total, spent) => Number(spent.expenseAmmount) + total, 0);
    
    const availableTotal = (budget - spentTotal)

    //with this calc we get the percentage of money spent
    const perc = (((budget - availableTotal) / budget) * 100);
    setTimeout(() => { //this is to delay 1 sec before the animation
      setPercSpent(perc)
    }, 500);
    

    setSpent(spentTotal)
    setAvailable(availableTotal);
  }, [spents])

  return (
    <View style={s.container}>
      <View style={s.centerImage}>
        <CircularProgress 
          value={percSpent}
          duration={1000}
          radius={130}
          valueSuffix={"%"}
          title={"Spent"}
          titleStyle={{fontWeight: "bold", fontSize: 22}}
          titleColor="#64748b"
          inActiveStrokeColor={"#f2f2f2"}
          inActiveStrokeWidth={20}
          activeStrokeColor="#3b82f6"
          activeStrokeWidth={20}
        />
      </View>

      <View style={s.textContainer}>
        <Text style={s.value}>
          <Text style={s.label}>Budget: </Text>
          ${budget}
        </Text>

        <Text style={s.value}>
        <Text style={s.label}>Available: </Text>
          ${available}
        </Text>

        <Text style={s.value}>
          <Text style={s.label}>Spent: </Text>
          ${spent}
        </Text>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  centerImage: {
    alignItems: "center"
  },
  image: {
    width: 250,
    height: 250
  },
  textContainer: {
    marginTop: 50
  },
  value: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
    color: "black"
  },
  label: {
    fontWeight: "700",
    color: "#3b82f6"
  }
});

export default ControlBudget;
