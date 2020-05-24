import React, { useState, useEffect, useCallback } from 'react';
import {
  MdSearch,
  MdClear,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';

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
  Pagination,
  PaginationButton,
  Limit,
  DeleteDeliveryman,
} from './styles';

const limitPerPage = [10, 20, 50];

export default function Recipient() {
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [limit, setLimit] = useState(20);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteRecipient, setDeleteRecipient] = useState(false);

  const fetchData = useCallback(
    async (filter = null, page = 1) => {
      const requestParams = {
        page,
        limit,
      };

      if (filter) requestParams.filter = filter;
      if (!filter && search) requestParams.filter = search;

      const response = await api.get('/recipients', {
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
      setRecipients(data);
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
    history.push('/recipient/form');
  }

  function onDelete(recipient) {
    setVisible(true);
    setDeleteRecipient(true);
    setSelected(recipient);
  }

  function onEdit(recipient) {
    history.push({
      pathname: '/recipient/form',
      search: String(recipient.id),
      state: {
        recipient,
      },
    });
  }

  function reset() {
    setSelected(null);
    setVisible(false);
    setDeleteRecipient(false);
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
      await api.delete(`/recipients/${selected.id}`);
      fetchData();
      notificationMessage.title = 'Sucesso';
      notificationMessage.message = 'Destinatário excluído!';
      notificationMessage.type = 'success';
      Notification(notificationMessage);
    } catch (error) {
      notificationMessage.title = 'Erro';
      notificationMessage.message = 'Não foi possível excluir destinatário!';
      notificationMessage.type = 'danger';
      Notification(notificationMessage);
    }

    reset();
  }

  return (
    <Container>
      <Content>
        <h1>Gerenciando destinatários</h1>
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
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {recipients.map((recipient) => (
              <tr key={recipient.id}>
                <td>#{recipient.id}</td>
                <td>{recipient.name}</td>
                <td>
                  {recipient.street} - {recipient.neighborhood},{' '}
                  {recipient.number}, {recipient.city} - {recipient.state}{' '}
                </td>
                <Options
                  onDelete={() => onDelete(recipient)}
                  onEdit={() => onEdit(recipient)}
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
            {deleteRecipient && (
              <DeleteDeliveryman>
                <p>Excluir Destinatário?</p>
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
