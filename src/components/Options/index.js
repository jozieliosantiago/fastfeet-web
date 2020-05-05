import React, { useState } from 'react';
import {
  MdMoreHoriz,
  MdVisibility,
  MdModeEdit,
  MdDeleteForever,
} from 'react-icons/md';

import { TableData, Buttons } from './styles';

export default function Options() {
  const [visible, setVisible] = useState(false);

  function handleVisible() {
    const isVisible = visible;
    setVisible(!isVisible);
  }

  return (
    <TableData className="actions">
      <button type="button" onClick={handleVisible}>
        <MdMoreHoriz size={20} color="#c6c6c6" />
      </button>

      {visible && (
        <Buttons>
          <button type="button">
            <MdVisibility color="#8e5be8" />
            Visualizar
          </button>
          <button type="button">
            <MdModeEdit color="#4d85ee" />
            Editar
          </button>
          <button type="button">
            <MdDeleteForever color="#de3b3b" />
            Excluir
          </button>
        </Buttons>
      )}
    </TableData>
  );
}
