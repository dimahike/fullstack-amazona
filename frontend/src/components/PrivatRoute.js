import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivatRoute = ({ component: Component, ...rest }) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <Route
      {...rest}
      render={(props) => (userInfo ? <Component {...props} /> : <Redirect to="/signin" />)}
    />
  );
};

export default PrivatRoute;
