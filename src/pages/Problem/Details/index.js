import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Details({ details }) {
  const { description } = details;

  return (
    <Container>
      <div>
        <h4>Problema</h4>
        <p>{description}</p>
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
