import React from 'react';

const ConfirmModal = ({ isOpen, onCancel, onConfirm, message }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="btn btn-cancel">Cancel</button>
          <button onClick={onConfirm} className="btn btn-confirm">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
