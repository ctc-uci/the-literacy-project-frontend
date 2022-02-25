import './sites-create.css';
import React from 'react';
import { Link } from 'react-router-dom';

import CreateSiteModal from '../../components/CreateSite/CreateSiteModal';

const SitesCreateView = () => {
  // placeholder, until replace with prop
  const area = 'Irvine School District';
  return (
    <div>
      <p className="routing offset-1">
        <Link to="/area-management" className="link">
          Area
        </Link>
        / {/* filler for now */}
        <Link to="/sites" className="link">
          {area}
        </Link>
        / Create New Site
      </p>
      <CreateSiteModal />
    </div>
  );
};

export default SitesCreateView;
