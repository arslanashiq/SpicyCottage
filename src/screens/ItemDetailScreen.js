import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {imgx} from '../constants/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {font} from '../constants/font';
import Header from '../components/Header';
import navigationstring from '../constants/navigationstring';
import {COLORX} from '../constants/AppConstants';
const ItemDetailScreen = props => {
  const [state, setstate] = useState({
    quantity: 1,
    item: [],
    itemsize: [],
    ingredient: [],
    itemlength: [],
    ShowIngredient: false,
    price: 0,
    instruction: '',
    selected_item_type: [],
    cartlist: [],
  });
  const {
    quantity,
    cartlist,
    instruction,
    ShowIngredient,
    selected_item_type,
    price,
    itemlength,
    itemsize,
    ingredient,
    item,
  } = state;
  const updateState = data => setstate(state => ({...state, ...data}));
  useEffect(() => {
    updateState({
      item: props.route.params,
      itemsize: item.size,
      ingredient: item.list,
    });
    updateState({itemlength: []});
    itemsize
      ? itemsize.map((val, index) => {
          itemlength.push(false);
        })
      : updateState({itemlength: []});
    updateState({price: item.price});
  }, [itemsize]);

  const CartToken = async (id, name, image, size, price, quantity) => {
    try {
      const value = await AsyncStorage.getItem('@StoreData');
      if (value == null) {
        try {
          const item = [{id, name, image, size, price, quantity}];
          const newitem = JSON.stringify(item);
          await AsyncStorage.setItem('@StoreData', newitem);
          console.log('Data Added');
        } catch (error) {
          console.log('set 1st item error', error.message);
        }
      } else {
        const item = {id, name, image, size, price, quantity};
        const storeitems = JSON.parse(value);
        let itemexist = false;
        storeitems.map(storeitem => {
          if (storeitem.id == item.id && storeitem.size == item.size) {
            itemexist = true;
            storeitem.quantity = storeitem.quantity + item.quantity;
          }
        });
        if (!itemexist) {
          storeitems.push(item);
        }
        try {
          const newitem = JSON.stringify(storeitems);
          AsyncStorage.setItem('@StoreData', newitem);
        } catch (error) {
          console.log('new item error', error.message);
        }
      }
      props.navigation.goBack();
    } catch (error) {
      console.log('get item error', error.message);
    }
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View>
          <ImageBackground
            style={{height: moderateScale(210)}}
            source={{uri: item.image}}>
            <View style={{paddingHorizontal: moderateScale(20)}}>
              <Header
                Is_left_icon={true}
                left_icon={imgx.goBack}
                left_style={{
                  tintColor: 'white',
                  height: moderateScale(20),
                  width: moderateScale(20),
                }}
                left_onpress={() => {
                  props.navigation.goBack();
                }}
                Is_header_center={false}
                Is_right_icon={true}
                right_icon={imgx.add_to_cart}
                right_style={{
                  tintColor: 'white',
                  height: moderateScale(20),
                  width: moderateScale(20),
                }}
                right_onpress={() => {
                  props.navigation.navigate(navigationstring.ADDTOCART);
                }}
              />
            </View>
          </ImageBackground>

          <View
            style={{
              marginTop: moderateVerticalScale(20),
              marginHorizontal: moderateScale(20),
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: scale(25),
                  fontWeight: '700',
                  color: 'black',
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: scale(15),
                  fontWeight: '600',
                  color: 'black',
                }}>
                $ {price}
              </Text>
            </View>
            {itemsize ? (
              <View>
                <View
                  style={{
                    marginTop: moderateVerticalScale(10),
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{flex: 1, color: 'black', fontWeight: '600'}}>
                    Chose Your Deal
                  </Text>
                  <Text style={{color: 'orange', fontWeight: '600'}}>
                    *Required 1
                  </Text>
                </View>
                <View
                  style={{
                    paddingTop: moderateVerticalScale(20),
                    paddingRight: moderateScale(0),
                    flexDirection: 'column',
                  }}>
                  {itemsize.map((value, index) => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: moderateVerticalScale(10),
                      }}
                      onPress={() => {
                        itemlength.map((e, i) => {
                          itemlength[i] = false;
                        });

                        itemlength[index] = true;

                        updateState({
                          selected_item_type: value,
                          price: value[1],
                        });
                      }}>
                      <Image
                        style={{
                          marginRight: moderateScale(10),
                          width: moderateScale(30),
                          tintColor: 'orange',
                          height: moderateScale(30),
                        }}
                        source={
                          itemlength[index]
                            ? imgx.radio_button_on
                            : imgx.radio_button_off
                        }
                      />
                      <Text
                        style={{
                          flex: 1,
                          fontSize: scale(14),
                          fontWeight: '600',
                          color: 'black',
                        }}>
                        {value[0]}
                      </Text>
                      <Text
                        style={{
                          paddingRight: moderateScale(10),
                          fontSize: scale(14),
                          fontWeight: '600',
                          color: 'black',
                        }}>
                        ${value[1]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : (
              <View></View>
            )}
            <View style={{}}>
              <Text
                style={{
                  fontSize: scale(13),
                  fontWeight: '600',
                  color: 'black',
                }}>
                Special Instructions
              </Text>
              <TextInput
                style={{
                  color: COLORX.gray04,
                  marginTop: moderateVerticalScale(10),
                  paddingHorizontal: moderateScale(10),
                  borderWidth: 1,
                  borderRadius: scale(10),
                }}
                placeholder="Enter Instructions"
                multiline={true}
                value={instruction}
                numberOfLines={3}
                placeholderTextColor={COLORX.gray04}
                onChangeText={e => updateState({instruction: e})}
              />
            </View>
            <View>
              <TouchableOpacity
                style={{top: -10}}
                onPress={() => updateState({ShowIngredient: !ShowIngredient})}>
                <Text
                  style={{
                    paddingTop: moderateVerticalScale(20),
                    color: 'black',
                    fontSize: scale(16),
                    fontWeight: '600',
                  }}>
                  {ShowIngredient ? 'Hide ' : 'Show '}Ingredients
                </Text>
              </TouchableOpacity>
              <View style={{height: ShowIngredient ? 'auto' : 0}}>
                {item.list ? (
                  item.list.map((singleitem, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        top: '-5%',
                        paddingHorizontal: moderateScale(20),
                      }}
                      onPress={() =>
                        updateState({
                          instruction: instruction + ' ' + singleitem + ',',
                        })
                      }>
                      <Text
                        style={{
                          color: COLORX.gray04,
                          fontSize: scale(14),
                          fontWeight: '500',
                        }}>
                        {singleitem}
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View>
                    <Text
                      style={{
                        paddingHorizontal: moderateScale(20),
                        color: 'red',
                        fontWeight:"600",
                        fontSize: scale(15),
                      }}>
                      No Ingredient Data available
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View style={{top: -10}}>
              <Text
                style={{
                  paddingTop: moderateVerticalScale(20),
                  color: 'black',
                  fontSize: scale(16),
                  fontWeight: '600',
                }}>
                About {item.name}
              </Text>
              <Text
                style={{
                  color: COLORX.gray04,
                }}>
                {item.info}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          borderTopRightRadius: scale(20),
          borderTopLeftRadius: scale(20),
          paddingLeft: moderateScale(10),
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: moderateScale(10),
            paddingVertical: moderateVerticalScale(10),
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'orange',
              paddingHorizontal: moderateScale(12),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: scale(60),
            }}
            onPress={() =>
              updateState({
                quantity: quantity > 1 ? quantity - 1 : quantity,
              })
            }>
            <Text
              style={{
                color: 'white',
                fontSize: scale(25),
                fontWeight: '600',
              }}>
              -
            </Text>
          </TouchableOpacity>
          <View
            style={{
              paddingHorizontal: moderateScale(10),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: scale(15),
                fontWeight: '700',
              }}>
              {quantity}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'orange',
              paddingHorizontal: moderateScale(10),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: scale(60),
            }}
            onPress={() => updateState({quantity: quantity + 1})}>
            <Text
              style={{
                color: 'white',
                fontSize: scale(25),
                fontWeight: '600',
              }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            flex: 1,
            marginHorizontal: moderateScale(30),
            marginVertical: moderateVerticalScale(5),
            borderRadius: scale(10),
            backgroundColor: 'orange',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            if (selected_item_type.length == 2) {
              CartToken(
                item.id,
                item.name,
                item.image,
                selected_item_type[0],
                parseInt(selected_item_type[1]),
                quantity,
              );
            } else {
              alert('Please Select Size.');
            }
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: scale(15),
              color: 'white',
              fontWeight: '600',
            }}>
            Add To Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ItemDetailScreen;

const styles = StyleSheet.create({
  image_view_style: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateVerticalScale(20),
    alignItems: 'center',
    width: '100%',
    // backgroundColor:"red"
  },
});
