import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  background: #fff;
`;

export const Content = styled.div`
  max-width: 1080px;
  overflow: hidden;
  margin: 0 auto;
  padding: 0 30px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 150px;
  }
`;

export const UserInfo = styled.div`
  span {
    display: block;
    font-size: 14px;
    font-weight: bold;
    color: #666;
  }

  small {
    display: block;
    color: #999;
  }

  button {
    background: transparent;
    border: 0;
    color: #de3b3b;
    margin-top: 5px;
  }
`;

export const NavMenu = styled.div`
  flex: 1;
  margin-left: 30px;

  .nav-option {
    color: #999;
  }

  .active {
    color: #444;
  }
`;

export const NavOption = styled(NavLink)`
  text-transform: uppercase;
  font-weight: bold;
  margin-right: 15px;
`;
