import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Content, UserInfo, NavMenu, NavOption } from './styles';
import logo from '~/assets/img/logo.png';

export default function Header() {
  const { user } = useSelector((state) => state.user);
  const { name, email } = user;
  return (
    <Container>
      <Content>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>

        <NavMenu>
          <NavOption
            exact
            to="/order"
            activeClassName="active"
            className="nav-option"
          >
            Encomendas
          </NavOption>
          <NavOption
            exact
            to="/deliverymen"
            activeClassName="active"
            className="nav-option"
          >
            Entregadores
          </NavOption>
          <NavOption
            exact
            to="/recipients"
            activeClassName="active"
            className="nav-option"
          >
            Destinatários
          </NavOption>
          <NavOption
            exact
            to="/problems"
            activeClassName="active"
            className="nav-option"
          >
            Problemas
          </NavOption>
        </NavMenu>

        <UserInfo>
          <span>{name}</span>
          <small>{email}</small>
          <button type="button">sair do sistema</button>
        </UserInfo>
      </Content>
    </Container>
  );
}
