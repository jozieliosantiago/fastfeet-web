import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import PropTypes from 'prop-types';

import api from '~/services/api';

import notification from '~/helpers/notification';

import { Container, Content, Header, Form } from './styles';

export default function RegistrationForm({ back, edite, order }) {
  const [recipientList, setRecipientList] = useState(null);
  const [deliverymanList, setDeliverymanList] = useState(null);
  const [disable, setDisable] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [deliveryman, setDeliveryman] = useState('');
  const [product, setProduct] = useState('');
  const [warning, setWarning] = useState(false);

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

  useEffect(() => {
    if (edite) {
      const {
        product: productOfOrder,
        deliveryman: deliverymanOfOrder,
        recipient: recipientOfOrder,
      } = order;
      setRecipient(recipientOfOrder.name);
      setDeliveryman(deliverymanOfOrder.name);
      setProduct(productOfOrder);
    }
  }, [edite, order]);

  useEffect(() => {
    getData();
  }, []);

  async function handleSaveOrder() {
    setWarning(false);

    if (!recipient || !deliveryman || !product) {
      setWarning(true);
      showNotification('Atenção', 'Preeencha todos os campos!', 'warning');
      return;
    }

    const recipientSelected = recipientList.filter(
      (value) => value.name.toLowerCase() === recipient.toLowerCase()
    )[0];

    const deliverymanSelected = deliverymanList.filter(
      (value) => value.name.toLowerCase() === deliveryman.toLowerCase()
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
      product,
      recipient_id: recipientSelected.id,
      deliveryman_id: deliverymanSelected.id,
    };

    try {
      setDisable(true);
      let response = '';
      if (edite) response = await api.put(`/orders/${order.id}`, body);
      else response = await api.post('/orders', body);

      if (response.status === 200) {
        if (edite) {
          showNotification('Sucesso', 'Pedido atualizado!', 'success');
          back();
          return;
        }
        showNotification('Sucesso', 'Pedido cadastrado!', 'success');

        setRecipient('');
        setDeliveryman('');
        setProduct('');
        getData();
        setDisable(false);
      }
    } catch (error) {
      showNotification('Erro', 'Não foi possível casdastrar pedido!', 'danger');
      setDisable(false);
    }
  }

  async function getRecipientList(e) {
    setRecipient(e.target.value.trim());

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
    setDeliveryman(e.target.value.trim());

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
          <h1>Cadastro de encomendas</h1>
          <div>
            <button onClick={() => back()} className="back" type="button">
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
              className={`${warning && !recipient ? 'warning' : ''}`}
              value={recipient}
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
              className={`${warning && !deliveryman ? 'warning' : ''}`}
              value={deliveryman}
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
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className={`${warning && !product ? 'warning' : ''}`}
            />
          </div>
        </Form>
      </Content>
    </Container>
  );
}

RegistrationForm.propTypes = {
  back: PropTypes.func.isRequired,
  order: PropTypes.object,
  edite: PropTypes.bool.isRequired,
};

RegistrationForm.defaultProps = {
  order: null,
};
