import { React, useState, useEffect } from 'react';
import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';
import ManagementDataSection from '../ManagementDataSection/ManagementDataSection';
import { TLPBackend } from '../../common/utils';

const SitesTable = () => {
  const areaId = 3;

  const theadData = [
    {
      headerTitle: 'Status',
      headerPopover:
        "<p><strong style='color:#28a745'>Active:</strong> This user is active in the current cycle. They have full access and can log in.</p> <p><strong style='color:#5f758d'>Inactive:</strong> This user is inactive in the current cycle. They cannot log in until an admin user reactivates their account.</p> <p><strong style='color:#17a2b8'>Email Sent:</strong> An email sign up link was sent. They have not set up their account yet.",
    },
    {
      headerTitle: 'Site Name',
      headerPopover: '',
    },
    {
      headerTitle: 'Master Teacher',
      headerPopover: '',
    },
    {
      headerTitle: 'Site Notes',
      headerPopover: '',
    },
    {
      headerTitle: 'Site Info',
      headerPopover: '',
    },
  ];

  // dummy data for now
  // const sites = [
  //   {
  //     siteName: 'Lakeside Middle School',
  //     masterTeachers: [],
  //     status: 'Active',
  //   },
  //   {
  //     siteName: 'Irvine Elementary School',
  //     masterTeachers: ['Harry Potter', 'Hermione Granger'],
  //     status: 'Sent',
  //   },
  // ];

  const [sites, setSites] = useState([]);
  const getSites = async () => {
    const { data: siteData } = await TLPBackend.get('/sites');
    const areaSites = siteData.filter(s => s.areaId === areaId);
    // return areaSites;
    setSites(areaSites);
  };

  useEffect(getSites, []);
  // console.log(sites);

  // const [teachersList, setTeachers] = useState([]);
  const getTeachers = async siteId => {
    const { data: teachers } = await TLPBackend.get('/teachers');
    const siteTeachers = teachers.filter(t => {
      // console.log(t);
      return t.sites && t.sites.includes(siteId);
    });
    // setTeachers(siteTeachers); // DANGER DO NOT UNCOMMENT
    console.log(siteTeachers);
  };

  // getTeachers(5).then(result => console.log(result));
  useEffect(async () => {
    await getTeachers(5);
  }, []);

  const [currStatus, setCurrStatus] = useState('Active');
  const statusChoices = ['Active', 'Inactive', 'Sent'];
  const statusDropdown = (
    // TODO: Add a function to map each site's dropdown to its own active status instead of shared common state var
    <DropdownMenu choices={statusChoices} current={currStatus} setFn={setCurrStatus} />
  );

  let i = 1;
  const tbodyData = sites.map(s => {
    const additionalInfo = (
      <button type="button" className="btn btn-primary">
        View Info
      </button>
    );
    const siteNotes = (
      <button type="button" className="btn btn-primary">
        View Note
      </button>
    );
    // let b;
    // getTeachers(s.siteId);
    // console.log(teachersList);
    // if (teachersList.length === 0) {
    //   b = 'No Teacher Assigned';
    // } else {
    //   console.log(teachersList.map(t => `${t.firstName} ${t.lastName}`));
    //   b = teachersList.map(t => `${t.firstName} ${t.lastName}`).join(' ');
    // }
    const teachers = s.primaryContactInfo.firstName + s.primaryContactInfo.lastName;

    // let teachers = getTeachers(s.siteId);
    i += 1;
    return {
      id: i,
      items: [statusDropdown, s.siteName, teachers, siteNotes, additionalInfo],
    };
  });

  return <ManagementDataSection theadData={theadData} tbodyData={tbodyData} />;
};

export default SitesTable;
