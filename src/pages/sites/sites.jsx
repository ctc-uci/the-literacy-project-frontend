import React from 'react';
import './sites.css';
import CreationPageTabs from '../../components/CreationPageTabs/CreationPageTabs';
import Table from '../../components/Table/Table';

const SiteView = () => {
  const theadData = ['Name', 'Schools', 'Status'];
  const tbodyData = [
    {
      name: 'Test Name',
      school: 'Test School',
      status: 'Active',
    },
  ];
  return (
    <div>
      <CreationPageTabs />
      <Table theadData={theadData} tbodyData={tbodyData} />
      <h1 className="site-view">Site View</h1>
    </div>
  );
};

export default SiteView;
