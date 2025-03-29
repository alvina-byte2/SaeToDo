import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './screens/List';
import PrayerTimes from './screens/PrayerTimes';

// Define the navigation types
type RootStackParamList = {
  List: undefined;
  PrayerTimes: undefined;
};

// Create Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={List} options={{ title: 'SaAe' }} />
        <Stack.Screen name="PrayerTimes" component={PrayerTimes} options={{ title: 'Prayer Times' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
