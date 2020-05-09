import React from 'react';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import PropTypes from 'prop-types';

import { Container, Content, Header, Form } from './styles';

export default function RegistrationForm({ back }) {
  return (
    <Container>
      <Content>
        <Header>
          <h1>Cadastro de encomendas</h1>
          <div>
            <button onClick={() => back()} className="back" type="button">
              <MdKeyboardArrowLeft size={20} />
              voltar
            </button>
            <button className="save" type="button">
              <MdCheck size={20} />
              salvar
            </button>
          </div>
        </Header>

        <Form>
          <div>
            <label htmlFor="recipient">Destinatário</label>
            <input
              list="recipient"
              type="text"
              placeholder="buscar destinatário"
            />
            <datalist id="recipient">
              <option>a</option>
              <option>a</option>
            </datalist>
          </div>
          <div>
            <label htmlFor="deliveryman">Entregador</label>
            <input
              list="deliveryman"
              type="text"
              placeholder="buscar entregador"
            />
            <datalist id="deliveryman">
              <option>b</option>
              <option>b</option>
            </datalist>
          </div>
          <div>
            <label htmlFor="product-name">Nome do produto</label>
            <input id="product-name" type="text" placeholder="produto" />
          </div>
        </Form>
      </Content>
    </Container>
  );
}

RegistrationForm.propTypes = {
  back: PropTypes.func.isRequired,
};
