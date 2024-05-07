import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (itemKey: string, value: any) => {
  try {
    if (typeof value === 'string') {
      await AsyncStorage.setItem(itemKey, value);
    } else {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(itemKey, jsonValue);
    }
  } catch (e) {}
};

export const getData = async (itemKey: string, isObject?: boolean) => {
  try {
    if (isObject) {
      const jsonValue = await AsyncStorage.getItem(itemKey);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } else {
      const value = await AsyncStorage.getItem(itemKey);
      return value;
    }
  } catch (e) {}
};
