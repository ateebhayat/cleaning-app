import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import { createService } from '../../../api/api-caller'; // API call function

export function CreateService({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);

  // Function for submitting the form
  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const response = await createService(formData); // API call to create service
      navigation.goBack();
      reset();
    } catch (error) {
      console.error('Error creating service:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Service</Text>

      {/* Service Name */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder='Service Name'
            placeholderTextColor='#000'
          />
        )}
        name='service_name'
        rules={{ required: 'Service name is required' }}
        defaultValue=''
      />
      {errors.service_name && (
        <Text style={styles.errorText}>{errors.service_name.message}</Text>
      )}

      {/* Service Type */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder='Service Type'
            placeholderTextColor='#000'
          />
        )}
        name='service_type'
        rules={{ required: 'Service type is required' }}
        defaultValue=''
      />
      {errors.service_type && (
        <Text style={styles.errorText}>{errors.service_type.message}</Text>
      )}

      {/* Duration */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder='Duration'
            placeholderTextColor='#000'
          />
        )}
        name='duration'
        rules={{ required: 'Duration is required' }}
        defaultValue=''
      />
      {errors.duration && (
        <Text style={styles.errorText}>{errors.duration.message}</Text>
      )}

      {/* Price */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder='Price'
            placeholderTextColor='#000'
          />
        )}
        name='price'
        rules={{ required: 'Price is required' }}
        defaultValue=''
      />
      {errors.price && (
        <Text style={styles.errorText}>{errors.price.message}</Text>
      )}

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}>
        {loading ? (
          <Text style={styles.submitButtonText}>Submitting...</Text>
        ) : (
          <Text style={styles.submitButtonText}>Create Service</Text>
        )}
      </TouchableOpacity>

      {/* Go Back Button */}
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name='arrow-back' size={20} color='#fff' />
        <Text style={styles.goBackButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 14,
    color: '#ff4d4d',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 15,
    justifyContent: 'center',
    marginTop: 20,
  },
  goBackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
  },
});
