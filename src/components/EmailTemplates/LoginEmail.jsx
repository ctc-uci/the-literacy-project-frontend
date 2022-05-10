import React from 'react';
import PropTypes from 'prop-types';
import { Email, Item, A } from 'react-html-email';

// this email goes to Master Teachers with a link to the login page
const LoginEmail = ({ url }) => {
  return (
    <Email title="mt-invite">
      <Item>
        Welcome to TLP. Click <A href={url}>here</A> to navigate to the login page.
      </Item>
    </Email>
  );
};

LoginEmail.propTypes = {
  url: PropTypes.string.isRequired,
};

export default LoginEmail;
