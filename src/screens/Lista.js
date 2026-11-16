import { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Lista({ navigation }) {
  const [gastos, setGastos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('gastos').then((dados) => {
        if (dados) setGastos(JSON.parse(dados));
      });
    }, [])
  );

  async function excluir(id) {
    const novaLista = gastos.filter((item) => item.id !== id);
    setGastos(novaLista);
    await AsyncStorage.setItem('gastos', JSON.stringify(novaLista));
  }

  const total = gastos.reduce((soma, item) => soma + item.valor, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      <FlatList
        data={gastos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum gasto cadastrado</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.info}>
              <Text style={styles.descricao}>{item.descricao}</Text>
              <Text>R$ {item.valor.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.excluir} onPress={() => excluir(item.id)}>
              <Text style={styles.textoBotao}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Formulario')}>
        <Text style={styles.textoBotao}>Adicionar gasto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  total: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  vazio: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  info: {
    flex: 1,
  },
  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  excluir: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 6,
  },
  botao: {
    backgroundColor: 'blue',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
});
