import { React, useState } from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import CreateStudentGroupModal from '../../components/CreateStudentGroupModal/CreateStudentGroupModal';

const ViewCreateStudentGroupModalView = () => {
  const [isOpen, setIsOpen] = useState(true);
  // <EditStudentGroupModal studentGroupId={4} isOpen={isOpen} setIsOpen={setIsOpen} />
  // <CreateStudentModal siteId={18} teacherId={69} isOpen={isOpen} setIsOpen={setIsOpen} />

  return (
    <div>
      <NavigationBar />
      <CreateStudentGroupModal siteId={57} teacherId={106} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default ViewCreateStudentGroupModalView;
