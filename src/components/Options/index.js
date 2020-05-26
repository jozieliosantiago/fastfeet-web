import React, { useState } from 'react';
import {
  MdMoreHoriz,
  MdVisibility,
  MdModeEdit,
  MdDeleteForever,
} from 'react-icons/md';
import PropTypes from 'prop-types';

import { TableData, Buttons } from './styles';

export default function Options({ onSelect, onDelete, onEdit, deleteText }) {
  const [visible, setVisible] = useState(false);

  function handleVisible() {
    const isVisible = visible;
    setVisible(!isVisible);
  }

  function viewDetails() {
    handleVisible();
    onSelect();
  }

  function handleDelete() {
    handleVisible();
    onDelete();
  }

  return (
    <TableData className="actions">
      <button type="button" onClick={handleVisible}>
        <MdMoreHoriz size={20} color="#c6c6c6" />
      </button>

      {visible && (
        <Buttons>
          {onSelect && (
            <button onClick={viewDetails} type="button">
              <MdVisibility color="#8e5be8" />
              Visualizar
            </button>
          )}
          {onEdit && (
            <button onClick={() => onEdit()} type="button">
              <MdModeEdit color="#4d85ee" />
              Editar
            </button>
          )}
          {onDelete && (
            <button onClick={handleDelete} type="button">
              <MdDeleteForever color="#de3b3b" />
              {deleteText || 'Excluir'}
            </button>
          )}
        </Buttons>
      )}
    </TableData>
  );
}

Options.propTypes = {
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  deleteText: PropTypes.string,
};

Options.defaultProps = {
  onSelect: null,
  onEdit: null,
  onDelete: null,
  deleteText: null,
};
