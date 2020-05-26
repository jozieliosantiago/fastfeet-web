import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, UserInfo, NavMenu, NavOption } from './styles';
import logo from '~/assets/img/logo.png';

export default function Header() {
  const { user } = useSelector((state) => state.user);
  const { name, email } = user;
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>

        <NavMenu>
          <NavOption
            to="/order"
            activeClassName="active"
            className="nav-option"
          >
            Encomendas
          </NavOption>
          <NavOption
            to="/deliverymen"
            activeClassName="active"
            className="nav-option"
          >
            Entregadores
          </NavOption>
          <NavOption
            to="/recipient"
            activeClassName="active"
            className="nav-option"
          >
            Destinatários
          </NavOption>
          <NavOption
            to="/problem"
            activeClassName="active"
            className="nav-option"
          >
            Problemas
          </NavOption>
        </NavMenu>

        <UserInfo>
          <span>{name}</span>
          <small>{email}</small>
          <button type="button" onClick={handleSignOut}>
            sair do sistema
          </button>
        </UserInfo>
      </Content>
    </Container>
  );
}
