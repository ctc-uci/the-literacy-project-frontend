import { React, useState } from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import EditStudentGroupModal from '../../components/EditStudentGroupModal/EditStudentGroupModal';

const ViewEditStudentGroupModalView = () => {
  const [isOpen, setIsOpen] = useState(true);
  // <EditStudentGroupModal studentGroupId={4} isOpen={isOpen} setIsOpen={setIsOpen} />
  // <CreateStudentModal siteId={18} teacherId={69} isOpen={isOpen} setIsOpen={setIsOpen} />

  return (
    <div>
      <NavigationBar />
      <EditStudentGroupModal siteId={5} studentGroupId={4} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default ViewEditStudentGroupModalView;
