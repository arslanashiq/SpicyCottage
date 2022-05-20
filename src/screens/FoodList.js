import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import Header from '../components/Header';
import {Font} from '../constants/AppConstants';
import {imgx} from '../constants/Images';
// import mydata from '../model/foodcategory.json';
import navigationstring from '../constants/navigationstring';
import {URL} from '../constants/URLS';

const FoodList = props => {
  const [state, setstate] = useState({
    data: [],
    apihit: false,
  });
  const {IsLoading, IsPressed, data, apihit} = state;
  const updateState = data => setstate(state => ({...state, ...data}));

  const GetFoodCategory = () => {
    if (!apihit) {
      const url = URL.My_Database_Url + 'foodcategories';
      const temp = [];
      fetch(url, {
        method: 'GET',
      })
        .then(response => response.text())
        .then(async responseText => {
          let responseData = JSON.parse(responseText);
          if (responseData.status == 200) {
            console.log('Data Found Successfully');
            responseData.foodcategoryList.map(item => {
              if (item in temp) {
              } else {
                temp.push(item);
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
      updateState({apihit: true});
    }

    // hit api
  };
  const Item = ({image, title}) => (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate(navigationstring.CATEGORYDETAIL, title);
      }}>
      <View style={styles.item_container}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  useLayoutEffect(() => {
    props.navigation.addListener('tabPress', e => {
      // updateState({Data: []});
      GetFoodCategory();
    });

    props.navigation.addListener('focus', e => {
      // updateState({Data: []});
      GetFoodCategory();
    });
    // updateState({Data: []});
  }, [apihit]);

  const renderItem = ({item}) => <Item image={item.image} title={item.name} />;

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
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
          header_text="Category"
          Is_right_icon={false}
        />
      </View>
      {!apihit && (
        <View>
          <LottieView
            loop={true}
            autoPlay={true}
            style={{ height: 'auto', width: 'auto'}}
            source={imgx.Loading}
          />
        </View>
      )}
      {data.length==0 && apihit&&<View>
          <LottieView
            loop={true}
            autoPlay={true}
            style={{ height: 'auto', width: 'auto'}}
            source={imgx.NoData}
          />
        </View>}
      {data.length >= 1 && apihit && (
        <View
          style={{
            paddingTop: moderateVerticalScale(5),
            paddingHorizontal: moderateScale(10),
          }}>
          <FlatList
            contentContainerStyle={{paddingBottom: moderateVerticalScale(140)}}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item_container: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: 'orange',
    marginVertical: 5,
    borderRadius: 20,
  },
  image: {
    height: 150,
    width: 180,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  text: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
    marginHorizontal: 10,
    color: 'black',
  },
});

export default FoodList;
