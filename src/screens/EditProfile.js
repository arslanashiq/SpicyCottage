import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import MyTextInput from '../components/MyTextInput';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import ImagePicker from 'react-native-image-crop-picker';
import {font} from '../constants/font';
import MyTouchableOpacity from '../components/MyTouchableOpacity';

const EditProfile = props => {
  const [state, setstate] = useState({
    isPictureUploadModalVisible: false,
    userImageProfile: '',
    imageFileProfile: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Bio: '',
  });
  const {
    isPictureUploadModalVisible,
    userImageProfile,
    imageFileProfile,
    FirstName,
    LastName,
    Email,
    Bio,
  } = state;

  const updateState = data => setstate(state => ({...state, ...data}));

  galleryActionProfile = () => {
    updateState({isPictureUploadModalVisible: !isPictureUploadModalVisible});

    setTimeout(() => {
      chooseFromPhotoesProfile();
    }, 400);
  };
  cameraActionProfile = () => {
    updateState({
      isPictureUploadModalVisible: !state.isPictureUploadModalVisible,
    });

    setTimeout(() => {
      captureImageProfile();
    }, 400);
  };

  captureImageProfile = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      width: 300,
      height: 400,
      cropping: true,
      // compressImageQuality: 0.7,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'silver',
    }).then(image => {
      updateState({
        userImageProfile: image.path,
        imageFileProfile: image,
      });
      let imagepath =
        Platform.OS === 'ios' ? `file:///${image.path}` : image.path;
      let imagename =
        Platform.OS === 'ios' ? image.filename : `dlximagefromAndroid.JPG`;
      // this.Uploadimage(imagepath, image.mime, imagename);
    });
  };
  chooseFromPhotoesProfile = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      width: 300,
      height: 400,
      cropping: true,
      // compressImageQuality: 0.7,
    }).then(image => {
      updateState({
        userImageProfile: image.path,
        imageFileProfile: image,
      });
      let imagepath =
        Platform.OS === 'ios' ? `file:///${image.path}` : image.path;
      let imagename =
        Platform.OS === 'ios' ? image.filename : `dlximagefromAndroid.JPG`;
      console.log(imagepath);
      console.log(image.mime);
      console.log(imagename);
      //  Uploadimage(imagepath, image.mime, imagename);
    });
  };

  toggleDatePickerModal = show => {
    updateState({showDate: true});
  };

  togglePictureUploadModal = show => {
    updateState({isPictureUploadModalVisible: show});
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Modal
        useNativeDriver
        propagateSwipe
        onBackButtonPress={() => togglePictureUploadModal(false)}
        onBackdropPress={() => togglePictureUploadModal(false)}
        isVisible={state.isPictureUploadModalVisible}
        animationIn={'slideInUp'}
        style={styles.bottomModal}>
        <Toast />
        <View style={styles.scrollableModal}>
          <View style={styles.scrollableModalContent1}>
            <View
              style={{
                marginBottom: 0,
                padding: 20,
                backgroundColor: '#rgba(166,166,166,0.4)',
              }}>
              <ScrollView
                ref={ref => (scrollViewRef = ref)}
                onScroll={this.handleOnScroll}
                scrollEventThrottle={16}>
                <View style={styles.btnParentSection}>
                  <TouchableOpacity
                    onPress={() => galleryActionProfile()}
                    style={styles.btnSection}>
                    <Text style={styles.btnText}>Image Gallery</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => cameraActionProfile()}
                    style={styles.btnSection}>
                    <Text style={styles.btnText}>Camera</Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 20}}>
                  <TouchableOpacity
                    onPress={() =>
                      updateState({isPictureUploadModalVisible: false})
                    }
                    style={styles.btnSection}>
                    <Text style={[styles.btnText, {color: 'red'}]}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView>
        <View
          style={{
            marginHorizontal: moderateScale(20),
            marginVertical: moderateVerticalScale(30),
            flex: 1,
          }}>
          <View>
            <Text
              style={{
                marginTop: moderateVerticalScale(20),
                fontSize: scale(font.heading_font),
                fontWeight: '700',
                color: 'black',
              }}>
              Edit Your Account
            </Text>
          </View>
          <View style={{marginTop: moderateVerticalScale(10)}}>
            <Text
              style={{
                fontSize: scale(font.text_font),
                color: 'grey',
                fontWeight: '400',
              }}>
              Please Provide Valid information to avoid any inconvinence
            </Text>
          </View>
        </View>

        <View
          style={{
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: moderateVerticalScale(150),
              width: moderateScale(150),
              borderRadius: scale(100),
              borderWidth: 1,
              borderColor: 'black',
            }}
            onPress={() => togglePictureUploadModal(true)}>
            <View>
              <Image
                style={{
                  height: moderateVerticalScale(148),
                  width: moderateScale(148),
                  borderRadius: scale(100),
                }}
                source={{
                  uri: 'https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png',
                  // uri:'https://upload.wikimedia.org/wikipedia/commons/3/32/Passport_Size_Image_of_Nouman.jpg',
                  // uri:'file:///storage/emulated/0/Android/data/com.spicycottage.arslan/files/Pictures/634c0634-4e64-4b52-a7ac-7d7cce730088.jpg'
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingVertical: moderateVerticalScale(10),
            paddingHorizontal: moderateScale(20),
          }}>
          <MyTextInput
            mylabel="First Name"
            placeholder="First Name"
            autoFocus={false}
            backgroundColor="#eeee"
            color="black"
            placeholderTextColor="silver"
            myonchangetext={e => updateState({FirstName: e})}
          />
        </View>
        <View
          style={{
            paddingVertical: moderateVerticalScale(10),
            paddingHorizontal: moderateScale(20),
          }}>
          <MyTextInput
            mylabel="Last Name"
            placeholder="Last Name"
            autoFocus={false}
            backgroundColor="#eeee"
            color="black"
            placeholderTextColor="silver"
            myonchangetext={e => updateState({LastName: e})}
          />
        </View>
        <View
          style={{
            paddingVertical: moderateVerticalScale(10),
            paddingHorizontal: moderateScale(20),
          }}>
          <MyTextInput
            mylabel="Email"
            placeholder="example@gmail.com"
            autoFocus={false}
            backgroundColor="#eeee"
            color="black"
            placeholderTextColor="silver"
            myonchangetext={e => updateState({Email: e})}
          />
        </View>
        <View
          style={{
            paddingVertical: moderateVerticalScale(10),
            paddingHorizontal: moderateScale(20),
          }}>
          <MyTextInput
            mylabel="Bio"
            placeholder="Edit Bio"
            autoFocus={false}
            backgroundColor="#eeee"
            color="black"
            placeholderTextColor="silver"
            myonchangetext={e => updateState({Bio: e})}
            multiline={true}
            numberOfLines={4}
          />
        </View>
        <MyTouchableOpacity
          myText="Update"
          mycss={{borderRadius: 10}}
          mymulticolor={['orange', 'orange', 'orange']}
          myonpress={() => {
            console.log(FirstName);
            console.log(LastName);
            console.log(Email);
            console.log(Bio);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  loginButton: {
    borderRadius: 10,
    height: 45,
    width: '100%',
    justifyContent: 'center',
  },
  graphStyle: {
    flex: 1,
    paddingRight: 25,

    marginVertical: 8,
    borderRadius: 16,
  },
  loginScreenContainer: {
    paddingHorizontal: 20,
  },
  image: {
    width: '100%' / 2,
    alignSelf: 'center',
  },
  loginFormView: {
    marginTop: 50,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    backgroundColor: '#EFEEF4',
    paddingHorizontal: 10,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 45,
    width: '100%',
    justifyContent: 'center',
  },
  bottomModal: {
    
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: 250,
  },
  scrollableModalContent1: {
    backgroundColor: '#fff',
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageProfile: {
    width: 130,
    height: undefined,
    aspectRatio: 1,
    borderRadius: 40,
    alignSelf: 'center',
  },
  loginButton: {
    backgroundColor: 'black',
    borderRadius: 10,
    height: 45,
    marginTop: 0,
    width: '100%',
    justifyContent: 'center',
  },
});
