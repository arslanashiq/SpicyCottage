import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {imgx} from '../constants/Images';
import {COLORX, Font} from '../constants/AppConstants';

import r2 from '../model/flatlist.json';
import r1 from '../model/flatlistrecomended.json';
import onlyone from '../model/onlyone.json';
import NavigationStrings from '../constants/navigationstring';
import Header from '../components/Header';
import {URL} from '../constants/URLS';
const HomeScreen = props => {
  const [state, setstate] = useState({
    RecomendedData: [],
    RecentData: [],
    apihit: false,
  });
  const {RecomendedData, RecentData, apihit} = state;
  const updateState = data => setstate(state => ({...state, ...data}));

  useLayoutEffect(() => {
    props.navigation.addListener('tabPress', e => {
      GetData();
    });

    props.navigation.addListener('focus', e => {
      GetData();
    });
    // GetData();
  }, []);
  //renderitem of flat list
  const GetData = () => {
    if (!apihit) {
      let url = URL.My_Database_Url + 'recomended';
      const temp = [];
      fetch(url, {
        method: 'GET',
      })
        .then(response => response.text())
        .then(async responseText => {
          let responseData = JSON.parse(responseText);
          if (responseData.status == 200) {
            console.log('Data Found Successfully');
            // responseData.recomendedList.map(item => {
            //   if (item in temp) {
            //   } else {
            //     temp.push(item);
            //     // console.log(item)
            //   }
            // });
            updateState({RecomendedData: responseData.recomendedList});
          } else {
            console.log('fail');
          }
        })
        .catch(error => {
          console.log(error, 'error from APi Reomended');
        });

      url = URL.My_Database_Url + 'recent';
      const temp2 = [];
      fetch(url, {
        method: 'GET',
      })
        .then(response => response.text())
        .then(async responseText => {
          let responseData = JSON.parse(responseText);
          if (responseData.status == 200) {
            console.log('Data Found Successfully');
            // responseData.recentList.map(item => {
            //   if (item in temp2) {
            //   } else {
            //     temp2.push(item);
            //     // console.log(item)
            //   }
            // });
            updateState({RecentData: responseData.recentList});
          } else {
            console.log('fail');
          }
        })
        .catch(error => {
          console.log(error, 'error from APi UploadData1212');
        });
      updateState({apihit: true});
    }
    // hit api
  };

  const MyRecomendedListRenderer = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'silver',
          paddingHorizontal: moderateScale(12),
          paddingVertical: moderateVerticalScale(12),
          marginHorizontal: moderateScale(10),
          borderRadius: scale(10),
        }}
        onPress={() => {
          props.navigation.navigate(NavigationStrings.ITEMDETAIL, item);
        }}>
        <ImageBackground
          source={{uri: item.image}}
          resizeMode="cover"
          style={{
            height: moderateScale(200),
            width: moderateScale(180),
            justifyContent: 'center',
            alignItems: 'center',
          }}
          imageStyle={{borderRadius: scale(15)}}></ImageBackground>

        <View
          style={{marginTop: moderateVerticalScale(5), flexDirection: 'row'}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
            }}>
            <Text
              style={{
                fontSize: scale(13),
                fontWeight: '500',
                color: 'black',
              }}>
              {item.name}
            </Text>
          </View>
          <View
            style={{
              paddingRight: moderateScale(8),
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{
                fontSize: scale(15),
                fontWeight: '600',
                color: 'black',
              }}>
              Rs {item.price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const MyRecomendedList = () => (
    <View>
      <View
        style={{
          overflow: 'scroll',
          flexDirection: 'row',
          marginTop: moderateVerticalScale(10),
          marginHorizontal: moderateScale(20),
          marginBottom: moderateVerticalScale(-3),
          alignItems: 'center',
        }}>
        <Text
          style={[
            Font.font20,
            {
              flex: 1,
              color: 'black',
              fontWeight: '700',
            },
          ]}>
          Recomended For You
        </Text>
      </View>
      <FlatList
        style={{marginTop: moderateVerticalScale(10)}}
        // bounces={false}
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={RecomendedData}
        renderItem={MyRecomendedListRenderer}
      />
      <View
        style={{
          overflow: 'scroll',
          flexDirection: 'row',
          marginTop: moderateVerticalScale(10),
          marginHorizontal: moderateScale(20),
          marginBottom: moderateVerticalScale(-3),
          alignItems: 'center',
        }}>
        <Text
          style={[
            Font.font20,
            {
              flex: 1,
              color: 'black',
              fontWeight: '700',
            },
          ]}>
          Recent Added
        </Text>
      </View>
    </View>
  );

  //footer of flatlist
  const FooterRenderer = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          borderWidth: scale(2),
          borderColor: COLORX.gray00,
          borderRadius: scale(20),
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
          marginLeft: 10,
        }}
        activeOpacity={0.8}
        onPress={() => {
          // console.log(item.item);
          props.navigation.navigate(NavigationStrings.ITEMDETAIL, item.item);
        }}>
        <ImageBackground
          source={{uri: item.item.image}}
          resizeMode="cover"
          style={{
            height: moderateScale(160),
            width: moderateScale(160),
            paddingHorizontal: moderateScale(6),
          }}
          imageStyle={{borderRadius: scale(20)}}>
          <View style={{flex: 1, marginTop: moderateVerticalScale(10)}}>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'orange',
                marginHorizontal: moderateScale(10),
                borderRadius: scale(20),
              }}>
              <Text
                style={{
                  fontSize: scale(14),
                  fontWeight: '500',
                  color: COLORX.gray00,
                }}>
                {item.item.name}
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              paddingBottom: moderateVerticalScale(10),
            }}>
            <View
              style={{
                paddingHorizontal: moderateScale(10),
                backgroundColor: 'white',
                borderRadius: scale(20),
              }}>
              <Text
                style={{
                  fontSize: scale(16),
                  fontWeight: '800',
                  color: 'black',
                }}>
                Rs {item.item.price}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const MyFooterComponent = () => (
    <FlatList
      style={{paddingBottom: moderateVerticalScale(150)}}
      bounces={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      numColumns={2}
      data={RecentData}
      renderItem={FooterRenderer}
    />
  );

  return (
    <>
      {RecomendedData.length == 0 && RecentData.length == 0 ? (
        <ActivityIndicator
          size="large"
          color="orange"
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : (
        <View style={{backgroundColor: COLORX.gray00}}>
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
              header_text="Home Screen"
              Is_right_icon={true}
              right_onpress={() =>
                props.navigation.navigate(NavigationStrings.ADDTOCART)
              }
              right_style={{
                height: moderateScale(20),
                width: moderateScale(20),
              }}
              right_icon={imgx.add_to_cart}
            />
          </View>

          <View
            style={{
              marginHorizontal: moderateScale(20),
              // marginVertical: moderateVerticalScale(30),
              marginBottom: moderateVerticalScale(8),
              flexDirection: 'row',
            }}></View>
          {/* {GetData()} */}

          <FlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={onlyone}
            renderItem={MyRecomendedList}
            ListFooterComponent={MyFooterComponent}
          />
        </View>
      )}
    </>
  );
};

export default HomeScreen;
