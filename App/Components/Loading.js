import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Colors from '../Config/Colors';

function Loading({visible, color, size}) {
  if (!visible) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={visible}
        color={color ? color : '#627ca8'}
        size={size ? size : 80}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    opacity: 0.8,
    justifyContent: 'center',
    backgroundColor: Colors.white,
    zIndex: 1,
  },
});

export default Loading;
