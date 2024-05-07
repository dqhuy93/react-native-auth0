import { View, ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import React from 'react';

export default function Loading(props: ActivityIndicatorProps) {
  return (
    <View testID="loading" className="flex-1 flex justify-center items-center">
      <ActivityIndicator {...props} />
    </View>
  );
}
