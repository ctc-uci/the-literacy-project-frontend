import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import { TLPBackend } from '../../common/utils';

// GET RID OF THIS EVENTUALLY
import styles from '../ManagementDataSection/ManagementDataSection.module.css';

const CSVButton = () => {
  const [areaResponseData, setAreaResponseData] = useState([]);
  // const [siteResponseData, setSiteResponseData] = useState([]);

  const areaHeaders = ['Area ID', 'Area Name', 'Active?'];
  // const siteHeaders = [
  //   'Site ID',
  //   'Site Name',
  //   'Address Street',
  //   'Address City',
  //   'Address Zip',
  //   'Address State',
  //   'Area ID',
  // ];
  const areaData = areaResponseData.map(area => [area.areaId, area.areaName, area.active]);
  // const siteData = siteResponseData.map(site => [
  //   site.siteId,
  //   site.siteName,
  //   site.addressStreet,
  //   site.addressCity,
  //   site.addressZip,
  //   site.addressState,
  //   site.areaId,
  // ]);

  const areaCSVReport = {
    data: areaData,
    headers: areaHeaders,
    filename: 'Areas_Report.csv',
  };

  // const siteCSVReport = {
  //   data: siteData,
  //   headers: siteHeaders,
  //   filename: 'Sites_Report.csv',
  // };

  const addAssociatedSiteToArea = async resData => {
    async function fetchAllSites() {
      // eslint-disable-next-line no-restricted-syntax
      for (const element of resData) {
        TLPBackend.get(`/sites/area/${element.areaId}`)
          .then(res => {
            // eslint-disable-next-line no-param-reassign
            element.area_sites = res.data;
          })
          .catch(() => {
            /* TODO document why this arrow function is empty */
          });
      }
    }

    await fetchAllSites();
    setTimeout(() => {
      setAreaResponseData(resData);
    }, 2000);
  };

  // const addAssociatedSiteData = async resData => {
  //   async function fetchAllSites() {
  //     // eslint-disable-next-line no-restricted-syntax
  //     for (const element of resData) {
  //       TLPBackend.get(`/sites/${element.siteId}`)
  //         .then(res => {
  //           // eslint-disable-next-line no-param-reassign
  //           element.area_sites = res.data;
  //         })
  //         .catch(() => {
  //           /* TODO document why this arrow function is empty */
  //         });
  //     }
  //   }

  //   await fetchAllSites();
  //   setTimeout(() => {
  //     setSiteResponseData(resData);
  //   }, 2000);
  // };

  // function mapAreas() {
  //   return areaResponseData.map(area => {
  //     return (
  //       <AreaDropdown areaId={area.areaId} areaActive={area.active} areaName={area.areaName} />
  //     );
  //   });
  // }

  useEffect(() => {
    async function fetchAreas() {
      await TLPBackend.get('/areas')
        .then(res => {
          setTimeout(() => {
            addAssociatedSiteToArea(res.data);
          }, 1000);
        })
        .catch(() => {});
    }

    // async function fetchSites() {
    //   await TLPBackend.get('/sites').then(res => {
    //     setTimeout(() => {
    //       setSiteResponseData(res.data);
    //     }, 1000);
    //   });
    // }
    fetchAreas();
    // fetchSites();
  }, []);

  return (
    <Button className={styles['export-button']} variant="primary">
      <CSVLink {...areaCSVReport} className="csvLink">
        {/* <CSVLink {...siteCSVReport} className="csvLink"> */}
        Export to CSV
      </CSVLink>
    </Button>
  );
};

export default CSVButton;
