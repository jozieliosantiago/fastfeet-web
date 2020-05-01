import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 60px 30px;
  box-shadow: 0px 0px 10px #00000033;
  border-radius: 4px;

  img {
    width: 250px;
    padding-bottom: 40px;
    margin: 0 auto;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      font-weight: bold;
      margin-bottom: 10px;
      color: #444;
    }

    input {
      width: 300px;
      height: 45px;
      padding: 10px;
      border-radius: 4px;
      box-shadow: none;
      border: solid 1px #ddd;

      &::placeholder {
        color: #999;
      }

      & + label {
        margin-top: 21px;
      }

      & + button {
        margin-top: 21px;
      }
    }

    span {
      color: #ff0000;
      margin-bottom: 5px;
    }

    button {
      width: 300px;
      height: 45px;
      background: #7d40e7;
      border-radius: 4px;
      color: #fff;
      border: 0;
      font-weight: bold;
    }
  }
`;
