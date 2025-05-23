import React from 'react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Delete</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p className="mb-0">
              Are you sure you want to delete "<strong>{taskTitle}</strong>"? 
              This action cannot be undone.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              <i className="bi bi-x-circle me-2"></i>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
            >
              <i className="bi bi-trash me-2"></i>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;