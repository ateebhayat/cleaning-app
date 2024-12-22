import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ToastAndroid,
  Keyboard,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { signup } from '../../../api/api-caller';
import { useNavigation } from '@react-navigation/native';

export const Register = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const { email, password, confirmPassword } = data;
    Keyboard.dismiss();
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      await signup({ email: email, password: password });
      ToastAndroid.show('User signed up successfully !', ToastAndroid.SHORT);
      navigation.navigate('Login');
    } catch (error) {
      ToastAndroid.show('User already exist', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* Email Field */}
      <Controller
        name='email'
        control={control}
        defaultValue=''
        rules={{
          required: 'Email is required',
          pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder='Email'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType='email-address'
            autoCapitalize='none'
            placeholderTextColor='#000'
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* Password Field */}
      <Controller
        name='password'
        control={control}
        defaultValue=''
        placeholderTextColor='#000'
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder='Password'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            placeholderTextColor='#000'
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      {/* Confirm Password Field */}
      <Controller
        name='confirmPassword'
        control={control}
        defaultValue=''
        rules={{
          required: 'Confirm Password is required',
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder='Confirm Password'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            placeholderTextColor='#000'
          />
        )}
      />
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword.message}</Text>
      )}

      {/* Submit Button */}
      <View style={styles.button}>
        <Button title='Sign Up' onPress={handleSubmit(onSubmit)} color='#000' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 8,
    borderWidth: 1.5,
    marginBottom: 12,
    paddingHorizontal: 8,
    marginVertical: 16,
    color: 'black',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  button: {
    padding: 6,
    backgroundColor: 'black',
    borderRadius: 8,
  },
});
