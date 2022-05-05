import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  applyActionCode,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { nanoid } from 'nanoid';
import { cookieKeys, cookieConfig, clearCookies } from './cookie_utils';
import InviteEmail from '../../components/InviteEmail/InviteEmail';
import LoginEmail from '../../components/LoginEmail/LoginEmail';
import { TLPBackend, auth, sendEmail } from '../utils';
import { AUTH_ROLES, USER_STATUS } from '../config';

const { ADMIN_ROLE, USER_ROLE } = AUTH_ROLES;

/**
 * Makes requests to add user to NPO DB. Deletes user if Firebase error
 * @param {string} role
 * @param {string} email
 * @param {string} password
 * @param {string} firebaseId
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} phoneNumber
 */
const createUserInDB = async (
  role,
  email,
  password,
  firebaseId,
  firstName,
  lastName,
  phoneNumber,
  inviteId,
) => {
  try {
    const body = {
      firebaseId,
      firstName,
      lastName,
      phoneNumber,
      email,
      inviteId,
    };
    if (role === ADMIN_ROLE) {
      await TLPBackend.post('/admins', body);
    } else if (role === USER_ROLE) {
      await TLPBackend.post('/teachers', body);
    }
  } catch (err) {
    // Since this route is called after user is created in firebase, if this
    // route errors out, that means we have to discard the created firebase object
    await signInWithEmailAndPassword(auth, email, password);
    const userToBeTerminated = await auth.currentUser;
    userToBeTerminated.delete();
    throw new Error(err.message);
  }
};

/**
 * Logs a user in with email and password
 * @param {string} email The email to log in with
 * @param {string} password The password to log in with
 * @param {string} redirectPath The path to redirect the user to after logging out
 * @param {hook} navigate An instance of the useNavigate hook from react-router-dom
 * @param {Cookies} cookies The user's cookies to populate
 * @returns A boolean indicating whether or not the log in was successful
 */
const logInWithEmailAndPassword = async (email, password, redirectPath, navigate, cookies) => {
  await signInWithEmailAndPassword(auth, email, password);
  // Check if the user has verified their email.
  if (!auth.currentUser.emailVerified) {
    throw new Error('Please verify your email before logging in.');
  }

  const user = await TLPBackend.get(`/tlp-users/${auth.currentUser.uid}`);
  // if user status is inactive, they cannot log in
  if (user.data.active !== USER_STATUS.ACTIVE) {
    throw new Error(
      'Your account is currently not active. Please contact administration for more information.',
    );
  }

  cookies.set(cookieKeys.ACCESS_TOKEN, auth.currentUser.accessToken, cookieConfig);
  cookies.set(cookieKeys.POSITION, user.data.position, cookieConfig);
  // this is userId from the database, not the firebase ID
  cookies.set(cookieKeys.USER_ID, user.data.userId, cookieConfig);
  navigate(redirectPath);
};

/**
 * Sends a password reset email given an email
 * @param {string} email The email to resend password to
 */
const sendPasswordReset = async email => {
  await sendPasswordResetEmail(auth, email);
};

/**
 * Generates a new invite link for user and stores all related information
 * to create the account after invite has been processed.
 * @param {string} position should only be ADMIN
 * @param {string} email email to be associated with account
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} phoneNumber
 */
const sendInviteLink = async (position, email, firstName, lastName, phoneNumber) => {
  const inviteId = nanoid();
  const url = `${process.env.REACT_APP_FRONTEND_HOST}:${process.env.REACT_APP_FRONTEND_PORT}/emailAction?mode=inviteUser&inviteID=${inviteId}`;

  try {
    await TLPBackend.post(`tlp-users/new-invite`, {
      inviteId,
      email,
      position,
      firstName,
      lastName,
      phoneNumber,
    });

    await sendEmail(email, <InviteEmail url={url} />);
  } catch (err) {
    // catch potential error of email being invalid format
    // remove invite from invite table in backend
    // propagate up error message
    await TLPBackend.delete(`tlp-users/invite/${inviteId}`);
    throw new Error(err.message);
  }
};

/**
 * Sends email to given email with link to the login page
 * @param {string} email email to be associated with account
 */
const sendLoginLink = async email => {
  const url = `${process.env.REACT_APP_FRONTEND_HOST}:${process.env.REACT_APP_FRONTEND_PORT}/login`;

  try {
    await sendEmail(email, <LoginEmail url={url} />);
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Calls backend to retrieve data linked to invite
 * Create account in FireBase and Database
 * @param {string} inviteId The inviteId from invite email
 * @param {string} password New password for account
 */
const finishAccountSetUp = async (inviteId, password) => {
  const res = await TLPBackend.post(`tlp-users/complete-creation`, { inviteId, password });
  const { data } = res;
  await createUserInDB(
    data.position,
    data.email,
    password,
    data.firebaseId,
    data.firstName,
    data.lastName,
    data.phoneNumber,
    inviteId,
  );
};

/**
 * Completes the password reset process, given a confirmation code and new password
 * @param {string} code The confirmation code sent via email to the user
 * @param {string} newPassword The new password
 */
const confirmNewPassword = async (code, newPassword) => {
  await confirmPasswordReset(auth, code, newPassword);
};

/**
 * Applies a verification code sent to the user by email or other out-of-band mechanism.
 * Updates the user's active status in the backend
 * @param {string} code The confirmation code sent via email to the user
 */
const confirmVerifyEmail = async code => {
  await applyActionCode(auth, code);
};

/**
 * Logs a user out
 * @param {string} redirectPath The path to redirect the user to after logging out
 * @param {hook} navigate An instance of the useNavigate hook from react-router-dom
 */
const logout = async (redirectPath, navigate, cookies) => {
  await signOut(auth);
  clearCookies(cookies);
  navigate(redirectPath);
};

/**
 * Updates user password
 * @param {string} currPassword User's current password
 * @param {string} newPassword User's new password
 */
const updateUserPassword = async (currPassword, newPassword) => {
  const currUser = auth.currentUser;
  await signInWithEmailAndPassword(auth, currUser.email, currPassword);
  const credential = EmailAuthProvider.credential(currUser.email, currPassword);
  reauthenticateWithCredential(currUser, credential).then(({ user }) => {
    try {
      updatePassword(user, newPassword);
    } catch (err) {
      throw new Error(err.message);
    }
  });
};

export {
  useNavigate,
  logInWithEmailAndPassword,
  sendPasswordReset,
  logout,
  sendInviteLink,
  sendLoginLink,
  confirmNewPassword,
  confirmVerifyEmail,
  finishAccountSetUp,
  updateUserPassword,
};
