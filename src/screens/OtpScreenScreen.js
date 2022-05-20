import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Toast from 'react-native-toast-message';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {WaveIndicator} from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';
import navigationstring from '../constants/navigationstring';
import { font } from '../constants/font';
import { scale } from 'react-native-size-matters';
import { COLORX } from '../constants/AppConstants';

class OtpScreenScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 28,
      // ForgetEmailtoOTP: this.props.route.params.ForgetEmail,
      code: '',
      iSloding: false,
      userStoredData: [],
      loginbuttononetime: false,
      loginbuttonOpesty: 1,
    };
  }


  resendOtp = () => {
    this.interval = setInterval(() => {
      return this.setState(prevState => {
        return {timer: prevState.timer - 1};
      });
    }, 1000);
    this.setState({timer: 28});
    this.ForgetPassword();
  };

  ForgetPassword = () => {
    
  };

  componentDidMount() {
    this.resendOtp();
  }

  componentDidUpdate() {
    if (this.state.timer === 0) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  OTPapiVerification = () => {
    
  };


  NavigationRight =() => {
    // this.props.navigation.navigate('NotificationScreen');
  }
  
   NavigationLeft =() => {
    this.props.navigation.goBack();
  }
  
   NavigationImageCenter =() => {
    // this.props.navigation.navigate('LoginScreen');
  }

  render() {
    const isCounting = this.state.timer;
    return (
      <View style={{flex:1,backgroundColor:'white'}}>




        <TouchableWithoutFeedback>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.loginScreenContainer}>
              <View style={{marginTop: 25}}>
                <Text
                  style={{
                    fontSize: scale(font.heading_font),
                    fontWeight: '700',
                    color: 'black',
                    marginBottom: 5,
                  }}>
                  Verification Code
                </Text>
              </View>

              <Text
                style={{
                  fontSize: scale(font.text_font),
                  color: 'gray',
                }}>
                Please enter the code carefully
              </Text>
              <View style={styles.loginFormView}>
                
               
                <View style={{width: '100%', alignItems: 'center'}}>
                  <OTPInputView
                    style={{
                      width: '85%',
                      height: 60,
                      justifyContent: 'center',
                    }}
                    borderStyleBase={{width: 30, height: 45}}
                    codeInputFieldStyle={{
                      fontSize: 20,
                      width: 45,
                      height: 55,
                      borderWidth: 0,
                      borderBottomWidth: 1,
                      color: 'black',
                      backgroundColor: '#E6E6E6',
                    }}
                    pinCount={4}
                    placeholderCharacter=""
                    code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    onCodeChanged={code => {
                      this.setState({code});
                    }}
                    autoFocusOnLoad
                    onCodeFilled={code => {
                      console.log(`Code is ${code}, you are good to go!`);
                    }}
                  />
             
             
              
              
              
              
                </View>




                
                <View style={{marginTop: 20, alignItems:'flex-end', paddingRight:32}}>
                  {isCounting != 0 && (
                    <TouchableOpacity
                      disabled={this.state.timer != 0}
                      onPress={this.resendOtp}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={
                            this.state.timer != 0
                              ? {color: 'orange', fontSize: 11}
                              : {color: 'orange', fontSize: 11}
                          }>
                          Resend Code in
                        </Text>
                        <Text
                          style={{
                            fontSize: 11,
                            color: 'orange',
                            paddingLeft: 5,
                          }}>
                          {this.state.timer} s
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}

                  {isCounting == 0 && (
                    <TouchableOpacity
                      disabled={this.state.timer != 0}
                      onPress={this.resendOtp}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={
                            this.state.timer != 0
                              ? {
                                  color: 'black',
                                  opacity: 0.4,
                                  
                                }
                              : {
                                color: 'orange',
                                }
                          }>
                          Resend Now
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => this.OTPapiVerification()}>
                    
                      <Text
                        style={{
                          color: 'white',
                          alignSelf: 'center',
                          fontSize: 16,
                        }}>
                        Next
                      </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
        {Platform.OS == 'ios' && <KeyboardSpacer />}

        {this.state.iSloding && (
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <WaveIndicator
              color='black'
              size={100}
              waveFactor={0.54}
              count={4}
              waveMode="fill"
            />
          </View>
        )}
      </View>
    );
  }
}

export default OtpScreenScreen;

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '100%',
  },
  loginScreenContainer: {
    paddingHorizontal: 20,
  },
  loginFormView: {
    marginTop: 70,
  },
  loginButton: {
    backgroundColor: "orange",
    borderRadius: 10,
    height: 45,
    marginTop: 70,
    width: '85%',
    justifyContent: 'center',
  },
});
