import React, { useState, useEffect, useCallback } from 'react';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import notification from '~/helpers/notification';

import { Container, Content, Header, Form } from './styles';

export default function RegistrationForm() {
  const [recipientList, setRecipientList] = useState(null);
  const [deliverymanList, setDeliverymanList] = useState(null);
  const [disable, setDisable] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [deliverymanName, setDeliverymanName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [warning, setWarning] = useState(false);
  const [editOrderId, setEditOrderId] = useState(null);

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

  async function getData() {
    try {
      const [
        recipientListResponse,
        deliveymanListResponse,
      ] = await Promise.all([api.get('/recipients'), api.get('/deliveryman')]);

      const { data: recipientData } = recipientListResponse.data;
      const { data: deliverymanData } = deliveymanListResponse.data;

      setRecipientList(recipientData);
      setDeliverymanList(deliverymanData);
    } catch (error) {
      setDisable(true);
      notification({
        title: 'Erro',
        message:
          'Não foi possível obter as listas de destinatários e entregadores!',
        type: 'danger',
      });
    }
  }

  function setOrderData(order) {
    const { recipient } = order;
    const { deliveryman } = order;

    setRecipientName(recipient.name);
    setDeliverymanName(deliveryman.name);
    setProductDescription(order.product);
    setDisable(false);
  }

  const getOrderById = useCallback(async (id) => {
    try {
      const response = await api.get(`/orders/${id}`);
      const { data } = response;
      setOrderData(data);
      return data;
    } catch (error) {
      notification({
        title: 'Erro',
        message: 'Não foi possível obter dados do usuário!',
        type: 'danger',
      });
      return null;
    }
  }, []);

  useEffect(() => {
    const { location } = history;

    if (location.search) {
      setDisable(true);
      if (location.state) {
        const { order } = location.state;

        setEditOrderId(order.id);
        setOrderData(order);
      } else {
        getOrderById(location.search.replace('?', ''));
      }
    }
  }, [getOrderById]);

  useEffect(() => {
    getData();
  }, []);

  async function handleSaveOrder() {
    setWarning(false);

    if (!recipientName || !deliverymanName || !productDescription) {
      setWarning(true);
      showNotification('Atenção', 'Preeencha todos os campos!', 'warning');
      return;
    }

    const recipientSelected = recipientList.filter(
      (value) => value.name.toLowerCase() === recipientName.toLowerCase()
    )[0];

    const deliverymanSelected = deliverymanList.filter(
      (value) => value.name.toLowerCase() === deliverymanName.toLowerCase()
    )[0];

    if (!recipientSelected) {
      showNotification(
        'Atenção',
        'Selecione um destinatário válido!',
        'warning'
      );
      return;
    }

    if (!deliverymanSelected) {
      showNotification('Atenção', 'Selecione um entregador válido!', 'warning');
      return;
    }

    const body = {
      productDescription,
      recipient_id: recipientSelected.id,
      deliveryman_id: deliverymanSelected.id,
    };

    try {
      setDisable(true);
      let response = '';
      if (editOrderId)
        response = await api.put(`/orders/${setEditOrderId}`, body);
      else response = await api.post('/orders', body);

      if (response.status === 200) {
        if (editOrderId) {
          showNotification('Sucesso', 'Pedido atualizado!', 'success');
          history.goBack();
          return;
        }
        showNotification('Sucesso', 'Pedido cadastrado!', 'success');

        setRecipientName('');
        setDeliverymanName('');
        setProductDescription('');
        getData();
        setDisable(false);
      }
    } catch (error) {
      showNotification('Erro', 'Não foi possível casdastrar pedido!', 'danger');
      setDisable(false);
    }
  }

  async function getRecipientList(e) {
    setRecipientName(e.target.value.trim());

    try {
      const response = await api.get('/recipients', {
        params: {
          filter: e.target.value.trim(),
        },
      });

      const { data } = response.data;

      setRecipientList(data);
    } catch (error) {
      setDisable(true);
      showNotification(
        'Erro',
        'Não foi possível realizar pesquisar por destinatários!',
        'danger'
      );
    }
  }

  async function getDeliverymanList(e) {
    setDeliverymanName(e.target.value.trim());

    try {
      const response = await api.get('/deliveryman', {
        params: {
          filter: e.target.value.trim(),
        },
      });

      const { data } = response.data;

      setDeliverymanList(data);
    } catch (error) {
      setDisable(true);
      showNotification(
        'Erro',
        'Não foi possível realizar pesquisar por entregadores!',
        'danger'
      );
    }
  }

  return (
    <Container>
      <Content>
        <Header>
          {editOrderId ? (
            <h1>Edição de encomendas</h1>
          ) : (
            <h1>Cadastro de encomendas</h1>
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
            <button onClick={handleSaveOrder} className="save" type="button">
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
              onChange={getRecipientList}
              disabled={disable}
              className={`${warning && !recipientName ? 'warning' : ''}`}
              value={recipientName}
            />
            <datalist id="recipient">
              {recipientList && (
                <>
                  {recipientList.map((value) => (
                    <option key={value.id} value={value.name}>
                      {value.name}
                    </option>
                  ))}
                </>
              )}
            </datalist>
          </div>
          <div>
            <label htmlFor="deliveryman">Entregador</label>
            <input
              list="deliveryman"
              type="text"
              placeholder="buscar entregador"
              onChange={getDeliverymanList}
              disabled={disable}
              className={`${warning && !deliverymanName ? 'warning' : ''}`}
              value={deliverymanName}
            />
            <datalist id="deliveryman">
              {deliverymanList && (
                <>
                  {deliverymanList.map((value) => (
                    <option key={value.id}>{value.name}</option>
                  ))}
                </>
              )}
            </datalist>
          </div>
          <div>
            <label htmlFor="product-name">Nome do produto</label>
            <input
              id="product-name"
              type="text"
              placeholder="produto"
              disabled={disable}
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className={`${warning && !productDescription ? 'warning' : ''}`}
            />
          </div>
        </Form>
      </Content>
    </Container>
  );
}
