import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import globalStyles from '../styles';
import formatDate from '../helpers';

const Spent = ({spent, setNewExpenseModal, setSpentToEdit}) => {
  const {expenseName, expenseAmmount, expenseCategory, date} = spent;

  const imagesIcon = {
    save: require('../img/icono_ahorro.png'),
    food: require('../img/icono_comida.png'),
    home: require('../img/icono_casa.png'),
    various: require('../img/icono_gastos.png'),
    hobbies: require('../img/icono_ocio.png'),
    health: require('../img/icono_salud.png'),
    subscriptions: require('../img/icono_suscripciones.png'),
  };

  const handleEdit = () => {
    setNewExpenseModal(true);
    setSpentToEdit(spent)
  }

  return (
    <Pressable onLongPress={handleEdit}>
      <View style={s.container}>
        <View style={s.content}>

          <View style={s.containerImage}>
            <Image source={imagesIcon[expenseCategory]} style={s.imageIcon} />

            <View style={s.containerText}>
              <Text style={s.category}>{expenseCategory}</Text>
              <Text style={s.name}>{expenseName}</Text>
              <Text style={s.date}>{formatDate(date)}</Text>
            </View>

          </View>

          <Text style={s.ammount}>${expenseAmmount}.00</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Spent;

const s = StyleSheet.create({
  container: {
    ...globalStyles.container,
    marginBottom: 20,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerImage: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  imageIcon: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  containerText: {
    flex: 1,
  },
  category: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  name: {
    fontSize: 24,
    color: '#64748b',
    marginBottom: 5,
  },
  ammount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  date: {
    fontWeight: 'bold',
    color: '#db2777',
  },
});
