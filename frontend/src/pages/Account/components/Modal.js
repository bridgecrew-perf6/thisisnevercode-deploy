import React from 'react';

function Modal({ showModal, setShowModal }) {
  return <div className='Modal'>{showModal ? <div></div> : null}</div>;
}

export default Modal;
