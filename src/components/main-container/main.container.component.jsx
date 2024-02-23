import React from 'react';
import { Notifications } from 'react-push-notification';

import NotificationButton from '../notification-button/notification.button';
import HarnessList from '../harness-list/harness.list.component';
import LookupComponent from '../lookup/lookup.component';

import "./main.container.component.scss";

const MainContainer = ({ appReducer }) => {
  return (
    <React.Fragment>
      <LookupComponent />
      <div id='harness-list-container'>
        <HarnessList />
      </div>
    </React.Fragment>
  );
}

export default MainContainer;
