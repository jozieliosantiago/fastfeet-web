import styled from 'styled-components';

export const TableData = styled.td`
  position: relative;
  &.actions {
    text-align: center;

    button {
      background: transparent;
      border: 0;
    }
  }
`;

export const Buttons = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  width: 120px;
  position: absolute;
  right: 0;
  padding: 5px 15px;
  box-shadow: 0px 0px 2px #00000026;
  border-radius: 4px;

  button {
    text-align: left;
    padding: 4px 0;
    color: #999;

    & + button {
      border-top: solid 1px #eee !important;
    }

    svg {
      margin-right: 5px;
    }
  }
`;
