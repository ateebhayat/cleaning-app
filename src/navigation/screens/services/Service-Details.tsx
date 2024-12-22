import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import { useForm, Controller } from 'react-hook-form'; // React Hook Form
import { getServiceDetails, updateService } from '../../../api/api-caller'; // API call functions

// Skeleton Component
const Skeleton = () => (
  <View style={styles.skeletonContainer}>
    <View style={styles.skeletonField} />
    <View style={styles.skeletonField} />
    <View style={styles.skeletonField} />
    <View style={styles.skeletonField} />
  </View>
);

export function Details({ route, navigation }) {
  const { id, isUpdate } = route.params; // Receive ID and isUpdate from navigation params
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { control, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await getServiceDetails(id); // Replace with actual API call
        setData(response.data);

        // Set default values in form fields on successful fetch
        reset({
          // Use reset() instead of setValue to update all form values
          service_name: response.data.service_name,
          service_type: response.data.service_type,
          duration: response.data.duration,
          price: response.data.price,
        });
      } catch (error) {
        console.error('Error fetching service details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]); // Use `reset` here to avoid resetting every time `id` changes

  const onSubmit = async (formData) => {
    try {
      if (isUpdate) {
        // Perform the update API request here
        const updatedData = await updateService(formData, id);
        navigation.goBack(); // Optionally navigate after update
      } else {
        console.log('Service data is not being updated');
      }
    } catch (error) {
      console.error('Error updating service details:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Service Details</Text>
        <Skeleton />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Service Details</Text>
      {data ? (
        <View style={styles.form}>
          <Controller
            control={control}
            name='service_name'
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChange={onChange}
                placeholder='Service Name'
                editable={isUpdate} // Editable based on isUpdate param
                placeholderTextColor='#000'
              />
            )}
          />
          <Controller
            control={control}
            name='service_type'
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChange={onChange}
                placeholder='Service Type'
                editable={isUpdate} // Editable based on isUpdate param
                placeholderTextColor='#000'
              />
            )}
          />
          <Controller
            control={control}
            name='duration'
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChange={onChange}
                placeholder='Duration'
                editable={isUpdate} // Editable based on isUpdate param
                placeholderTextColor='#000'
              />
            )}
          />
          <Controller
            control={control}
            name='price'
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChange={onChange}
                placeholder='Price'
                editable={isUpdate} // Editable based on isUpdate param
                placeholderTextColor='#000'
              />
            )}
          />
          {isUpdate ? (
            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleSubmit(onSubmit)}>
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.goBackButton}
              onPress={() => navigation.goBack()}>
              <Ionicons name='arrow-back' size={20} color='#fff' />
              <Text style={styles.goBackButtonText}>Go Back</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <Text style={styles.errorText}>Unable to load service details.</Text>
      )}
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
  skeletonContainer: {
    gap: 15,
  },
  skeletonField: {
    width: '100%',
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10,
  },
  form: {
    gap: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#555',
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
  updateButton: {
    backgroundColor: '#4CAF50', // Green for update button
    borderRadius: 8,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  errorText: {
    fontSize: 16,
    color: '#ff4d4d',
    textAlign: 'center',
    marginTop: 20,
  },
});
