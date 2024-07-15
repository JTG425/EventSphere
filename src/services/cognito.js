import AWS from 'aws-sdk';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

AWS.config.region = 'us-east-1';

const poolData = {
  UserPoolId: 'us-east-1_UEKgc3xWn',
  ClientId: '7apecnshtv84m3u1us0p8kklt4',
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
  const cognitoUserData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(cognitoUserData);

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

  const cognitoUserData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(cognitoUserData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        localStorage.setItem('cognitoUser', JSON.stringify({ username }));
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
    localStorage.removeItem('cognitoUser');
  }
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('cognitoUser'));
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const signOutAndClearStorage = () => {
  signOut();
  clearLocalStorage();
};

export const getIdentityId = async () => {
  const user = getCurrentUser();
  if (!user) {
      throw new Error('No authenticated user found');
  }
  return user.username;
};
