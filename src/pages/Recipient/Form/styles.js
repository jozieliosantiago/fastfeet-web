import styled from 'styled-components';
import { lighten } from 'polished';

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

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
  }

  button {
    width: 100px;
    height: 36px;
    color: #fff;
    border: 0;
    border-radius: 4px;
    text-transform: uppercase;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;

    &.back {
      background: #ccc;
      margin-right: 15px;
    }

    &.save {
      background: #7d40e7;
    }
  }
`;

export const Form = styled.form`
  padding: 30px;
  background: #fff;
  margin-top: 20px;
  border-radius: 4px;

  div {
    display: flex;
    flex-direction: column;

    &.three-elements {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 15px;
    }

    &.two-elements {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-gap: 15px;
    }
  }

  label {
    margin-top: 30px;
    color: #444;
    font-weight: bold;
    margin-bottom: 10px;
  }

  input {
    border: solid 1px #ddd;
    color: #999;
    height: 40px;
    border-radius: 4px;
    padding-left: 15px;

    &::placeholder {
      color: ${lighten(0.2, '#999')};
    }
  }

  .warning {
    border: solid 1px orange;
  }
`;
