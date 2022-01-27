import './admin-create.css';
import { React, useState } from 'react';
import CreateAdminConfirmationModal from '../../components/CreateAdminConfirmationModal/CreateAdminConfirmationModal';

const AdminCreateView = () => {
  const [modalIsOpen, setModalOpen] = useState(false);
  // console.log('modalIsOpen is');
  // console.log(modalIsOpen);
  // console.log('SetModalOpen is');
  // console.log(setModalOpen);

  return (
    <>
      <div className="admin-create-view">
        <div className="create-admin-button-container">
          <button
            className="create-admin-button"
            type="button"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Create Admin
          </button>
        </div>
        <div>
          <CreateAdminConfirmationModal isOpen={modalIsOpen} setIsOpen={setModalOpen} />
          {/* <div>This is the admin create view</div> */}
        </div>
      </div>
    </>
  );
};

export default AdminCreateView;
