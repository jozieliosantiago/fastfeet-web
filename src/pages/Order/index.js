import React, { useState, useEffect, useCallback } from 'react';
import {
  MdSearch,
  MdClear,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import randomColor from '~/helpers/randomColor';

import Options from '~/components/Options';
import Details from './Details';
import Modal from '~/components/Modal';

import api from '~/services/api';

import {
  Container,
  Content,
  SearchCreate,
  Search,
  Create,
  Table,
  Deliveryman,
  Abbreviation,
  Status,
  Pagination,
  PaginationButton,
  Limit,
} from './styles';

const limitPerPage = [10, 20, 50];

export default function Order() {
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState([]);
  const [limit, setLimit] = useState(20);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  function userNameAbbreviation(name) {
    const splitName = name.split(' ');

    const abbreviation =
      splitName.length > 1
        ? `${splitName[0][0]}${splitName.slice(-1)[0][0]}`
        : splitName[0][0];
    return abbreviation.toUpperCase();
  }

  function getStatus(order) {
    if (order.canceled_at) {
      return {
        status: 'canceled',
        text: 'Cancelada',
      };
    }

    if (order.end_date) {
      return {
        status: 'delivered',
        text: 'Entregue',
      };
    }

    if (order.start_date) {
      return {
        status: 'withdrawal',
        text: 'Retirada',
      };
    }

    return {
      status: 'pending',
      text: 'Pendente',
    };
  }

  const fetchData = useCallback(
    async (filter = null, page = 1) => {
      const requestParams = {
        page,
        limit,
      };

      if (filter) requestParams.filter = filter;
      if (!filter && search) requestParams.filter = search;

      const response = await api.get('/orders', {
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
        abbreviation: userNameAbbreviation(order.deliveryman.name),
        statusInfo: getStatus(order),
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

  function onSelect(order) {
    setVisible(true);
    setSelected(order);
  }

  return (
    <Container>
      <Content>
        <h1>Gerenciando encomendas</h1>

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
              placeholder="Buscar por encomendas"
              onChange={handleChange}
              value={search}
            />
          </Search>

          <Create>
            <button type="button">+ CADASTRAR</button>
          </Create>
        </SearchCreate>

        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.recipient.name}</td>
                <Deliveryman>
                  <Abbreviation
                    color={order.color}
                    className="username-abbreviation"
                  >
                    {order.abbreviation}
                  </Abbreviation>
                  {order.deliveryman.name}
                </Deliveryman>
                <td>{order.recipient.city}</td>
                <td>{order.recipient.state}</td>
                <td>
                  <Status className={order.statusInfo.status}>
                    <div className="dot" />
                    {order.statusInfo.text}
                  </Status>
                </td>
                <Options onSelect={() => onSelect(order)} />
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

        <Modal visible={visible} closeModal={() => setVisible(false)}>
          <Details details={selected} />
        </Modal>
      </Content>
    </Container>
  );
}
