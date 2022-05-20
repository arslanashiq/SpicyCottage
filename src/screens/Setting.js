import {View, Text, ScrollView, Linking,Alert, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {imgx} from '../constants/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {openComposer} from 'react-native-email-link';
import navigationstring from '../constants/navigationstring';

import SettingTouchable from '../components/SettingTouchable';
import {font} from '../constants/font';
import Header from '../components/Header';
import {Font} from '../constants/AppConstants';

const Setting = props => {
  const [state, setstate] = useState({
    AppStore: '',
    PlayStore: '',
    supportEmail: 'ashiqarslan66@gmail.com',
  });
  const {AppStore, PlayStore, supportEmail} = state;

  const updateState = data => setstate(state => ({...state, ...data}));



  const PopupMessage = async() => {
    let messagebody = 'Are you sure you want to Logout ?';
    Alert.alert('Logout', messagebody, [
      {
        text: 'No',
        onPress: () => {
          return;
        },
      },
      {
        text: 'Yes',
        onPress: () => {
          AsyncStorage.removeItem('@UserData')
          console.log("User Deleted")
          AsyncStorage.removeItem('@UserData')

          props.navigation.replace(navigationstring.LOGIN);
        },
      },
    ]);
  };

  toggleDatePickerModal = show => {
    updateState({showDate: true});
  };

  IosShare = async () => {
    try {
      const result = await Share.share({
        title: 'Challenge',
        message: 'Please install the official Challenge app',
        url: state.AppStore,
        subject: 'Challenge',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };

  AndroidShare = async () => {
    try {
      const result = await Share.share({
        dialogTitle: 'Challenge',
        title: 'Challenge',
        message:
          'Please install the official Challenge app, Download Link ' +
          state.PlayStore,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };

  shareSelect = () => {
    Platform.OS === 'ios' ? IosShare() : AndroidShare();
  };

  RateusSelect = () => {
    Platform.OS === 'ios'
      ? Linking.openURL('https://www.facebook.com/')
      : Linking.openURL('https://www.facebook.com/');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#aabb',
      }}>
      <View
        style={{
          backgroundColor: 'orange',
          paddingHorizontal: moderateScale(20),
          paddingVertical: moderateVerticalScale(5),
          borderBottomLeftRadius: scale(10),
          borderBottomRightRadius: scale(10),
        }}>
        <Header
          Is_left_icon={false}
          Is_header_center={true}
          header_style={[Font.font24, {fontWeight: '700'}]}
          header_text="Setting"
          Is_right_icon={false}
        />
      </View>
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            marginHorizontal: moderateScale(15),
            marginVertical: moderateVerticalScale(10),
            paddingVertical: moderateVerticalScale(10),
            borderRadius: scale(20),
          }}>
          <View style={styles.headings}>
            <Text style={styles.headings_text}>Account</Text>
          </View>

          <SettingTouchable
            myicon={imgx.edit_profile}
            myicon2={imgx.setting_arrow}
            mytext="Edit Profile"
            myonpress={() => {
              console.log('Edit Profile');
              props.navigation.navigate(navigationstring.EDITPROFILE);
            }}
          />
          <SettingTouchable
            myicon={imgx.change_password}
            myicon2={imgx.setting_arrow}
            mytext="Change Password"
            myonpress={() => {
              props.navigation.navigate(navigationstring.CHANGEPASSWORD);
            }}
          />
          <View
            style={{
              marginHorizontal: 20,
              flex: 1,
              height: 1,
              backgroundColor: '#aabb',
            }}></View>

          <View style={styles.headings}>
            <Text style={styles.headings_text}>Support</Text>
          </View>

          <SettingTouchable
            myicon={imgx.report_a_problem}
            myicon2={imgx.setting_arrow}
            mytext="Report a Problem"
            myonpress={() => {
              console.log('Report a problem');
              openComposer({
                to: supportEmail,
                subject: 'I have a question',
                body: 'Hi, can you help me with...',
              });
            }}
          />

          <View
            style={{
              marginHorizontal: 20,
              flex: 1,
              height: 1,
              backgroundColor: '#aabb',
            }}></View>

          <View style={styles.headings}>
            <Text style={styles.headings_text}>About</Text>
          </View>
          <SettingTouchable
            myicon={imgx.share_app}
            myicon2={imgx.setting_arrow}
            mytext="Share App"
            myonpress={() => {
              console.log('Share app');
              shareSelect();
            }}
          />
          <SettingTouchable
            myicon={imgx.add_friend}
            myicon2={imgx.setting_arrow}
            mytext="Invite Friend"
            myonpress={() => {
              console.log('Invite friend');
              shareSelect();
            }}
          />
          <SettingTouchable
            myicon={imgx.rate_us}
            myicon2={imgx.setting_arrow}
            mytext="Rate US"
            myonpress={() => {
              console.log('Rate US');
              RateusSelect();
            }}
          />
          <SettingTouchable
            myicon={imgx.privacy_policy}
            myicon2={imgx.setting_arrow}
            mytext="Privacy Policy"
            myonpress={() => {
              console.log('Privacy Policy');
              Linking.openURL('https://termify.io/privacy-policy-generator');
            }}
          />
          <SettingTouchable
            myicon={imgx.terms_of_service}
            myicon2={imgx.setting_arrow}
            mytext="Terms of Service"
            myonpress={() => {
              console.log('Terms of Service');
              Linking.openURL('https://termify.io/terms-of-service-generator');
            }}
          />
          <SettingTouchable
            myicon={imgx.change_password}
            myicon2={imgx.setting_arrow}
            mytext="Logout"
            myonpress={() => 
              PopupMessage()
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  headings: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateVerticalScale(5),
  },
  headings_text: {
    color: 'black',
    fontSize: scale(font.heading_font),
    fontWeight: '600',
  },
});
