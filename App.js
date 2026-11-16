import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Lista from './src/screens/Lista';
import Formulario from './src/screens/Formulario';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Lista" component={Lista} options={{ title: 'Meus Gastos' }} />
        <Stack.Screen name="Formulario" component={Formulario} options={{ title: 'Novo Gasto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
