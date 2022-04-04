import React from 'react';
import PropTypes from 'prop-types';
import { Email, Item, A } from 'react-html-email';

const InviteEmail = ({ url }) => {
  return (
    <Email title="admin-invite">
      <Item>
        Welcome to TLP. Click <A href={url}>here</A> to finish setting up your account.
      </Item>
    </Email>
  );
};

InviteEmail.propTypes = {
  url: PropTypes.string.isRequired,
};

export default InviteEmail;
