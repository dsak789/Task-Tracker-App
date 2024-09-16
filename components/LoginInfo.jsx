import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginInfo = async () => {
  try {
    const data = await AsyncStorage.getItem('loginInfo');
    if (data !== null) {
      const info = JSON.parse(data);
      console.log('Hello Info:', info);
      return info;
    } else {
      console.log('No login info found');
      return null;  // Or return an empty object if that fits your use case better
    }
  } catch (error) {
    console.error('Error retrieving login info from AsyncStorage:', error);
    return null;
  }
};
