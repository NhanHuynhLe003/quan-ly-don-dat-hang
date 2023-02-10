import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ConfirmDeleteModal({idCustomer, handleDeleteSubmit}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleDelete = () => setShow(true);
    

  return (
    <>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn Có Chắc Chắn Xóa</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Hủy
          </Button>
          <form onSubmit={e => handleDeleteSubmit(e, idCustomer)}>
            <Button type='submit' variant="danger" onClick={handleClose}>
                Xóa
            </Button>
          </form>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

