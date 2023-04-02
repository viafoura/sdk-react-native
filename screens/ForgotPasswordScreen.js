import React from 'react';

import { Button, View, Text, TextInput } from 'react-native';

import { doPasswordReset } from '../native/auth.js';

const ForgotPasswordScreen = ({navigation, route}) => {

  const [email, onChangeEmail] = React.useState('');

  return(
    <View>
      <TextInput
        placeholder="E-mail"
        onChangeText={onChangeEmail}
        value={email}
        textAlign="center"/>
      <Button
      style={{padding: 12}}
      title="test"
      onPress={() => {
        doPasswordReset(email).then(value => {
          navigation.goBack();
        }).catch(error => {
            alert(error);
        })
      }}>
      </Button>
    </View>
  );
};
export default ForgotPasswordScreen;
