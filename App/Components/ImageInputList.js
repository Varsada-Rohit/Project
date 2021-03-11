import React, {useRef} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import ImageInput from './ImageInput';

function ImageInputList({uris, onAddImage, onRemoveImage}) {
  const scrollView = useRef();
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}>
        {uris.map(uri => {
          return (
            <ImageInput
              src={uri}
              key={uri}
              onChangeImage={uri => onRemoveImage(uri)}
            />
          );
        })}
        <ImageInput onChangeImage={uri => onAddImage(uri)} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ImageInputList;
