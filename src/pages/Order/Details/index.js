import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Details({ details }) {
  const { recipient, start_date, end_date, signature } = details;
  const { street, number, city, state, zip_code } = recipient;
  const url = signature ? signature.url : null;

  const startDate = start_date
    ? new Date(start_date).toLocaleDateString('pt-BR')
    : null;

  const endDate = end_date
    ? new Date(end_date).toLocaleDateString('pt-BR')
    : null;

  return (
    <Container>
      <div>
        <h4>Informações da encomenda</h4>
        <p>
          {street}, {number}
        </p>
        <p>
          {city} - {state}
        </p>
        <p>{zip_code}</p>
      </div>

      <div>
        <h4>Datas</h4>
        <p>
          <strong>Retirada: </strong>
          {startDate || <span>Não informado</span>}
        </p>
        <p>
          <strong>Entrega: </strong>
          {endDate || <span>Não informado</span>}
        </p>
      </div>

      <div>
        <h4>Assinatura do destinatário</h4>
        {url ? (
          <img src={`http://${url}`} alt="assinatura" />
        ) : (
          <h6>Sem assinatura</h6>
        )}
      </div>
    </Container>
  );
}

Details.propTypes = {
  details: PropTypes.object,
};

Details.defaultProps = {
  details: null,
};
