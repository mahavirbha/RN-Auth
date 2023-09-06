import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../store/auth-context';

function WelcomeScreen() {
  const [fetchedMsg, setFetchedMsg] = useState('');

  const AuthCtx = useContext(AuthContext);
  const token = AuthCtx.token;

  useEffect(() => {
    axios
      .get(
        `https://rn-backend-fa2fb-default-rtdb.firebaseio.com/message.json?auth=${token}`
      )
      .then((res) => {
        setFetchedMsg(res.data);
      })
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMsg}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
