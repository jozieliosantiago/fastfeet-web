import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

import signature from '~/assets/img/signature.png';

export default function Details({ details }) {
  const { recipient } = details;
  const { street, number, city, state, zip_code } = recipient;

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
          <strong>Retirada: </strong>25/01/2020
        </p>
        <p>
          <strong>Entrega: </strong>25/01/2020
        </p>
      </div>

      <div>
        <h4>Assinatura do destinatário</h4>
        <img src={signature} alt="" />
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
