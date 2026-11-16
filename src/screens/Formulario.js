import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Formulario({ navigation }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [erro, setErro] = useState('');

  async function salvar() {
    const numero = parseFloat(valor.replace(',', '.'));

    if (descricao.trim() === '' || isNaN(numero) || numero <= 0) {
      setErro('Preencha a descrição e um valor maior que zero.');
      return;
    }

    const dados = await AsyncStorage.getItem('gastos');
    const gastos = dados ? JSON.parse(dados) : [];
    gastos.push({ id: Date.now().toString(), descricao: descricao.trim(), valor: numero });
    await AsyncStorage.setItem('gastos', JSON.stringify(gastos));

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex: Almoço"
      />

      <Text>Valor</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        placeholder="Ex: 25.50"
        keyboardType="numeric"
      />

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      <TouchableOpacity style={styles.botao} onPress={salvar}>
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
  },
  erro: {
    color: 'red',
    marginBottom: 15,
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
