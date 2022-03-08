import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  confirmPasswordReset,
  applyActionCode,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { cookieKeys, cookieConfig, clearCookies } from './cookie_utils';
import { TLPBackend, auth } from '../utils';
import AUTH_ROLES from './auth_config';

const { ADMIN_ROLE, USER_ROLE } = AUTH_ROLES.AUTH_ROLES;

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
) => {
  try {
    const body = {
      firebaseId,
      firstName,
      lastName,
      phoneNumber,
      email,
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
 * Creates a user in firebase database
 * @param {string} email
 * @param {string} password
 * @returns A UserCredential object from firebase
 */
const createUserInFirebase = async (email, password) => {
  const user = await createUserWithEmailAndPassword(auth, email, password);
  return user.user;
};

/**
 * Creates a user (both in firebase and database)
 * @param {string} email
 * @param {string} password
 * @param {string} role
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} phoneNumber */
const createUser = async (email, password, role, firstName, lastName, phoneNumber) => {
  const user = await createUserInFirebase(email, password);
  await createUserInDB(role, email, password, user.uid, firstName, lastName, phoneNumber);
  sendEmailVerification(user);
};

/**
 * Registers a new user using the email provider
 * @param {string} email
 * @param {string} password
 * @param {string} role
 * @param {hook} navigate An instance of the useNavigate hook from react-router-dom
 * @param {string} redirectPath path to redirect users once logged in
 */
const registerWithEmailAndPassword = async (
  email,
  password,
  role,
  firstName,
  lastName,
  phoneNumber,
  navigate,
  redirectPath,
) => {
  await createUser(email, password, role, firstName, lastName, phoneNumber);
  navigate(redirectPath);
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
  cookies.set(cookieKeys.ACCESS_TOKEN, auth.currentUser.accessToken, cookieConfig);
  const user = await TLPBackend.get(`/tlp-users/${auth.currentUser.uid}`);
  console.log(user);
  cookies.set(cookieKeys.POSITION, user.data.position, cookieConfig);
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
 * Sends password reset to new account created with stated email
 * @param {string} email The email to create an account with
 */
const sendInviteLink = async (email, role) => {
  // generate a random password (not going to be used as new account will reset password)
  const randomPassword = Math.random().toString(36).slice(-8);
  const user = await createUserInFirebase(email, randomPassword);
  createUserInDB(email, user.uid, role, false, randomPassword);
  sendPasswordReset(email);
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

export {
  useNavigate,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  sendInviteLink,
  confirmNewPassword,
  confirmVerifyEmail,
};
