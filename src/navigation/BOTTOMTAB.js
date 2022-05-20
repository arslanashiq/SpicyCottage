import React from 'react';
import 'react-native-gesture-handler';
import {View, Text, StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SETTING, FOODLIST, HOME, ADDTOCART, FAVORITE, ORDERSTATUSSCREEN} from '../screens';
import LottieView from 'lottie-react-native';
import navigationstring from '../constants/navigationstring';
import {imgx} from '../constants/Images';

const Tab = createBottomTabNavigator();

function BOTTOMTABHOME() {
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        initialRouteName={navigationstring.HOME}
        screenOptions={{
          headerShown: false,
          keyboardHidesTabBar: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 10,
            backgroundColor: '#ffff',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            height: 80,
            shadowColor: 'gray',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 5,
          },
        }}>
        <Tab.Screen
          name={navigationstring.FOODLIST}
          component={FOODLIST}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 5,
                  paddingBottom: 5,
                }}>
                <LottieView
                  source={imgx.food_animation}
                  autoPlay={focused}
                  loop={focused ? true : false}
                  style={{height: 30, width: 30}}
                />

                <Text
                  style={{
                    color: focused ? 'orange' : 'rgba(0,0,0,0.7)',
                    fontSize: 12,
                  }}>
                  Food
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name={navigationstring.ADDTOCART}
          component={ADDTOCART}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 0,
                  paddingBottom: 5,
                }}>
                <LottieView
                  source={imgx.cart_animation}
                  autoPlay={focused}
                  loop={focused ? true : false}
                  style={{height: 40, width: 40}}
                />

                <Text
                  style={{
                    color: focused ? 'orange' : 'rgba(0,0,0,0.7)',
                    fontSize: 12,
                  }}>
                  Cart
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name={navigationstring.HOME}
          component={HOME}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  backgroundColor: 'white',
                  height: 70,
                  width: 60,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 30,
                  borderBottomLeftRadius: 20,
                  top: -25,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor:'red',

                    
                    height: 80,
                    width: 80,
                    backgroundColor: '#f0f8ff',
                    borderRadius: 40,
                  }}>
                  <LottieView
                    resizeMode="contain"
                    source={imgx.home_animation}
                    autoPlay={focused}
                    style={{
                      height: 85,
                      width: 85,
                    }}
                  />
                  <View style={{position: 'absolute', bottom: '30%'}}>
                    <Text
                      style={{
                        color: focused ? 'orange' : 'rgba(0,0,0,0.7)',
                        fontSize: 12,
                        top: 17,
                      }}>
                      Home
                    </Text>
                  </View>
                </View>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name={navigationstring.ORDERSTATUS}
          component={ORDERSTATUSSCREEN}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 5,
                  paddingBottom: 5,
                }}>
                <LottieView
                  source={imgx.order_list}
                  autoPlay={focused}
                  loop={focused ? true : false}
                  style={{height: 30, width: 30}}
                />

                <Text
                  style={{
                    color: focused ? 'orange' : 'rgba(0,0,0,0.7)',
                    fontSize: 12,
                  }}>
                  Orders
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name={navigationstring.SETTING}
          component={SETTING}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 5,
                  paddingBottom: 5,
                }}>
                <LottieView
                  source={imgx.setting_animation}
                  autoPlay={focused}
                  loop={focused ? true : false}
                  style={{height: 30, width: 30}}
                />

                <Text
                  style={{
                    color: focused ? 'orange' : 'rgba(0,0,0,0.7)',
                    fontSize: 12,
                  }}>
                  Profile
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
      {/* </NavigationContainer> */}
    </View>
  );
}
export default BOTTOMTABHOME;
