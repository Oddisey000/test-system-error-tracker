import React from 'react';
import addNotification from 'react-push-notification';

const NotificationButton = () => {
/*const options = {
  title: 'title',
  subtitle: 'subtitle', //optional
  message: 'message', //optional
  //onClick: (e: Event | Notification) => void, //optional, onClick callback.
  theme: 'red', //optional, default: undefined
  duration: 3000, //optional, default: 5000,
  backgroundTop: 'green', //optional, background color of top container.
  backgroundBottom: 'darkgreen', //optional, background color of bottom container.
  colorTop: 'green', //optional, font color of top container.
  colorBottom: 'darkgreen', //optional, font color of bottom container.
  closeButton: 'Go away', //optional, text or html/jsx element for close text. Default: Close,
  //native?: boolean, //optional, makes the push notification a native OS notification
  //icon?: string, // optional, Native only. Sets an icon for the notification.
  //vibrate?: number | number[], // optional, Native only. Sets a vibration for the notification.
  //silent?: boolean // optional, Native only. Makes the notification silent.
};*/
const buttonClick = () => {
  setInterval(() => {
    addNotification({
      title: 'Warning, the error wich you tracking appears',
      subtitle: 'Specific error occured',
      message: 'Error X54RCD2 on Table BX01',
      theme: 'red',
      duration: 10000, //optional, default: 5000,
      native: true, // when using native, your OS will handle theming.
      autoCancel: false, // (optional) default: true
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
    });
  }, 20000);
  addNotification({
    title: 'Warning, the error wich you tracking appears',
    subtitle: 'Specific error occured',
    message: 'Error X54RCD2 on Table BX01',
    theme: 'red',
    duration: 10000, //optional, default: 5000,
    native: true, // when using native, your OS will handle theming.
    autoCancel: false, // (optional) default: true
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
  });
};

  return (
    <div className="page">
        <button onClick={buttonClick} className="button">
          Hello world.
        </button>
    </div>
  );
}

export default NotificationButton;