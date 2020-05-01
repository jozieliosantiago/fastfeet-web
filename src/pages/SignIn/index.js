import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/img/logo.png';

import { Container } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido.')
    .required('O email é obrigatório'),
  password: Yup.string().required('Informe sua senha'),
});

export default function SignIn() {
  function handleSubmit({ email, password }) {}

  return (
    <Container>
      <img src={logo} alt="logo" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" label="E-MAIL" placeholder="E-mail" />
        <Input
          name="password"
          type="password"
          label="SENHA"
          placeholder="Senha"
        />

        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}
