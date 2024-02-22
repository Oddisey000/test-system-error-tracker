import React from 'react';
import { connect } from "react-redux";
import { Notifications } from 'react-push-notification';

import NotificationButton from '../notification-button/notification.button';
import HarnessList from '../harness-list/harness.list.component';
import LookupComponent from '../lookup/lookup.component';

import "./main.container.component.scss";

const MainContainer = () => {
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