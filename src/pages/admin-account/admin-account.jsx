import './admin-account.css';
import { React, useState } from 'react';
import CreateAdminModal from '../../components/CreateAdminModal/CreateAdminModal';

const AdminAccountView = () => {
  const [modalIsOpen, setModelOpen] = useState(false);
  return (
    <div className="admin-account-view">
      <div className="admin-account-button-container">
        <button
          type="button"
          className="admin-account-button"
          onClick={() => {
            setModelOpen(true);
          }}
        >
          confirm
        </button>
      </div>
      <CreateAdminModal isOpen={modalIsOpen} setIsOpen={setModelOpen} />
    </div>
  );
};

export default AdminAccountView;
