import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import React from 'react';

const CustomModal = (props) => {
  const { title, body, footer, isOpen, setModalOpen } = props;
  return (
    <Modal isOpen={isOpen}>
      <div className="modal-header">
        <h5 className="modal-title font-weight-bold" id="exampleModalLabel">
          {title}
        </h5>
        <button aria-label="Close" className="close" type="button" onClick={() => setModalOpen(false)}>
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </Modal>
  );
};

export default CustomModal;
