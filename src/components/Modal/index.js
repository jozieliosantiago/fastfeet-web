import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const modal = document.getElementById('modal');

const div = document.createElement('div');

export default function Modal({ children, visible, onCacel }) {
  useEffect(() => {
    modal.appendChild(div);
    if (visible) {
      modal.setAttribute('style', 'display: flex');
      document.body.style.overflow = 'hidden';
    } else {
      modal.setAttribute('style', 'display: none');
      document.body.style.overflow = 'auto';
    }

    modal.style.top = `${window.pageYOffset}px`;
  }, [visible]);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) onCacel();
  });

  return <>{visible && ReactDOM.createPortal(children, div)}</>;
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  visible: PropTypes.bool.isRequired,
  onCacel: PropTypes.func.isRequired,
};
