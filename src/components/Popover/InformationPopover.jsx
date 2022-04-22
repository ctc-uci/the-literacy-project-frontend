import './InformationPopover.css';
import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import PropTypes from 'prop-types';
import HelpIcon from '../../assets/icons/help-icon.svg';

const InformationPopover = ({ bodyText, header }) => {
  const renderPopover = popoverText => {
    return (
      <Popover id="popover-positioned-right">
        <Popover.Header as="h3">
          <strong>{header || 'Help'}</strong>
        </Popover.Header>
        <Popover.Body dangerouslySetInnerHTML={{ __html: popoverText }} />
      </Popover>
    );
  };

  return (
    <div id="information-popover">
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderPopover(bodyText)}
      >
        <img className="information-popover__icon" src={HelpIcon} alt="Help Icon" />
      </OverlayTrigger>
    </div>
  );
};

InformationPopover.defaultProps = {
  bodyText: '',
  header: '',
};

InformationPopover.propTypes = {
  bodyText: PropTypes.string,
  header: PropTypes.string,
};

export default InformationPopover;
