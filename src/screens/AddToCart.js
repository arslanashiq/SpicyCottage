import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import LottieView from 'lottie-react-native';

import MyTouchableOpacity from '../components/MyTouchableOpacity';
import {imgx} from '../constants/Images';
import {COLORX, Font} from '../constants/AppConstants';
import navigationstring from '../constants/navigationstring';

const AddToCart = props => {
  const [state, setstate] = useState({
    Data: [],
    DataFetched: false,
    item_total: [],
  });
  const {Data, item_total, DataFetched} = state;
  const updateState = data => setstate(state => ({...state, ...data}));
  let Total;

  const DelItem = (index, name) => {
    let messagebody = 'Are you sure you want to remove ' + name + ' from List';
    Alert.alert(`Remove ${name}`, messagebody, [
      {
        text: 'No',
        onPress: () => {
          return;
        },
      },
      {
        text: 'Yes',
        onPress: () => {
          item_total.splice(index, 1);
          if (Data.length == 1) {
            removeData();
          } else {
            Data.splice(index, 1);
            ChangeCartItemQuantity(Data);
          }
        },
      },
    ]);
  };

  const ChangeCartItemQuantity = async data => {
    try {
      const updatedlist = JSON.stringify(data);
      await AsyncStorage.setItem('@StoreData', updatedlist).then(() => {
        CartToken();
      });
    } catch (error) {
      console.log('Change item value error from store', error.message);
    }
  };

  const removeData = async () => {
    await AsyncStorage.removeItem('@StoreData').then(() => {
      updateState({
        Data: null,
        DataFetched: false,
      });
    });
  };

  const CartToken = async () => {
    try {
      const myresponse = await AsyncStorage.getItem('@StoreData').then(
        value => {
          updateState({
            Data: JSON.parse(value),
          });

          if (Data != null) {
            let temp = [];
            Data.map(val => {
              temp.push(val.quantity * val.price);
            });
          }
        },
      );
    } catch (error) {
      console.log('Get store data error ', error.message);
    }
  };

  useEffect(() => {
    props.navigation.addListener('tabPress', e => {
      updateState({item_total: []});
      CartToken();
    });

    props.navigation.addListener('focus', e => {
      updateState({item_total: []});

      CartToken();
    });
    updateState({item_total: []});
  }, [DataFetched]);

  const sum = (idx, value) => {
    item_total.splice(idx, 1, value);
    Total = 0;
    item_total.map(val => {
      Total += val;
    });

    return value;
  };
  return (
    <View
      style={{
        backgroundColor: Data ? '' : 'white',
        flex: 1,
      }}>
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
            marginLeft: moderateScale(30),
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text
            style={{color: 'black', fontSize: scale(24), fontWeight: '600'}}>
            Cart List
          </Text>
        </View>
        <View
          style={{
            opacity: Data ? 1 : 0,
            backgroundColor: 'black',
            height: moderateScale(3),
            position: 'absolute',
            bottom: '-0%',
            width: '50%',
          }}></View>
        <View
          style={{
            opacity: Data ? 1 : 0,
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
                backgroundColor: 'white',
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

                  color: 'black',
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
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: moderateVerticalScale(50),
          }}>
          {Data ? (
            Data.map((item, index) => (
              <View
                style={{
                  paddingHorizontal: moderateScale(10),
                  paddingVertical: moderateVerticalScale(10),
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  alignItems: 'center',
                  marginBottom: moderateVerticalScale(1),
                  borderBottomWidth: scale(1),
                  borderColor: COLORX.gray02,
                }}
                key={index}>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: '0%',
                    right: '0%',
                    zIndex: 10,
                    // backgroundColor: 'orange',
                    height: moderateScale(30),
                    width: moderateScale(30),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    DelItem(index, item.name);
                  }}>
                  <Image
                    style={{
                      height: moderateScale(20),
                      width: moderateScale(20),
                      borderRadius: moderateScale(100),
                    }}
                    source={imgx.removeitem}
                  />
                </TouchableOpacity>
                <Image
                  style={{
                    height: moderateScale(80),
                    width: moderateScale(80),
                    borderRadius: moderateScale(100),
                  }}
                  source={{uri: item.image}}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginLeft: moderateScale(10),
                  }}>
                  <Text
                    style={{
                      color: 'orange',
                      fontSize: scale(16),
                      fontWeight: '600',
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: COLORX.gray04,
                      fontSize: scale(12),
                      fontWeight: '600',
                    }}>
                    {item.size}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: moderateVerticalScale(10),
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'orange',
                        height: moderateScale(25),
                        width: moderateScale(25),
                        borderRadius: scale(25),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        if (item.quantity >= 2) {
                          item.quantity -= 1;
                          ChangeCartItemQuantity(Data);
                        } else {
                          DelItem(index, item.name);
                        }
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: scale(16),
                          fontWeight: '800',
                        }}>
                        -
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        // marginHorizontal:moderateScale(10),
                        paddingHorizontal: moderateScale(10),
                        color: 'black',
                        fontSize: scale(16),
                        fontWeight: '800',
                      }}>
                      {item.quantity}
                    </Text>

                    <TouchableOpacity
                      style={{
                        backgroundColor: 'orange',
                        height: moderateScale(25),
                        width: moderateScale(25),
                        borderRadius: scale(25),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        item.quantity += 1;
                        // console.log(item.quantity);
                        ChangeCartItemQuantity(Data);
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: scale(16),
                          fontWeight: '800',
                        }}>
                        +
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text
                  style={{
                    color: COLORX.gray04,
                    fontSize: scale(16),
                    fontWeight: '800',
                  }}>
                  Rs {sum(index, item.price * item.quantity)}
                </Text>
              </View>
            ))
          ) : (
            <View>
              <LottieView
                loop={true}
                autoPlay={true}
                style={{backgroundColor: 'red', height: 'auto', width: 'auto'}}
                source={imgx.NoData}
              />
            </View>
          )}
        </View>
        {Data ? (
          <View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                paddingHorizontal: moderateScale(20),
                flexDirection: 'column',
                paddingTop: moderateVerticalScale(15),
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: moderateVerticalScale(10),
                }}>
                <Text
                  style={{
                    flex: 1,
                    color: 'black',
                    fontSize: scale(16),
                    fontWeight: '800',
                  }}>
                  Subtotal
                </Text>

                <Text
                  style={{
                    color: 'black',
                    fontSize: scale(16),
                    fontWeight: '800',
                  }}>
                  Rs {Total}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: moderateVerticalScale(10),
                }}>
                <Text
                  style={{
                    flex: 1,
                    color: COLORX.gray05,
                    fontSize: scale(13),
                    fontWeight: '800',
                  }}>
                  Discount 10%
                </Text>

                <View
                  style={{
                    backgroundColor: 'orange',
                    opacity: 0.6,
                    paddingLeft: moderateVerticalScale(20),
                    paddingLeft: moderateVerticalScale(10),
                    paddingRight: moderateScale(10),
                    borderRadius: scale(20),
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: scale(16),
                      fontWeight: '800',
                    }}>
                    Rs {parseFloat(Total / 10)}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: moderateVerticalScale(10),
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    flex: 1,
                    color: COLORX.gray04,
                    fontSize: scale(13),
                    fontWeight: '500',
                  }}>
                  Delivery Charges
                </Text>
                <Text
                  style={{
                    // color: 'black',
                    color: COLORX.gray04,
                    fontSize: scale(13),
                    fontWeight: '500',
                  }}>
                  Rs {parseInt(Total / 20)}
                </Text>
              </View>
            </View>

            {/* checkoout button */}

            <MyTouchableOpacity
              myText="Checkout & Address"
              // mycss={{borderRadius: 10}}
              mymulticolor={['orange', 'orange', 'orange']}
              myonpress={() => {
                // CheckUser();
                props.navigation.navigate(navigationstring.CHECKOUT, {
                  Data,
                  item_total,
                  Total,
                });
              }}
            />
          </View>
        ) : (
          <View></View>
        )}

        <View
          style={{
            paddingBottom: moderateVerticalScale(100),
            // marginTop: moderateVerticalScale(20),
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
      </ScrollView>
    </View>
  );
};

export default AddToCart;
