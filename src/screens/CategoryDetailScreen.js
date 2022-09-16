import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import Header from '../components/Header';
import {COLORX, Font} from '../constants/AppConstants';
import {imgx} from '../constants/Images';
import navigationstring from '../constants/navigationstring'; 
import mydata from '../model/flatlistrecomended.json'
import {URL} from '../constants/URLS';

const CategoryDetailScreen = props => {
  const [state, setstate] = useState({
    DataFetched: false,
    Data: [],
    temp: [],
  });
  const {Data, DataFetched} = state;
  const updateState = data => setstate(state => ({...state, ...data}));

  const GetDataFromApi = () => {
    const url = URL.My_Database_Url+'products';
    fetch(url, {
      method: 'GET',
    })
      .then(response => response.text())
      .then(async responseText => {
        let responseData = JSON.parse(responseText);
        let temp = responseData.productlist;
        // console.log(responseData);

        temp.map(item => {
          if (item.category == props.route.params) {
            if (!Data.includes(item)) {
              Data.push(item);
            }
            if (item in Data)
            {
              console.log("true")
            }
            
          }
        });
        updateState({
          DataFetched: true,
        });
      })
      .catch(error => {
        console.log(error, 'error from APi UploadData1212');
      });

    // hit api
  };

  useEffect(() => {
    GetDataFromApi();
  }, []);

  const ITEMRENDERER = (item, index) => {
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
          console.log(item.item);
          props.navigation.navigate(navigationstring.ITEMDETAIL, item.item);
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

  return (
    <View>
      <View
        style={{
          backgroundColor: 'orange',
          paddingHorizontal: moderateScale(20),
          paddingVertical: moderateVerticalScale(5),
          borderBottomLeftRadius: scale(10),
          borderBottomRightRadius: scale(10),
        }}>
        <Header
          Is_left_icon={true}
          left_onpress={() => {
            props.navigation.goBack();
          }}
          left_style={{height: moderateScale(20), width: moderateScale(20)}}
          left_icon={imgx.goBack}
          Is_header_center={true}
          header_style={[Font.font24, {fontWeight: '700'}]}
          header_text={props.route.params}
          Is_right_icon={false}
        />
      </View>
      {Data ? (
        <FlatList
          style={{paddingBottom: moderateVerticalScale(150)}}
          bounces={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          data={Data}
          renderItem={ITEMRENDERER}
        />
      ) : (
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize:scale(24),fontWeight:"600",color:"black"}}>
          No Data</Text></View>
      )}
    </View>
  );
};

export default CategoryDetailScreen;
