import React from 'react';
import { StyleSheet, Button, View, TextInput } from 'react-native';
import { doPasswordReset } from '../../native/auth';
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

const ForgotPasswordScreen = () => {
  const [email, onChangeEmail] = React.useState('');
  const navigation = useNavigation();

  return (
    <View>
      <TextInput
        placeholder="E-mail"
        onChangeText={onChangeEmail}
        style={styles.textInput}
        value={email}
        placeholderTextColor="#000"
        textAlign="center"
      />
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Forgot password"
          onPress={() => {
            doPasswordReset(email)
              .then(() => {
                navigation.goBack();
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        />
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
