import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #f5f5f5;
  min-height: calc(100vh - 64px);
  padding: 34px 30px 0;
`;

export const Content = styled.div`
  max-width: 840px;
  margin: 0 auto;

  h1 {
    font-size: 24px;
    color: #444;
  }
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 22px;
  border-spacing: 0 20px;
  border: 0;

  thead {
    text-align: left;
    font-size: 16px;
    color: #444;
  }

  tbody {
    tr {
      background: #fff;

      td:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      td:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }

  th {
    padding: 0 20px;
  }

  td {
    padding: 20px;
    border: 0;
    color: #666;
  }
`;

export const Pagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 20px 0;

  span {
    padding: 0 10px;
    color: #555;
  }
`;

export const PaginationButton = styled.button`
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  background: ${(props) => (props.disabled ? '#f5f5f5' : '#fff')};
  border: solid 1px #fff;
  padding: 5px;
  margin: 0 4px;
  align-items: center;
  display: flex;
  color: ${(props) => (props.disabled ? '#999' : '#555')};
  border-radius: 4px;

  svg {
    font-size: 20px;
  }
`;

export const Limit = styled.select`
  background: #fff;
  border: 0;
  padding: 5px;
  border-radius: 4px;
  height: 32px;
  color: #555;
`;

export const CancelDelivery = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 200px;
  background: #fff;
  padding: 25px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px #00000033;

  button {
    margin: 25px 5px 0;
    padding: 6px;
    background: #f5f5f5;
    color: #999;
    border: 0;
    border-radius: 4px;
    font-weight: 300;

    &:hover {
      background: ${darken(0.1, '#f5f5f5')};
    }
  }
`;
