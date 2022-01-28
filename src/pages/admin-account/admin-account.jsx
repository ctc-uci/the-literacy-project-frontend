import './admin-account.css';
import { React, useState } from 'react';
import AdminAccountModal from '../../components/CreateAdminModal/AdminAccountModal';

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
      <AdminAccountModal isOpen={modalIsOpen} setIsOpen={setModelOpen} />
    </div>
  );
};

export default AdminAccountView;
