import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ToastAndroid,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { save } from '../../../hooks/use-token';
import { login } from '../../../api/api-caller';
import { useNavigation } from '@react-navigation/native';

export function LoginScreen() {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: { email: string; password: string }) => {
    Keyboard.dismiss();
    try {
      const res = await login({ email: data.email, password: data.password });
      const token = res.data.token;
      if (token) {
        await save('session', token);
        navigation.navigate('Home');
      }
    } catch (error) {
      ToastAndroid.show('Invalid credentials', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name='email'
        rules={{
          required: 'Email is required',
          pattern: /^[^@]+@[^@]+\.[^@]+$/,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder='Email'
            value={value}
            onChangeText={onChange}
            placeholderTextColor='#000'
          />
        )}
      />
      {errors.email && (
        <Text style={styles.error}>{errors?.email.message}</Text>
      )}

      <Controller
        control={control}
        name='password'
        rules={{ required: 'Password is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder='Password'
            placeholderTextColor='#000'
            value={value}
            onChangeText={onChange}
            secureTextEntry
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.touchableButton}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableButton}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderRadius: 8,
    borderWidth: 1.5,
    marginBottom: 12,
    paddingHorizontal: 8,
    marginVertical: 16,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    columnGap: 10,
  },
  touchableButton: {
    width: '50%',
    padding: 12,
    backgroundColor: 'black',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
});
