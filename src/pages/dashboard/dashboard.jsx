import React from 'react';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies, cookieKeys } from '../../common/auth/cookie_utils';
import { AUTH_ROLES } from '../../common/config';
import AreaManagement from '../area-management/area-management';
import MasterTeacherView from '../master-teacher/master-teacher';

const DashboardView = ({ cookies }) => {
  const role = cookies.get(cookieKeys.POSITION);
  if (role === AUTH_ROLES.ADMIN_ROLE) {
    return <AreaManagement />;
  }
  return <MasterTeacherView />;
};

DashboardView.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(DashboardView);
