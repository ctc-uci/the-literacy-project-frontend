import React from 'react';
import PropTypes from 'prop-types';
import InformationPopover from '../Popover/InformationPopover';

const TableHead = ({ item }) => {
  const renderPopover = headerPopover => {
    if (headerPopover) return <InformationPopover bodyText={headerPopover} />;
    return null;
  };

  return (
    <td title={item.headerTitle} style={{ height: '20px' }}>
      {item.headerTitle} {renderPopover(item.headerPopover)}
    </td>
  );
};

TableHead.defaultProps = {
  item: {},
};

TableHead.propTypes = {
  item: PropTypes.shape({
    headerTitle: PropTypes.string,
    headerPopover: PropTypes.string,
  }),
};

export default TableHead;
