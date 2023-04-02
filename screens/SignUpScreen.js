import React from 'react';

import { Button, View, Text, TextInput } from 'react-native';

import { doSignup } from '../native/auth.js';

const SignUpScreen = ({navigation, route}) => {

  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [name, onChangeName] = React.useState('');

  return(
    <View>
    <TextInput
      placeholder="Name"
      onChangeText={onChangeName}
      value={name}
      textAlign="center"/>
      <TextInput
        placeholder="E-mail"
        onChangeText={onChangeEmail}
        value={email}
        textAlign="center"/>
      <TextInput
        placeholder="Password"
        onChangeText={onChangePassword}
        value={password}
        textAlign="center" />
      <Button
      style={{padding: 12}}
      title="test"
      onPress={() => {
        doSignup(name, email, password).then(value => {
          navigation.goBack();
          navigation.goBack();
        }).catch(error => {
            alert(error);
        })
      }}>
      </Button>
    </View>
  );
};
export default SignUpScreen;
