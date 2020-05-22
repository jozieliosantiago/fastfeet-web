import React, { useState, useEffect, useCallback } from 'react';
import {
  MdSearch,
  MdClear,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import randomColor from '~/helpers/randomColor';

import Options from '~/components/Options';
import Modal from '~/components/Modal';
import Notification from '~/helpers/notification';

import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  Content,
  SearchCreate,
  Search,
  Create,
  Table,
  Deliveryman,
  Abbreviation,
  Pagination,
  PaginationButton,
  Limit,
  DeleteDeliveryman,
  Avatar,
} from './styles';

const limitPerPage = [10, 20, 50];

export default function Order() {
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState([]);
  const [limit, setLimit] = useState(20);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteOrder, setDeleteOder] = useState(false);

  function userNameAbbreviation(name) {
    const splitName = name.split(' ');

    const abbreviation =
      splitName.length > 1
        ? `${splitName[0][0]}${splitName.slice(-1)[0][0]}`
        : splitName[0][0];
    return abbreviation.toUpperCase();
  }

  const fetchData = useCallback(
    async (filter = null, page = 1) => {
      const requestParams = {
        page,
        limit,
      };

      if (filter) requestParams.filter = filter;
      if (!filter && search) requestParams.filter = search;

      const response = await api.get('/deliveryman', {
        params: {
          ...requestParams,
        },
      });

      const {
        page: currentPage,
        next_page: nextPage,
        prev_page: prevPage,
        total_pages: totalPages,
        total_records: totalRecords,
      } = response.data;

      setPagination({
        currentPage,
        nextPage,
        prevPage,
        totalPages,
        totalRecords,
      });

      const { data } = response.data;
      const orderList = data.map((order) => ({
        ...order,
        color: randomColor(),
        abbreviation: userNameAbbreviation(order.name),
      }));
      setOrders(orderList);
    },
    [limit, search]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleChange(e) {
    const filter = e.target.value;
    setSearch(filter);
    fetchData(filter);
  }

  function handleClearInput() {
    setSearch('');
  }

  function handleRegister() {
    history.push('/deliverymen/form');
  }

  function onDelete(deliveryman) {
    setVisible(true);
    setDeleteOder(true);
    setSelected(deliveryman);
  }

  function onEdit(deliveryman) {
    history.push({
      pathname: '/deliverymen/form',
      search: String(deliveryman.id),
      state: {
        deliveryman,
      },
    });
  }

  function reset() {
    setSelected(null);
    setVisible(false);
    setDeleteOder(false);
  }

  function onCacel() {
    reset();
  }

  async function handleDelete() {
    const notificationMessage = {
      title: '',
      message: '',
      type: '',
    };

    try {
      await api.delete(`/deliveryman/${selected.id}`);
      fetchData();
      notificationMessage.title = 'Sucesso';
      notificationMessage.message = 'Entregador excluído!';
      notificationMessage.type = 'success';
      Notification(notificationMessage);
    } catch (error) {
      notificationMessage.title = 'Erro';
      notificationMessage.message = 'Não foi possível excluir entregador!';
      notificationMessage.type = 'danger';
      Notification(notificationMessage);
    }

    reset();
  }

  return (
    <Container>
      <Content>
        <h1>Gerenciando Entregadores</h1>
        <SearchCreate>
          <Search>
            <div>
              {search ? (
                <MdClear onClick={handleClearInput} className="clear" />
              ) : (
                <MdSearch />
              )}
            </div>
            <input
              type="text"
              placeholder="Buscar por entregador"
              onChange={handleChange}
              value={search}
            />
          </Search>

          <Create>
            <button onClick={handleRegister} type="button">
              + CADASTRAR
            </button>
          </Create>
        </SearchCreate>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((deliveryman) => (
              <tr key={deliveryman.id}>
                <td>#{deliveryman.id}</td>
                <Deliveryman>
                  {deliveryman.avatar ? (
                    <Avatar>
                      <img
                        src={`http://${deliveryman.avatar.url}`}
                        alt="avatar"
                      />
                    </Avatar>
                  ) : (
                    <Abbreviation
                      color={deliveryman.color}
                      className="username-abbreviation"
                    >
                      {deliveryman.abbreviation}
                    </Abbreviation>
                  )}
                  {deliveryman.name}
                </Deliveryman>
                <td>{deliveryman.email}</td>
                <Options
                  onDelete={() => onDelete(deliveryman)}
                  onEdit={() => onEdit(deliveryman)}
                />
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          <PaginationButton
            onClick={() => fetchData(null, pagination.prevPage)}
            disabled={!pagination.prevPage}
            type="button"
          >
            <MdKeyboardArrowLeft />
          </PaginationButton>
          <span>{pagination.currentPage}</span>
          <PaginationButton
            disabled={!pagination.nextPage}
            type="button"
            onClick={() => fetchData(null, pagination.nextPage)}
          >
            <MdKeyboardArrowRight />
          </PaginationButton>
          <Limit
            defaultValue={limit}
            onChange={(e) => setLimit(e.target.value)}
          >
            {limitPerPage.map((limitOption) => (
              <option key={limitOption} value={limitOption}>
                {limitOption}/página
              </option>
            ))}
          </Limit>
        </Pagination>
        <Modal visible={visible} onCacel={onCacel}>
          <>
            {deleteOrder && (
              <DeleteDeliveryman>
                <p>Excluir entregador?</p>
                <div>
                  <button onClick={handleDelete} type="button">
                    Sim
                  </button>
                  <button onClick={onCacel} type="button">
                    Não
                  </button>
                </div>
              </DeleteDeliveryman>
            )}
          </>
        </Modal>
      </Content>
    </Container>
  );
}
