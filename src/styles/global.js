import { createGlobalStyle } from 'styled-components';
import Roboto from '../assets/fonts/Roboto-Regular.ttf';
import 'react-notifications-component/dist/theme.css';

export default createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url(${Roboto}) format('ttf');
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px Roboto, sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

/* Modal */

  #modal {
    display: none;
    justify-content: center;
    align-items: center;
    background: #000000c2;
    position: absolute;
    width: 100%;
    top: 0;
    height: 100vh;
  }
`;
