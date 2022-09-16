import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {imgx} from '../constants/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL} from '../constants/URLS';

import Geolocation from 'react-native-geolocation-service';

import MyTextInput from '../components/MyTextInput';
import {COLORX} from '../constants/AppConstants';
import navigationstring from '../constants/navigationstring';
const CheckoutScreen = props => {
  const [state, setstate] = useState({
    TogglePersonalinfo: false,
    ToggleCartinfo: true,
    DataFetched: false,
    Data: [],
    Name: '',
    Address: '',
    Phone: '',
    TotalPrice: 0,
    longitude: '',
    latitude: '',
    user_id: '',
  });
  const {
    TogglePersonalinfo,
    ToggleCartinfo,
    Data,
    Name,
    user_id,
    TotalPrice,
    Phone,
    Address,
    DataFetched,
    longitude,
    latitude,
  } = state;
  const updateState = data => setstate(state => ({...state, ...data}));
  const GetUser = async () => {
    try {
      await AsyncStorage.getItem('@UserData').then(res => {
        let userdata = JSON.parse(res);
        updateState({user_id: userdata.id});
      });
    } catch (error) {
      console.log('error', error.message);
    }
  };
  const PlaceOrder = () => {
    GetUser();
    UploadOrder();
  };
  const removeData = async () => {
    await AsyncStorage.removeItem('@StoreData').then(() => {
      updateState({});
    });
  };
  const UploadOrder = () => {
    const url = URL.My_Database_Url + 'orders';
    if (Name == '' || Phone == '' || Address == '') {
      // console.log("Name",Name,"\nPhone",Phone,"\nAddress",Address)
      // console.log("return")
      alert('Please Provide the Information');
      return;
    } else {
      var date = new Date().getDate();
      const UploadDataCredentials = {
        user_id: user_id,
        user_detail: [Name, Phone, Address],
        order_detail: Data,
        total_price: TotalPrice,
        order_time: date,
        status: 'Pending',
      };
      console.log(JSON.stringify(UploadDataCredentials));
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(UploadDataCredentials),
      })
        .then(response => response.text())
        .then(async responseText => {
          let responseData = JSON.parse(responseText);
          console.log('responseData', responseData);
          if (responseData.status == 200) {
            removeData();
            props.navigation.replace(navigationstring.BOTTOMTABHOME);
          } else {
            console.log('fail');
          }
        })
        .catch(error => {
          console.log(error, 'error from APi UploadData1212');
        });
    }
    // hit api
  };
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
      subscribeLocationLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              console.log(position);
              setlongitude(position.coords.longitude);
              setlatitude(position.coords.latitude);
            },
            error => {
              console.log(error.message);
            },
            {
              enableHighAccuracy: false,
              timeout: 10000,
            },
          );
        } else {
          console.log('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  useEffect(() => {
    GetUser();
    // requestLocationPermission();
    let total = props.route.params.Total;
    let discount = parseFloat(props.route.params.Total / 10);
    let delivery = parseFloat(props.route.params.Total / 20);

    updateState({
      Data: props.route.params.Data,
      TotalPrice: total - discount + delivery,
      DataFetched: true,
    });
  }, [DataFetched]);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: moderateScale(60),
          // borderBottomWidth: scale(4),
          borderColor: '#ff941a',
          backgroundColor: 'orange',

          zIndex: 10,
        }}>
        <View
          style={{
            marginLeft: moderateScale(20),
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text
            style={{color: 'black', fontSize: scale(24), fontWeight: '600'}}>
            Checkout
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'black',
            height: moderateScale(3),
            position: 'absolute',
            bottom: '-0%',
            width: '85%',
          }}></View>
        <View
          style={{
            zIndex: 5,
            flex: 1,
            flexDirection: 'row',
            position: 'absolute',
            bottom: '-47%',
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
                height: moderateScale(20),
                borderRadius: scale(20),
                width: moderateScale(20),
              }}>
              <Text
                style={{
                  fontSize: scale(13),
                  fontWeight: '500',

                  color: 'white',
                }}>
                1
              </Text>
            </View>
            <Text
              style={{
                fontSize: scale(13),
                fontWeight: '500',

                color: 'black',
              }}>
              Menu
            </Text>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
                height: moderateScale(20),
                borderRadius: scale(20),
                width: moderateScale(20),
              }}>
              <Text
                style={{
                  fontSize: scale(13),
                  fontWeight: '500',

                  color: 'white',
                }}>
                2
              </Text>
            </View>
            <Text
              style={{
                fontSize: scale(13),
                fontWeight: '500',

                color: 'black',
              }}>
              Cart
            </Text>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
                height: moderateScale(20),
                borderRadius: scale(20),
                width: moderateScale(20),
              }}>
              <Text
                style={{
                  fontSize: scale(13),
                  fontWeight: '500',

                  color: 'white',
                }}>
                3
              </Text>
            </View>
            <Text
              style={{
                fontSize: scale(13),
                fontWeight: '500',

                color: 'black',
              }}>
              Checkout
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={{paddingTop: moderateVerticalScale(50)}}>
        {/* personal info */}

        <TouchableOpacity
          style={{
            flex: 1,
            opacity: 0.8,
            flexDirection: 'row',
            backgroundColor: 'orange',
            alignItems: 'center',
            paddingHorizontal: moderateScale(20),
            paddingVertical: moderateVerticalScale(10),
            marginBottom: TogglePersonalinfo
              ? moderateVerticalScale(0)
              : moderateVerticalScale(30),
            borderRadius: scale(2),
          }}
          activeOpacity={0.8}
          onPress={() => {
            updateState({TogglePersonalinfo: !TogglePersonalinfo});
          }}>
          <Text
            style={{
              paddingRight: moderateScale(5),
              color: 'black',
              fontSize: scale(16),
              fontWeight: '700',
            }}>
            Your Information
          </Text>
          <Text
            style={{
              paddingRight: moderateScale(15),
              color: 'black',
              fontSize: scale(10),
              fontWeight: '700',
            }}>
            (Required)
          </Text>

          <Image
            style={{
              marginTop: moderateVerticalScale(5),
              height: moderateScale(15),
              width: moderateScale(15),
              tintColor: 'black',
              transform: [{rotate: TogglePersonalinfo ? '90deg' : '0deg'}],
            }}
            source={imgx.setting_arrow}
          />
        </TouchableOpacity>
        {TogglePersonalinfo ? (
          <View>
            <View
              style={{
                paddingHorizontal: moderateScale(20),
              }}>
              <MyTextInput
                mylabel="Name"
                placeholder="Name"
                autoFocus={false}
                backgroundColor="#eeee"
                color="black"
                placeholderTextColor="silver"
                myonchangetext={e => updateState({Name: e})}
              />
              <MyTextInput
                mylabel="Phone #"
                placeholder="+92"
                keyboardType="phone-pad"
                autoFocus={false}
                backgroundColor="#eeee"
                color="black"
                placeholderTextColor="silver"
                myonchangetext={e => updateState({Phone: e})}
              />
              <MyTextInput
                mylabel="Address"
                placeholder="Address"
                autoFocus={false}
                backgroundColor="#eeee"
                color="black"
                placeholderTextColor="silver"
                myonchangetext={e => updateState({Address: e})}
                multiline={true}
                numberOfLines={1}
              />
            </View>
          </View>
        ) : (
          <View></View>
        )}

        <TouchableOpacity
          style={{
            flex: 1,
            opacity: 0.8,
            flexDirection: 'row',
            backgroundColor: 'orange',
            alignItems: 'center',
            paddingHorizontal: moderateScale(20),
            paddingVertical: moderateVerticalScale(10),
            marginTop: TogglePersonalinfo
              ? moderateVerticalScale(20)
              : moderateVerticalScale(0),

            borderRadius: scale(2),
          }}
          activeOpacity={0.8}
          onPress={() => {
            updateState({ToggleCartinfo: !ToggleCartinfo});
          }}>
          <Text
            style={{
              paddingRight: moderateScale(15),
              color: 'black',
              fontSize: scale(16),
              fontWeight: '700',
            }}>
            Cart Information
          </Text>

          <Image
            style={{
              marginTop: moderateVerticalScale(5),
              height: moderateScale(15),
              width: moderateScale(15),
              tintColor: 'black',
              transform: [{rotate: ToggleCartinfo ? '90deg' : '0deg'}],
            }}
            source={imgx.setting_arrow}
          />
        </TouchableOpacity>

        {ToggleCartinfo && DataFetched ? (
          <View
            style={{
              elevation: 2,
              marginVertical: moderateVerticalScale(5),
              marginHorizontal: moderateScale(10),
              paddingVertical: moderateVerticalScale(10),
              borderRadius: scale(10),
              borderColor: COLORX.gray02,
            }}>
            {Data.map((item, index) => (
              <View
                key={index}
                style={{
                  paddingHorizontal: moderateScale(20),
                  paddingVertical: moderateVerticalScale(5),
                  flexDirection: 'row',
                }}>
                <Text style={{flex: 1, color: COLORX.gray05}}>
                  {item.quantity} x {item.name} ({item.size})
                </Text>
                <Text style={{color: COLORX.gray05}}>
                  Rs {props.route.params.item_total[index]}
                </Text>
              </View>
            ))}

            <View
              style={{
                marginTop: moderateVerticalScale(10),
                marginHorizontal: moderateScale(15),
                borderTopWidth: scale(2),
                borderColor: COLORX.gray04,
                flexDirection: 'column',
              }}>
              <View
                style={{
                  paddingHorizontal: moderateScale(5),
                  paddingVertical: moderateVerticalScale(5),
                  flexDirection: 'row',
                }}>
                <Text style={{flex: 1, color: 'black', fontWeight: '800'}}>
                  SubTotal
                </Text>
                <Text style={{color: COLORX.gray05}}>
                  Rs {props.route.params.Total}
                </Text>
              </View>

              <View
                style={{
                  paddingHorizontal: moderateScale(5),
                  paddingVertical: moderateVerticalScale(5),
                  flexDirection: 'row',
                }}>
                <Text style={{flex: 1, color: 'black', fontWeight: '800'}}>
                  Discount
                </Text>
                <Text style={{color: COLORX.gray05}}>
                  - Rs {parseFloat(props.route.params.Total / 10)}
                </Text>
              </View>

              <View
                style={{
                  paddingHorizontal: moderateScale(5),
                  paddingVertical: moderateVerticalScale(5),
                  flexDirection: 'row',
                }}>
                <Text style={{flex: 1, color: 'black', fontWeight: '800'}}>
                  Delivery Free
                </Text>
                <Text style={{color: COLORX.gray05}}>
                  Rs {parseFloat(props.route.params.Total / 20)}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View></View>
        )}

        <View
          style={{
            paddingBottom: moderateVerticalScale(150),
            // marginTop: moderateVerticalScale(20),
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: moderateScale(20),
          width: '100%',
          backgroundColor: COLORX.gray00,
          position: 'absolute',
          bottom: '0%',
          flexDirection: 'column',
        }}>
        <View
          style={{
            paddingHorizontal: moderateScale(5),
            paddingVertical: moderateVerticalScale(5),
            flexDirection: 'row',
          }}>
          <Text style={{flex: 1, color: 'black', fontWeight: '800'}}>
            Total Charges
          </Text>
          <Text style={{color: 'black', fontWeight: '800'}}>
            Rs {TotalPrice}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            console.log("I am in")

            const nameRegex = /^[a-zA-Z]{3,10}$/;
            const numberRegexwithoutcode = /^[0-9]{11,11}$/;
            const numberRegexwithcode = /^(\+92)+[0-9]{10,10}$/;
            if (
              nameRegex.test(Name) &&
              (numberRegexwithcode.test(Phone) ||
                numberRegexwithoutcode.test(Phone))
            ) {
              console.log("I am in")
              PlaceOrder();
            } else {
              alert('Please Provide Valid Information.');
            }
          }}
          style={{
            backgroundColor: 'orange',
            borderWidth: 1,
            borderColor: COLORX.gray03,
            marginVertical: moderateVerticalScale(5),
            borderRadius: scale(10),
            height: moderateScale(50),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: '700'}}>Confirm Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutScreen;
