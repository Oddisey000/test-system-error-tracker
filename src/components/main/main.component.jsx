import React from 'react';
import { Notifications } from 'react-push-notification';

import NotificationButton from '../notification-button/notification.button';

const Main = () => {
  return (
    <React.Fragment>
      <Notifications />
      <div className="row">
        <div className="content">
          Hello world.
        </div>
        <NotificationButton />
      </div>
    </React.Fragment>
  );
}

export default Main;