import { React } from 'react';
import { PropTypes } from 'prop-types';
import AccountInformationEditView from './accountInformationEdit';

const TeacherSettingsEditView = ({ userInfo, userId, role }) => {
  return (
    <div>
      <AccountInformationEditView userInfo={userInfo} userId={userId} role={role} />
      {/* TODO: Accessibility - default text or larger text section */}
    </div>
  );
};

TeacherSettingsEditView.propTypes = {
  userInfo: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  userId: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
};

export default TeacherSettingsEditView;
