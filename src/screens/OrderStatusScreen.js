import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {URL} from '../constants/URLS';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import Header from '../components/Header';

import {
  scale,
  moderateScale,
  moderateVerticalScale,
  ms,
} from 'react-native-size-matters';
import {COLORX, Font} from '../constants/AppConstants';
const OrderStatusScreen = props => {
  const [state, setstate] = useState({
    data: [],
    ShowDetail: false,
    apihit: false,
    SingleData: [],
  });
  let my_user_id = '';
  const {data, ShowDetail, SingleData, apihit} = state;
  const updateState = data => setstate(state => ({...state, ...data}));

  const GetUser = async () => {
    try {
      await AsyncStorage.getItem('@UserData').then(res => {
        let userdata = JSON.parse(res);
        my_user_id = userdata.id;
      });
    } catch (error) {
      console.log('error', error.message);
    }
  };
  const GetOrderList = async () => {
    GetUser();

    if (!apihit) {
      console.log(my_user_id);
      const url = URL.My_Database_Url + 'orders';
      const temp = [];
      fetch(url, {
        method: 'GET',
      })
        .then(response => response.text())
        .then(async responseText => {
          let responseData = JSON.parse(responseText);
          if (responseData.status == 200) {
            console.log('Data Found Successfully');
            responseData.orderlist.map(item => {
              if (item.status != 'Delivered') {
                if (item.user_id == my_user_id) {
                  // console.log(item);
                  temp.push(item);
                }
              }
            });

            updateState({data: temp});
          } else {
            console.log('fail');
          }
        })
        .catch(error => {
          console.log(error, 'error from APi UploadData1212');
        });
      // updateState({apihit: true});
    }
    // hit api
  };

  useEffect(
    () => {
      GetUser();
      props.navigation.addListener('tabPress', e => {
        GetUser();
        console.log('first');
        updateState({data: []});
        GetOrderList();
      });

      props.navigation.addListener('focus', e => {
        GetUser();
        console.log('first1');
        updateState({data: []});
        GetOrderList();
      });

      GetOrderList();
    },
    [apihit],
    my_user_id,
  );
  return (
    <View>
      <Modal
        useNativeDriver
        propagateSwipe
        onBackButtonPress={() => updateState({ShowDetail: false})}
        onBackdropPress={() => updateState({ShowDetail: false})}
        isVisible={ShowDetail}
        animationIn={'slideInUp'}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}>
        <Toast />
        <View
          style={{
            height: moderateScale(400),
            width: '100%',
          }}>
          <View
            style={{
              paddingLeft: moderateScale(20),
              borderTopLeftRadius: scale(30),
              borderTopRightRadius: scale(30),
              backgroundColor: 'orange',
              paddingVertical: moderateVerticalScale(10),
              // height:moderateScale(20)
            }}>
            <Text
              style={{
                fontSize: scale(20),
                color: 'black',
                fontWeight: '800',
              }}>
              Order Detail
            </Text>
          </View>

          <ScrollView>
            {SingleData &&
              SingleData.map((item, index) => (
                <View
                  key={index}
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    paddingHorizontal: moderateScale(20),
                    paddingVertical: moderateVerticalScale(10),
                    backgroundColor: 'orange',
                  }}>
                  <Text style={{color: 'black', fontWeight: '800'}}>
                    {item.quantity} x {item.name} ({item.size})
                  </Text>
                  <View style={{position: 'absolute', right: '10%'}}>
                    <Text style={{color: 'black', fontWeight: '800'}}>
                      {item.price} $
                    </Text>
                  </View>
                </View>
              ))}
            <View
              style={{
                height: moderateScale(320),
                backgroundColor: 'orange',
              }}></View>
          </ScrollView>
        </View>
      </Modal>
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
          Is_header_center={false}
          header_style={[Font.font24, {fontWeight: '700'}]}
          header_text="Order Information"
          Is_right_icon={false}
        />
      </View>
      <ScrollView>
        <View style={{marginBottom:moderateVerticalScale(150)}}>
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                updateState({SingleData: item.order_detail});
                updateState({SingleData: item.order_detail});
                updateState({ShowDetail: true});
                // console.log('SingleData : ', SingleData);
              }}
              activeOpacity={0.8}
              style={{
                flexDirection: 'column',
                backgroundColor: 'orange',
                marginVertical: moderateVerticalScale(2),
                paddingVertical: moderateVerticalScale(10),
                marginHorizontal: moderateScale(2),
                paddingHorizontal: moderateScale(20),
                borderRadius: scale(15),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: scale(16),
                    fontWeight: '800',
                  }}>
                  Name :{' '}
                </Text>
                <Text style={{color: 'black'}}>{item.user_detail[0]} </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: scale(16),
                    fontWeight: '800',
                  }}>
                  Phone # :{' '}
                </Text>
                <Text style={{color: 'black'}}>{item.user_detail[1]} </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: "flex-start",
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: scale(16),
                    fontWeight: '800',

                  }}>
                  Address :{' '}
                </Text>
                <Text style={{color: 'black',width:moderateScale(230)}}>{item.user_detail[2]} </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: scale(16),
                    fontWeight: '800',
                  }}>
                  Total :{' '}
                </Text>
                <Text style={{color: 'black'}}>{item.total_price}</Text>
                <Text style={{color: 'black', fontWeight: '700'}}> $ </Text>
              </View>

              <View
                style={{
                  position: 'absolute',
                  top: '10%',
                  right: '2%',
                  paddingHorizontal: moderateScale(5),
                  paddingVertical: moderateVerticalScale(2),
                  borderRadius: scale(30),
                  backgroundColor:
                    item.status == 'Pending'
                      ? 'red'
                      : item.status == 'Waiting'
                      ? 'yellow'
                      : 'green',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'orange',
                    fontWeight: '900',
                    fontSize: scale(10),
                  }}>
                  {item.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderStatusScreen;
