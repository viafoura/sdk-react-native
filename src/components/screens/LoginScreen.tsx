import React from 'react';
import { StyleSheet, Button, View, Text, TextInput } from 'react-native';
import { doLogin } from '../../native/auth';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: 'red',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    color: '#FFF',
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  textInput: {
    fontSize: 16,
    borderColor: 'red',
    borderWidth: 2,
    height: 50,
    borderRadius: 15,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  bottomText: {
    marginTop: 20,
    textAlign: 'center',
  },
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  return (
    <View>
      <TextInput
        placeholder="E-mail"
        onChangeText={onChangeEmail}
        style={styles.textInput}
        placeholderTextColor="#000"
        value={email}
        textAlign="center"
      />
      <TextInput
        placeholder="Password"
        onChangeText={onChangePassword}
        placeholderTextColor="#000"
        style={styles.textInput}
        value={password}
        textAlign="center"
      />
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Log-in"
          onPress={async () => {
            doLogin(email, password)
              .then((value) => {
                navigation.goBack();
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        />
      </View>

      <Text
        style={styles.bottomText}
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      >
        Create an account
      </Text>
      <Text
        style={styles.bottomText}
        onPress={() => {
          navigation.navigate('ForgotPassword');
        }}
      >
        Forgot my password
      </Text>
    </View>
  );
};

export default LoginScreen;
