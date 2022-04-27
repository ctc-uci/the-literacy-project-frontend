import { React } from 'react';
import { PropTypes } from 'prop-types';
import AccountInformationEditView from './accountInformationEdit';
import AccountInformationView from '../settings/accountInformationView';
import PasswordView from '../settings/passwordView';
import PasswordEditView from './passwordEdit';

const AdminSettingsEditView = ({
  userInfo,
  userId,
  role,
  editAccountInfoDisplay,
  editPasswordDisplay,
}) => {
  return (
    <div>
      {editAccountInfoDisplay ? (
        <AccountInformationEditView userInfo={userInfo} userId={userId} role={role} />
      ) : (
        <AccountInformationView userInfo={userInfo} />
      )}
      {editPasswordDisplay ? <PasswordEditView /> : <PasswordView userInfo={userInfo} />}
      {/* TODO: Accessibility - default text or larger text section */}
    </div>
  );
};

AdminSettingsEditView.propTypes = {
  userInfo: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  userId: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  editAccountInfoDisplay: PropTypes.bool.isRequired,
  editPasswordDisplay: PropTypes.bool.isRequired,
};

export default AdminSettingsEditView;
