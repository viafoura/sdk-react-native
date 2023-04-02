import React from 'react';

import { Button, View, Text, TextInput } from 'react-native';

import { doLogin } from '../native/auth.js';

const LoginScreen = ({navigation, route}) => {

  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  return(
    <View>
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
        doLogin(email, password).then(value => {
          navigation.goBack();
        }).catch(error => {
            alert(error);
        })
      }}>
      </Button>

      <Text
      style={{padding: 12}}
      onPress={() => {
        navigation.navigate('SignUp')
      }}>
      Create an account
      </Text>
    </View>
  );
};
export default LoginScreen;
