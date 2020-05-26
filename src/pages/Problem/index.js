import React, { useState, useEffect, useCallback } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import Details from './Details';
import Options from '~/components/Options';
import Modal from '~/components/Modal';
import Notification from '~/helpers/notification';

import api from '~/services/api';

import {
  Container,
  Content,
  Table,
  Pagination,
  PaginationButton,
  Limit,
  CancelDelivery,
} from './styles';

const limitPerPage = [10, 20, 50];

export default function Problem() {
  const [pagination, setPagination] = useState({});
  const [problems, setProblems] = useState([]);
  const [limit, setLimit] = useState(20);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteProblem, setDeleteProblem] = useState(false);

  const fetchData = useCallback(
    async (page = 1) => {
      const requestParams = {
        page,
        limit,
      };

      const response = await api.get('/delivery/problems', {
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
      setProblems(data);
    },
    [limit]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function onDelete(problem) {
    setVisible(true);
    setDeleteProblem(true);
    setSelected(problem);
  }

  function reset() {
    setSelected(null);
    setVisible(false);
    setDeleteProblem(false);
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
      await api.put(`/delivery/problem/${selected.id}/cancel-delivery`);
      fetchData();
      notificationMessage.title = 'Sucesso';
      notificationMessage.message = 'Entrega cancelada!';
      notificationMessage.type = 'success';
      Notification(notificationMessage);
    } catch (error) {
      notificationMessage.title = 'Erro';
      notificationMessage.message = 'Não foi possível cancelar entrega!';
      notificationMessage.type = 'danger';
      Notification(notificationMessage);
    }

    reset();
  }

  function onSelect(problem) {
    setVisible(true);
    setSelected(problem);
  }

  return (
    <Container>
      <Content>
        <h1>Problemas na entrega</h1>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Problema</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {problems.map((problem) => (
              <tr key={problem.id}>
                <td>#{problem.id}</td>
                <td>
                  <p>{problem.description}</p>
                </td>
                <Options
                  onSelect={() => onSelect(problem)}
                  onDelete={
                    problem.delivery.canceled_at
                      ? null
                      : () => onDelete(problem)
                  }
                  deleteText="Cancelar entrega"
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
            {deleteProblem && (
              <CancelDelivery>
                <p>Cancelar entrega?</p>
                <div>
                  <button onClick={handleDelete} type="button">
                    Sim
                  </button>
                  <button onClick={onCacel} type="button">
                    Não
                  </button>
                </div>
              </CancelDelivery>
            )}
            {selected && !deleteProblem && <Details details={selected} />}
          </>
        </Modal>
      </Content>
    </Container>
  );
}
