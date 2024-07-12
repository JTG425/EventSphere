// src/services/cognito.js
import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
  } from 'amazon-cognito-identity-js';
  
  const poolData = {
    UserPoolId: 'us-east-1_UEKgc3xWn', // Your user pool id here
    ClientId: '7apecnshtv84m3u1us0p8kklt4', // Your client id here
  };
  
  const userPool = new CognitoUserPool(poolData);
  
  export const signUp = (username, password, attributeList) => {
    return new Promise((resolve, reject) => {
      userPool.signUp(username, password, attributeList, null, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  
  export const confirmSignUp = (username, code) => {
    const userData = {
      Username: username,
      Pool: userPool,
    };
  
    const cognitoUser = new CognitoUser(userData);
  
    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  
  export const signIn = (username, password) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
  
    const userData = {
      Username: username,
      Pool: userPool,
    };
  
    const cognitoUser = new CognitoUser(userData);
  
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  };
  
  export const signOut = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
  };
  