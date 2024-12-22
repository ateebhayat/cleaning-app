import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Using Ionicons for modern icons
import { deleteService, getServices } from '../../../api/api-caller'; // Update with your actual API path
import { useNavigation } from '@react-navigation/native';

// Skeleton Component
const Skeleton = () => (
  <View style={styles.card}>
    <View style={styles.skeletonTitle} />
    <View style={styles.skeletonText} />
    <View style={styles.skeletonText} />
    <View style={styles.skeletonButton} />
  </View>
);

export function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Function to fetch services
  const fetchData = async () => {
    try {
      setLoading(true);
      const services = await getServices();
      console.log('Fetched data:', services);
      setData(services.data ?? []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    // Show the confirmation dialog
    Alert.alert(
      'Delete Service',
      'Are you sure you want to delete this service?',
      [
        {
          text: 'Cancel',
          style: 'cancel', // Do nothing if "Cancel" is pressed
        },
        {
          text: 'Yes',
          onPress: () => {
            // Filter out the service from the array when "Yes" is pressed
            deleteService(id);
            setData((prevData) => prevData.filter((item) => item._id !== id));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.service_name}</Text>
        <TouchableOpacity onPress={() => handleDelete(item._id)}>
          <Ionicons name='trash-outline' size={24} color='#ff4d4d' />
        </TouchableOpacity>
      </View>
      <Text style={styles.cardText}>Service Type: {item.service_type}</Text>
      <Text style={styles.cardText}>Duration: {item.duration}</Text>
      <Text style={styles.cardText}>Price: {item.price}</Text>
      <Text style={styles.cardText}>
        Created At: {new Date(item.createdAt).toLocaleString()}
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={() =>
            navigation.navigate('Details', { id: item._id, isUpdate: false })
          }>
          <Ionicons name='eye-outline' size={20} color='#fff' />
          <Text style={styles.cardButtonText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={() =>
            navigation.navigate('Details', { id: item._id, isUpdate: true })
          }>
          <Ionicons name='create-outline' size={20} color='#fff' />
          <Text style={styles.cardButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Services</Text>

        {/* Refresh button */}
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={fetchData} // Call fetchData when the button is pressed
        >
          <Ionicons name='refresh-outline' size={24} color='#000' />
        </TouchableOpacity>
      </View>

      {loading ? (
        // Show skeleton loader
        <FlatList
          data={[...Array(5).keys()]}
          renderItem={() => <Skeleton />}
          keyExtractor={(item) => String(item)}
          contentContainerStyle={styles.list}
        />
      ) : data.length > 0 ? (
        // Show cards
        <FlatList
          data={data}
          renderItem={renderCard}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.emptyText}>
          No items available. Add some items!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', // Center items horizontally
    alignItems: 'center',
  },
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
  list: {
    gap: 15,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align buttons side by side
    marginTop: 10,
  },
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5, // Add space between icon and text
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    marginTop: 30,
  },
  skeletonTitle: {
    width: '60%',
    height: 20,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  skeletonText: {
    width: '80%',
    height: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10,
  },
  skeletonButton: {
    width: '40%',
    height: 15,
    backgroundColor: '#d6d6d6',
    borderRadius: 5,
    marginTop: 10,
  },
  refreshButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
});
