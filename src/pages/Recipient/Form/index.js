import React, { useState, useEffect, useCallback } from 'react';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import notification from '~/helpers/notification';

import history from '~/services/history';
import api from '~/services/api';

import errorMessages from '~/helpers/errorMessages.json';

import { Container, Content, Header, Form } from './styles';

export default function RegistrationForm() {
  const [warning, setWarning] = useState(false);
  const [disable, setDisable] = useState(false);
  const [recipientId, setRecipientId] = useState(null);
  const [name, setName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');

  const notificationMessage = {
    title: '',
    message: '',
    type: '',
  };

  function showNotification(title, message, type) {
    notificationMessage.title = title;
    notificationMessage.message = message;
    notificationMessage.type = type;
    notification(notificationMessage);
  }

  async function handleSave() {
    setWarning(false);

    if (
      !name ||
      !zipCode ||
      !city ||
      !state ||
      !street ||
      !neighborhood ||
      !number
    ) {
      setWarning(true);
      showNotification(
        'Atenção',
        'Preeencha os campos obrigatórios!',
        'warning'
      );
      return;
    }

    const body = {
      name,
      zip_code: zipCode,
      city,
      state,
      street,
      neighborhood,
      number,
      no: 'nono',
    };

    if (complement) body.address_complement = complement;

    try {
      setDisable(true);

      if (recipientId) {
        await api.put(`/recipients/${recipientId}`, body);
      } else await api.post('/recipients', body);

      const message = recipientId
        ? 'Destinatário atualizado!'
        : 'Destinatário cadastrado!';

      showNotification('Sucesso', message, 'success');

      if (recipientId) {
        history.push('/recipient');
        return;
      }

      setName('');
      setZipCode('');
      setCity('');
      setState('');
      setStreet('');
      setNeighborhood('');
      setNumber('');
      setComplement('');
      setDisable(false);
    } catch (error) {
      const { data } = error.response;
      const { error: err } = data;

      const message = err.key
        ? errorMessages[err.key]
        : 'Não foi possível casdastrar destinatário!';

      showNotification('Erro', message, 'danger');
      setDisable(false);
    }
  }

  function setRecipientData(recipient) {
    setRecipientId(recipient.id);
    setName(recipient.name);
    setZipCode(recipient.zip_code);
    setCity(recipient.city);
    setState(recipient.state);
    setStreet(recipient.street);
    setNeighborhood(recipient.neighborhood);
    setNumber(recipient.number);
    setComplement(recipient.address_complement || '');

    setDisable(false);
  }

  const getRecipientById = useCallback(async (id) => {
    try {
      const response = await api.get(`/recipients/${id}`);
      const { data } = response;

      setRecipientData(data);
    } catch (error) {
      notification({
        title: 'Erro',
        message: 'Não foi possível obter dados do destinatário!',
        type: 'danger',
      });
    }
  }, []);

  useEffect(() => {
    const { location } = history;

    if (location.search) {
      setDisable(true);
      if (location.state) {
        const { recipient } = location.state;
        setRecipientData(recipient);
      } else {
        getRecipientById(location.search.replace('?', ''));
      }
    }
  }, [getRecipientById]);

  async function getAddressData() {
    if (zipCode) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${zipCode}/json`
        );
        const addressData = await response.json();

        if (!addressData.erro) {
          const { bairro, localidade, logradouro, uf } = addressData;

          setCity(localidade);
          setState(uf);
          setStreet(logradouro);
          setNeighborhood(bairro);
          return;
        }
        showNotification(
          'Ops',
          'Não foi possível obter dados do cep informado',
          'warning'
        );
      } catch (error) {
        showNotification('Ops', 'Cep informado não encontrado', 'danger');
      }
    }
  }

  return (
    <Container>
      <Content>
        <Header>
          {recipientId ? (
            <h1>Edição de destinatários</h1>
          ) : (
            <h1>Cadastro de destinatários</h1>
          )}
          <div>
            <button
              onClick={() => history.goBack()}
              className="back"
              type="button"
            >
              <MdKeyboardArrowLeft size={20} />
              voltar
            </button>
            <button onClick={handleSave} className="save" type="button">
              <MdCheck size={20} />
              salvar
            </button>
          </div>
        </Header>

        <Form>
          <div>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              placeholder="nome"
              disabled={disable}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${warning && !name ? 'warning' : ''}`}
            />
          </div>

          <div className="three-elements">
            <div>
              <label htmlFor="zip-code">CEP</label>
              <input
                id="zip-code"
                type="number"
                placeholder="CEP"
                disabled={disable}
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className={`${warning && !zipCode ? 'warning' : ''}`}
                onBlur={getAddressData}
              />
            </div>

            <div>
              <label htmlFor="city">Cidade</label>
              <input
                id="city"
                type="text"
                placeholder="cidade"
                disabled={disable}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`${warning && !city ? 'warning' : ''}`}
              />
            </div>

            <div>
              <label htmlFor="state">Estado</label>
              <input
                id="state"
                type="text"
                placeholder="estado"
                disabled={disable}
                value={state}
                onChange={(e) => setState(e.target.value)}
                className={`${warning && !state ? 'warning' : ''}`}
              />
            </div>
          </div>

          <div className="two-elements">
            <div>
              <label htmlFor="street">Rua</label>
              <input
                id="street"
                type="text"
                placeholder="rua"
                disabled={disable}
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className={`${warning && !zipCode ? 'warning' : ''}`}
              />
            </div>

            <div>
              <label htmlFor="number">Número</label>
              <input
                id="number"
                type="number"
                placeholder="número"
                disabled={disable}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className={`${warning && !number ? 'warning' : ''}`}
              />
            </div>
          </div>

          <div className="two-elements">
            <div>
              <label htmlFor="complement">Complemento</label>
              <input
                id="complement"
                type="text"
                placeholder="complemento"
                disabled={disable}
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="neighborhood">Bairro</label>
              <input
                id="neighborhood"
                type="text"
                placeholder="bairro"
                disabled={disable}
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className={`${warning && !neighborhood ? 'warning' : ''}`}
              />
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
