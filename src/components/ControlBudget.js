import {View, Text, Image, StyleSheet} from 'react-native';
import React, { useEffect, useState } from 'react';
import globalStyles from '../styles';

const ControlBudget = ({budget, spents}) => {

  const [available, setAvailable] = useState(0);
  const [spent, setSpent] = useState(0)

  useEffect( () => {
    //with this we sum al the ammounts from the spents
    const spentTotal = spents.reduce( (total, spent) => Number(spent.expenseAmmount) + total, 0);
    setSpent(spentTotal)

    setAvailable(budget - spentTotal);
  }, [spents])

  return (
    <View style={s.container}>
      <View style={s.centerImage}>
        <Image style={s.image} source={require('../img/grafico.jpg')} />
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
