import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let Token = await AsyncStorage.getItem('fcmToken');
  console.log(Token, ' The old Token');
  if (!Token) {
    try {
      const FCMToken = await messaging().getToken();
      if (FCMToken) {
        console.log(FCMToken, ' New Token');
        await AsyncStorage.setItem('fcmToken', FCMToken);
      }
    } catch (error) {
      console.log(error.message, ' Error From FCM Token');
    }
  }
};

export const notificationListner = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });
messaging().onMessage(async remoteMessage=>{
    console.log("Recieve in foreground ",remoteMessage)
})
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};
