import styled from 'styled-components';
import { darken, lighten, rgb, transparentize } from 'polished';

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

export const SearchCreate = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 34px;
`;

export const Search = styled.div`
  height: 36px;
  width: 240px;
  background: #fff;
  border: solid 1px #ddd;
  border-radius: 4px;
  display: flex;

  input {
    width: 85%;
    background: transparent;
    padding-right: 10px;
    border: 0;
    color: #999;

    &::placeholder {
      color: ${lighten(0.2, '#999')};
    }
  }

  div {
    width: 15%;
    height: 100%;
    border: 0;
    background: transparent;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;

    .clear {
      cursor: pointer;

      &:hover {
        color: #555;
        font-weight: bold;
      }
    }
  }
`;

export const Create = styled.div`
  button {
    width: 140px;
    height: 36px;
    padding: 10px 16px;
    background: #7d40e7;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-weight: bold;
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

export const Deliveryman = styled.td`
  display: flex;
  align-items: center;
`;

export const Abbreviation = styled.div`
  background: ${(props) => `${transparentize(0.75, `${rgb(props.color)}`)}`};
  color: ${(props) => `${lighten(0.09, `${rgb(props.color)}`)}`};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 26px;
  width: 26px;
  border-radius: 50%;
  margin-right: 3px;
`;

export const Status = styled.div`
  display: flex;
  height: 25px;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  border-radius: 12px;
  font-weight: 500;
  padding: 0 2px;
  font-size: 12px;

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
  }

  &.delivered {
    background: #dff0df;
    color: ${darken(0.4, '#dff0df')};
    .dot {
      background: ${darken(0.4, '#dff0df')};
    }
  }

  &.pending {
    background: #f1f198;
    color: ${darken(0.4, '#f1f198')};
    .dot {
      background: ${darken(0.4, '#f1f198')};
    }
  }

  &.withdrawal {
    background: #bad2ff;
    color: ${darken(0.4, '#bad2ff')};
    .dot {
      background: ${darken(0.4, '#bad2ff')};
    }
  }

  &.canceled {
    background: #fab0b0;
    color: ${darken(0.4, '#fab0b0')};
    .dot {
      background: ${darken(0.4, '#fab0b0')};
    }
  }
`;

export const Options = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  width: 120px;
  position: absolute;
  padding: 5px 15px;
  box-shadow: 0px 0px 2px #00000026;
  border-radius: 4px;

  button {
    text-align: left;
    padding: 4px 0;
    color: #999;

    svg {
      margin-right: 5px;
    }
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

export const DeleteOrder = styled.div`
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
