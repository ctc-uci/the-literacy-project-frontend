import './sites-create.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TLPBackend } from '../../common/utils';

import CreateSiteModal from '../../components/CreateSite/CreateSiteModal';

const BackToAllSites = () => {
  window.location.replace('/sites');
};

const SitesCreateView = () => {
  // placeholder, until replace with prop
  const { areaId } = useParams();
  const [areaName, setAreaName] = useState('');

  // Gets area name from backend; sends user back if area ID is invalid
  useEffect(async () => {
    const res = await TLPBackend.get(`/areas/${areaId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(res);
    if (res.status === 200) {
      if (res.data.areaName == null || res.data.areaName === '') {
        BackToAllSites();
      }
      setAreaName(res.data.areaName);
    } else {
      BackToAllSites();
    }
  }, []);

  return (
    <div>
      <p className="routing offset-1">
        <Link to="/" className="link">
          Area{' '}
        </Link>
        / {/* filler for now */}
        <Link to="/sites" className="link">
          {areaName}{' '}
        </Link>
        / Create New Site
      </p>
      <CreateSiteModal areaId={Number.parseInt(areaId, 10)} />
      {/* <CreateSiteModal areaId={areaId} /> */}
    </div>
  );
};

export default SitesCreateView;
