import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';

import LottieView from 'lottie-react-native';
import navigationstring from '../constants/navigationstring';
import {moderateScale, scale} from 'react-native-size-matters';
import {imgx} from '../constants/Images';
import {COLORX} from '../constants/AppConstants';

const swiper = null;
const ref = '';
class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress1);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress1);
  }

  handleBackPress1 = () => {
    return true;
  };

  componentDidMount() {
    AsyncStorage.setItem('@onboardingcheck', 'Read Data');
  }

  render() {
    return (
      <Swiper
        ref={swiper => {
          this.swiper = swiper;
        }}
        style={styles.wrapper}
        showsButtons={false}
        index={0}
        disablePrevButton
        disableNextButton
        bounces={true}
        loop={false}
        dot={<View style={[styles.swiperDot, {marginBottom: 0}]} />}
        activeDot={<View style={[styles.swiperActiveDot, {marginBottom: 0}]} />}
        paginationStyle={styles.pagination}
        buttonWrapperStyle={styles.swiperButtons}>
        <View style={styles.slide1}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={imgx.step1}
              style={{
                justifyContent: 'center',
                height: moderateScale(200),
                width: moderateScale(200),
                top: '20%',
              }}
            />
          </View>
          <View style={{flex: 1, paddingHorizontal: 20}}>
            <View style={{marginTop: 20}}>
              <Text style={styles.text}>Lorem Ipsum is simply dummy text</Text>
            </View>
            <View style={{marginTop: 20, paddingHorizontal: 15}}>
              <Text style={styles.subtext}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </Text>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              top: Platform.OS == 'ios' ? 50 : 0,
              right: 25,
            }}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.replace(navigationstring.LOGIN)
              }
              style={{
                height: 40,
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: scale(12),
                  color: 'orange',
                  fontFamily: 'Nunito-Bold',
                }}>
                Skip
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.slide2}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={imgx.step2}
              style={{
                justifyContent: 'center',
                height: moderateScale(200),
                width: moderateScale(200),
                top: '20%',
              }}
            />
          </View>
          <View style={{flex: 1, paddingHorizontal: 20}}>
            <View style={{marginTop: 20}}>
              <Text style={styles.text}>Lorem Ipsum is simply dummy text</Text>
            </View>
            <View style={{marginTop: 20, paddingHorizontal: 15}}>
              <Text style={styles.subtext}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </Text>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              top: Platform.OS == 'ios' ? 50 : 20,
              right: 25,
            }}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.replace(navigationstring.LOGIN)
              }
              style={{
                height: 40,
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: scale(12),
                  color: 'orange',
                  fontFamily: 'Nunito-Bold',
                }}>
                Skip
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.slide3}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              left: 10,
            }}>
            <Image
              source={imgx.step3}
              style={{
                justifyContent: 'center',
                height: moderateScale(200),
                width: moderateScale(200),
                top: '20%',
              }}
            />
          </View>
          <View style={{flex: 1, paddingHorizontal: 20}}>
            <View style={{marginTop: 20}}>
              <Text style={styles.text}>Lorem Ipsum is simply dummy text</Text>
            </View>
            <View style={{marginTop: 20, paddingHorizontal: 15}}>
              <Text style={styles.subtext}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </Text>
            </View>
          </View>
          <View style={{position: 'absolute', bottom: 30, right: 20}}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.replace(navigationstring.LOGIN)
              }
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'orange',
              }}>
              <Image
                style={{
                  height: 25,
                  width: 25,
                  tintColor: 'white',
                }}
                source={imgx.onboard_done}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Swiper>
    );
  }
}

export default Onboarding;

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  slide2: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  slide3: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  text: {
    color: '#000',
    fontSize: 10,
    alignSelf: 'center',
    // fontFamily: 'Nunito-Bold',
    fontWeight: '700',
  },
  subtext: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
    lineHeight: 25,
  },
  swiperDot: {
    backgroundColor: '#e4e4e4',
    height: 6,
    width: 6,
    borderRadius: 3,
    marginRight: 6,
    marginLeft: 6,
  },
  swiperActiveDot: {
    backgroundColor: 'black',
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 4,
    marginLeft: 4,
  },
  pagination: {
    marginBottom: 20,
  },
  swiperButtons: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
