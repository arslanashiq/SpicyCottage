import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import { moderateVerticalScale ,moderateScale,scale} from 'react-native-size-matters';
import { font } from '../constants/font';

const DATA = [
  {
    id: '1',
    title: 'Burger',
    price: 200,
    image:
      'https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-4-500x375.jpg',
  },
  {
    id: '2',
    title: 'Shwarma',
    price: 150,
    image:
      'https://www.bylena.com/images/uploaded/600x_Shaorma-de-casa-336.jpg',
  },
  {
    id: '3',
    title: 'Pizza',
    price: '900',
    image:'https://static.toiimg.com/photo/msid-87930581/87930581.jpg?211826',
  },
];

const Item = ({image, title, price}) => (
  <View style={styles.item_container}>
    <Image
      style={styles.image}
      source={{
        uri: image,
      }}
    />
    <Text style={styles.text}>{title}</Text>
    <Text style={styles.text}>{price}</Text>
  </View>
);

const MyFlatListForHome = ({
  myheader,
  // ...props
}) => {
  const renderItem = ({item}) => (
    <Item image={item.image} title={item.title} price={item.price} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text
          style={{
            paddingHorizontal:moderateScale(10),
            fontSize: scale(font.heading_font),
            fontWeight: '500',
            color: 'black',
          }}>
          {myheader}
        </Text>
      </View>
      <FlatList
        horizontal={true}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        // {...props}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: StatusBar.currentHeight || 0,
    marginTop:60,
  },
  item_container: {
    backgroundColor: 'orange',
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,

  },
  image: {
    height: 150,
    width: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 10,
    color: 'black',
  },
});

export default MyFlatListForHome;
