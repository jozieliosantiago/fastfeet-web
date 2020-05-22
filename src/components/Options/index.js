import React, { useState } from 'react';
import {
  MdMoreHoriz,
  MdVisibility,
  MdModeEdit,
  MdDeleteForever,
} from 'react-icons/md';
import PropTypes from 'prop-types';

import { TableData, Buttons } from './styles';

export default function Options({ onSelect, onDelete, onEdit }) {
  const [visible, setVisible] = useState(false);

  function handleVisible() {
    const isVisible = visible;
    setVisible(!isVisible);
  }

  function viewDetails() {
    handleVisible();
    onSelect();
  }

  function deleteOrder() {
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
          <button onClick={() => onEdit()} type="button">
            <MdModeEdit color="#4d85ee" />
            Editar
          </button>
          <button onClick={deleteOrder} type="button">
            <MdDeleteForever color="#de3b3b" />
            Excluir
          </button>
        </Buttons>
      )}
    </TableData>
  );
}

Options.propTypes = {
  onSelect: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

Options.defaultProps = {
  onSelect: null,
};
