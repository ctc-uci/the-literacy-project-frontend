import React from 'react';
import { useParams } from 'react-router-dom';
import ViewEditSite from '../../components/ViewEditSite/ViewEditSite';

const ViewEditSitePage = () => {
  const { siteId } = useParams();

  return (
    <div>
      <ViewEditSite siteId={Number.parseInt(siteId, 10)} />
    </div>
  );
};

export default ViewEditSitePage;
