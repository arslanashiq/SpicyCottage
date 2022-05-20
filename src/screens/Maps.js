import {View, Text,PermissionsAndroid} from 'react-native';
import React, {useEffect,useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
// import MapView from 'react-native-maps';

const Maps = () => {
    const [longitude, setlongitude] = useState('')
    const [latitude, setlatitude] = useState('')
  useEffect(() => {
     
      Geolocation.getCurrentPosition((position)=>{
          console.log(position)
          setlongitude(position.coords.longitude);
          setlatitude(position.coords.latitude);
      },
      (error)=>{
          console.log(error.message)
      },
      {
          enableHighAccuracy:false,
          timeout:10000,
      }
      )

  }, []) 

  useEffect(() => {
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
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  return (
    <View></View>
  );
};

export default Maps;
