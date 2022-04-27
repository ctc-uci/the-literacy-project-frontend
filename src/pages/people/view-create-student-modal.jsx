import { React, useState } from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
// import EditStudentGroupModal from '../../components/EditStudentGroupModal/EditStudentGroupModal';
import CreateStudentModal from '../../components/CreateStudentModal/CreateStudentModal';

const ViewCreateStudentModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  // <EditStudentGroupModal studentGroupId={4} isOpen={isOpen} setIsOpen={setIsOpen} />
  // <CreateStudentModal siteId={18} teacherId={69} isOpen={isOpen} setIsOpen={setIsOpen} />

  return (
    <div>
      <NavigationBar />
      <CreateStudentModal siteId={20} teacherId={111} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default ViewCreateStudentModal;
