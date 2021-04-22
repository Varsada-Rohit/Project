import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Alert,
  Text,
  Modal,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {TouchableWithoutFeedback} from 'react-native';

import Colors from '../Config/Colors';
import AppButton from './AppButton';
import Icon from './Icon';

function ImageInput({src, onChangeImage}) {
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const requestStoragePermission = async () => {
    let grant = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storgae permission required',
        message: 'Storage is required to upload picture',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if ((grant = 'granted')) {
      pickImageFromGallery();
    }
  };

  const requestCameraPermission = async () => {
    let grant = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera permission required',
        message: 'Camera is required to capture picture',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if ((grant = 'granted')) {
      pickImageFromCamera();
    }
  };

  const pickImageFromGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, (Response) => {
      if (Response.didCancel) {
      } else if (Response.error) {
        console.log(Response.error);
      } else {
        onChangeImage(Response.uri);
      }
    });
  };

  const pickImageFromCamera = () => {
    launchCamera({mediaType: 'photo'}, (Response) => {
      if (Response.didCancel) {
      } else if (Response.error) {
        console.log(Response.error);
      } else {
        onChangeImage(Response.uri);
      }
    });
  };

  const handlePress = () => {
    if (!src) {
      setShowModal(true);
    } else {
      setShowImageModal(true);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={handlePress} on>
        <View style={styles.container}>
          {!src && (
            <MaterialCommunityIcons
              style={styles.icon}
              name={'camera-plus'}
              size={30}
            />
          )}
          {src && (
            <Image style={styles.image} source={{uri: src}} width={100} />
          )}
        </View>
      </TouchableWithoutFeedback>

      <Modal transparent visible={showModal} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={styles.model}></View>
        </TouchableWithoutFeedback>
        <View style={styles.modalMenu}>
          <AppButton
            title="Camera"
            style={styles.button}
            onPress={() => {
              setShowModal(false);
              requestCameraPermission();
            }}
          />
          <AppButton
            title="Gallery"
            style={styles.button}
            onPress={() => {
              setShowModal(false);
              requestStoragePermission();
            }}
          />
        </View>
      </Modal>
      <Modal animationType="slide" visible={showImageModal}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="delete"
            style={{margin: 15}}
            onPress={() => {
              Alert.alert('Delete', 'you want to delete this image', [
                {text: 'Yes', onPress: () => onChangeImage(src)},
                {text: 'No'},
              ]);
            }}
          />
          <View
            style={{
              alignItems: 'flex-end',
              flex: 1,
            }}>
            <Icon
              name="close"
              style={{margin: 15}}
              onPress={() => setShowImageModal(false)}
            />
          </View>
        </View>
        <Image
          source={{uri: src}}
          // width={100}
          height={100}
          resizeMode={'contain'}
          style={{width: '90%', height: '80%', marginLeft: '5%'}}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 30,

    alignItems: 'flex-start',
    backgroundColor: Colors.white,
  },
  icon: {
    color: '#627ca8',
  },
  container: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: Colors.lightSecondary,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.grey,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  model: {
    flex: 1,
    backgroundColor: Colors.black,
    opacity: 0.2,
    justifyContent: 'center',

    justifyContent: 'center',
    alignItems: 'center',
  },
  modalMenu: {
    width: '100%',
    padding: 15,
    backgroundColor: Colors.white,
  },
});

export default ImageInput;
