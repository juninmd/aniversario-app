import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Styles {
  container: {
    flex: number;
    backgroundColor: string;
    alignItems: string;
    justifyContent: string;
  };
}

const App: React.FC = () => (
  <View style={styles.container}>
    <Text>Open up App.tsx to start working on your app!</Text>
    <Text>Changes you make will automatically reload.</Text>
    <Text>Shake your phone to open the developer menu.</Text>
  </View>
);

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
