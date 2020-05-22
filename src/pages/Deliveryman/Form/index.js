import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowLeft, MdCheck, MdPhotoCamera } from 'react-icons/md';
import notification from '~/helpers/notification';

import history from '~/services/history';
import api from '~/services/api';

import { Container, Content, Header, Form, Avatar } from './styles';

export default function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [warning, setWarning] = useState(false);
  const [disable, setDisable] = useState(false);
  const [preview, setPreview] = useState(false);
  const [dataImage, setDataImage] = useState(null);
  const [deliverymanId, setDeliverymanId] = useState(null);

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

    if (!name || !email) {
      setWarning(true);
      showNotification('Atenção', 'Preeencha todos os campos!', 'warning');
      return;
    }

    const body = {
      name,
      email,
    };

    try {
      setDisable(true);
      const data = new FormData();
      let response = '';

      if (dataImage) {
        data.append('avatar', dataImage);
        response = await api.post('/files', data);
      }

      if (response) {
        const { id } = response.data;
        body.avatar_id = id;
      }

      if (deliverymanId) {
        await api.put(`/deliveryman/${deliverymanId}`, body);
      } else await api.post('/deliveryman', body);

      const message = deliverymanId
        ? 'Entregador atualizado!'
        : 'Entregador cadastrado!';

      showNotification('Sucesso', message, 'success');

      if (deliverymanId) {
        history.push('/deliverymen');
        return;
      }

      setName('');
      setEmail('');
      setDisable(false);
      setPreview(null);
    } catch (error) {
      showNotification(
        'Erro',
        'Não foi possível casdastrar entregador!',
        'danger'
      );
      setDisable(false);
    }
  }

  async function handleChange(e) {
    setDataImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  }

  useEffect(() => {
    const { location } = history;

    if (location.search) {
      if (location.state) {
        const { deliveryman } = location.state;
        const { avatar } = deliveryman;

        setName(deliveryman.name);
        setEmail(deliveryman.email);
        setDeliverymanId(deliveryman.id);

        if (avatar) setPreview(`http://${avatar.url}`);
      }
    }
  }, []);

  return (
    <Container>
      <Content>
        <Header>
          <h1>Cadastro de entregadores</h1>
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
          <Avatar preview={!preview}>
            <label htmlFor="avatar">
              {preview ? (
                <img src={preview} alt="" />
              ) : (
                <div>
                  <MdPhotoCamera size={45} color="#ddd" />
                  <span>Adicionar foto</span>
                </div>
              )}

              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={handleChange}
              />
            </label>
          </Avatar>
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
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="email"
              disabled={disable}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${warning && !email ? 'warning' : ''}`}
            />
          </div>
        </Form>
      </Content>
    </Container>
  );
}
