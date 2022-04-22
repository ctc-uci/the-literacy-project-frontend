import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { renderEmail } from 'react-html-email';
import { cookieKeys, cookieConfig } from './auth/cookie_utils';

const baseURL = `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`;

const TLPBackend = axios.create({
  baseURL,
  withCredentials: true,
});

// Converts JS Date object into string, formatted MM/DD/YYYY
const formatDate = value => {
  return value.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
};

// capitalizes first letter of a string
export const capitalize = s => {
  return s[0].toUpperCase() + s.slice(1);
};

// formats school year into startYear-endYear where endYear is one year later
export const formatSchoolYear = startYear => {
  return `${startYear}-${startYear - 1999}`;
};

// turns military time HH:MM:SS into standard time HH:MM AA
export const parseTime = dateString => {
  // eslint-disable-next-line prefer-const
  let [hour, minute] = dateString.split(':');
  const suffix = hour >= 12 ? 'PM' : 'AM';
  hour = ((Number(hour) + 11) % 12) + 1;
  return `${hour}:${minute} ${suffix}`;
};

// calculate the attitudinal and academic pre and post average scores
export const calculateScores = data => {
  const attitudinalPossible = 80;
  const academicPossible = 93;
  const attitudinal = {
    pre: 0,
    preCount: 0,
    post: 0,
    postCount: 0,
  };
  const academic = {
    pre: 0,
    preCount: 0,
    post: 0,
    postCount: 0,
  };
  const scores = {};

  // remains false if no students in data has non-null pretest scores
  let hasData = false;

  data.forEach(student => {
    // if array is not null, get sum and divide by corresponding total possible
    if (student.pretestR !== null) {
      hasData = true;
      attitudinal.pre +=
        student.pretestR.reduce((prev, curr) => prev + curr, 0) / attitudinalPossible;
      attitudinal.preCount += 1;

      // only get student's post score if they have pre-scores
      if (student.posttestR !== null) {
        academic.post +=
          student.posttestR.reduce((prev, curr) => prev + curr, 0) / attitudinalPossible;
        academic.postCount += 1;
      }
    }

    if (student.pretestA !== null) {
      hasData = true;
      academic.pre += student.pretestA.reduce((prev, curr) => prev + curr, 0) / academicPossible;
      academic.preCount += 1;

      if (student.posttestA !== null) {
        academic.post +=
          student.posttestA.reduce((prev, curr) => prev + curr, 0) / academicPossible;
        academic.postCount += 1;
      }
    }
  });

  if (hasData) {
    // if counts are 0, return scores of 0. otherwise, calculate average
    scores.pre = [
      attitudinal.preCount ? attitudinal.pre / attitudinal.preCount : 0,
      academic.preCount ? academic.pre / academic.preCount : 0,
    ];
    scores.post = [
      attitudinal.postCount ? attitudinal.post / attitudinal.postCount : 0,
      academic.postCount ? academic.post / academic.postCount : 0,
    ];
  }
  return scores;
};

export const sendEmail = async (email, htmlMessage) => {
  try {
    await TLPBackend.post('/send-email', { email, htmlMessage: renderEmail(htmlMessage) });
  } catch (err) {
    throw new Error(err.message);
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

// Using Firebase Web version 9
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const refreshUrl = `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_APIKEY}`;

/**
 * Sets a cookie in the browser
 * @param {string} key key for the cookie
 * @param {string} value value for the cookie
 * @param {cookieConfig} config cookie config to use
 */
const setCookie = (key, value, config) => {
  let cookie = `${key}=${value}; max-age=${config.maxAge}; path=${config.path}`;
  if (config.domain) {
    cookie += `; domain=${config.domain}`;
  }
  if (config.secure) {
    cookie += '; secure';
  }
  document.cookie = cookie;
};

/**
 * Returns the current user synchronously
 * @param {Auth} authInstance
 * @returns The current user (or undefined)
 */
const getCurrentUser = authInstance =>
  new Promise((resolve, reject) => {
    const unsubscribe = authInstance.onAuthStateChanged(
      user => {
        unsubscribe();
        resolve(user);
      },
      err => {
        reject(err);
      },
    );
  });

// Refreshes the current user's access token by making a request to Firebase
export const refreshToken = async () => {
  const currentUser = await getCurrentUser(auth);
  if (currentUser) {
    const refreshT = currentUser.refreshToken;
    const {
      data: { access_token: idToken },
    } = await axios.post(refreshUrl, {
      grant_type: 'refresh_token',
      refresh_token: refreshT,
    });
    // Sets the appropriate cookies after refreshing access token
    setCookie(cookieKeys.ACCESS_TOKEN, idToken, cookieConfig);
    const user = await TLPBackend.get(`/tlp-users/${auth.currentUser.uid}`);
    setCookie(cookieKeys.POSITION, user.data.position, cookieConfig);
    setCookie(cookieKeys.USER_ID, user.data.userId, cookieConfig);
    return idToken;
  }
  return null;
};

/**
 * Adds an axios interceptor for auth to given axiosInstance
 * @param {AxiosInstance} axiosInstance instance of axios to apply interceptor to
 */
const addAuthInterceptor = axiosInstance => {
  // This response interceptor will refresh the user's access token using the refreshToken helper method
  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      if (error.response) {
        const { status, data } = error.response;
        switch (status) {
          case 400:
            // check if 400 error was token
            if (data === '@verifyToken no access token') {
              // token has expired;
              try {
                // attempting to refresh token;
                await refreshToken();
                // token refreshed, reattempting request;
                const { config } = error.response;
                // configure new request in a new instance;
                return await axios({
                  method: config.method,
                  url: `${config.baseURL}${config.url}`,
                  data: config.data,
                  params: config.params,
                  headers: config.headers,
                  withCredentials: true,
                });
              } catch (e) {
                return Promise.reject(e);
              }
            } else {
              return Promise.reject(error);
            }
          default:
            return Promise.reject(error);
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return Promise.reject(error);
      } else {
        // Something happened in setting up the request that triggered an Error
        return Promise.reject(error);
      }
    },
  );
};

const reloadPage = () => window.location.reload();

addAuthInterceptor(TLPBackend);

export { auth, TLPBackend, formatDate, reloadPage, scrollToTop };
