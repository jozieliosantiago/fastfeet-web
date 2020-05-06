import styled from 'styled-components';

export const Container = styled.div`
  width: 450px;
  background: #fff;
  padding: 25px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px #00000033;

  h4 {
    color: #444;
  }

  p {
    color: #666;
    margin-top: 4px;
  }

  div {
    & + div {
      border-top: solid 1px #eee;
      margin-top: 12px;
      padding-top: 12px;
    }

    img {
      display: block;
      width: 235px;
      margin: 25px auto 20px;
    }
  }
`;
