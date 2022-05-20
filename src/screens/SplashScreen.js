import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  Text,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import navigationstring from '../constants/navigationstring';
import { imgx } from '../constants/Images';
import { moderateScale } from 'react-native-size-matters';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      fadeAnim1: new Animated.Value(0),
      moveAnim: new Animated.Value(0),
      hidden: true,
    };
  }

  componentDidMount() {
    this.MovetoScreen();

    Animated.sequence([
      Animated.timing(this.state.moveAnim, {
        duration: 500,
        toValue: Dimensions.get('window').width / 1.6,
        delay: 0,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.moveAnim, {
        duration: 500,
        toValue: 0,
        delay: 0,
        useNativeDriver: false,
      }),
    ]).start();
    Animated.timing(this.state.fadeAnim, {
      duration: 1000,
      toValue: 1,
      delay: 1500,
      useNativeDriver: false,
    }).start();
    Animated.timing(this.state.fadeAnim1, {
      duration: 4000,
      toValue: 1,
      delay: 1500,
      useNativeDriver: false,
    }).start();
  }

  MovetoScreen() {
    setTimeout(() => {
      this.LoginCheck();
    }, 4000);
  }

  LoginCheck = async () => {
    await AsyncStorage.getItem('@UserData').then(value => {
      if (value == null) {
        this.OnboardingCheck();
      } else {
        this.props.navigation.replace(navigationstring.BOTTOMTABHOME);
      }
    });
  };

  OnboardingCheck = async () => {
    await AsyncStorage.getItem('@onboardingcheck').then(value => {
      console.log(" value=>",value);
        let parsed = value;
      if (parsed == null) {
        this.props.navigation.replace(navigationstring.ONBOARDING);
      } else {
        this.props.navigation.navigate(navigationstring.LOGIN);
      }
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={"white"}
          barStyle={"dark-content"}
        />
  
        <View style={styles.contentContainer}>
          <View style={{position: 'absolute', zIndex: 1}}>
            <Animated.Image
              style={[styles.image, {opacity: this.state.fadeAnim}]}
              source={imgx.Logo}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default SplashScreen;

export const styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
    display: 'flex',
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    top: "50%",
  },
});
