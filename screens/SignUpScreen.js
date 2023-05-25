import React from 'react';

import { StyleSheet, Button, View, Text, TextInput } from 'react-native';

import { doSignup } from '../native/auth.js';

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
    backgroundColor: '#000000',
    color: '#FFF',
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3
  },
  textInput: {
    fontSize: 16,
    borderColor: 'red',
    borderWidth: 2,
    height: 50,
    borderRadius: 15,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  bottomText: {
    marginTop: 20,
    textAlign: 'center'
  }
});

const SignUpScreen = ({ navigation, route }) => {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [name, onChangeName] = React.useState("");

  return (
    <View>
      <TextInput
        placeholder="Name"
        style={styles.textInput}
        placeholderTextColor="#000"
        onChangeText={onChangeName}
        value={name}
        textAlign="center"
      />
      <TextInput
        placeholder="E-mail"
        style={styles.textInput}
        onChangeText={onChangeEmail}
        placeholderTextColor="#000"
        value={email}
        textAlign="center"
      />
      <TextInput
        placeholder="Password"
        style={styles.textInput}
        onChangeText={onChangePassword}
        placeholderTextColor="#000"
        value={password}
        textAlign="center"
      />
      <View style={styles.buttonContainer}>
        <Button
          style={{ padding: 12 }}
          title="Sign up"
          onPress={() => {
            doSignup(name, email, password)
              .then((value) => {
                navigation.goBack();
                navigation.goBack();
              })
              .catch((error) => {
                alert(error);
              });
          }}
        ></Button>
      </View>
    </View>
  );
};

export default SignUpScreen;
