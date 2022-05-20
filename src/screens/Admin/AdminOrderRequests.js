import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';

const AdminOrderRequests = props => {
  const [state, setstate] = useState({
    data: [],
    apihit: false,
  });
  const {data, apihit} = state;
  const updateState = data => setstate(state => ({...state, ...data}));

  const GetOrderList = () => {
    if (!apihit) {
      const url = 'http://192.168.43.244:3000/api/v1/orders';
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
              if (item.status == 'Pending') {
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

  useEffect(() => {
    props.navigation.addListener('tabPress', e => {
      updateState({data: []});
      GetOrderList();
    });

    props.navigation.addListener('focus', e => {
      updateState({data: []});
      GetOrderList();
    });
    GetOrderList();
  }, [apihit]);
  return (
    <View>
      {data.map((item, index) => (
        <View key={index} style={{flexDirection: 'row'}}>
          <Text style={{color: 'black'}}>{index} </Text>
          <Text style={{color: 'black'}}>{item.status}</Text>
        </View>
      ))}
    </View>
  );
};

export default AdminOrderRequests;
