import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import { TLPBackend } from '../../common/utils';

const TeacherTableSiteCell = ({ teacherId, item }) => {
  const [siteList, setSiteList] = useState(item);

  // remove a site from the teacher site relation
  const deleteSite = async (siteId, index) => {
    try {
      await TLPBackend.put(`teachers/remove-site/${teacherId}`, { siteId });
      setSiteList(siteList.filter((data, i) => i !== index));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {siteList.map((site, index) => (
        <Badge
          key={site.siteId}
          bg="dark"
          style={{ cursor: 'pointer', marginLeft: '0.5em' }}
          onClick={() => deleteSite(site.siteId, index)}
        >
          {site.siteName}
          <FaTrashAlt color="red" cursor="pointer" style={{ marginLeft: '0.5em' }} />
        </Badge>
      ))}
    </>
  );
};

TeacherTableSiteCell.propTypes = {
  teacherId: PropTypes.number.isRequired,
  item: PropTypes.arrayOf(
    PropTypes.shape({
      siteId: PropTypes.number.isRequired,
      siteName: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TeacherTableSiteCell;
