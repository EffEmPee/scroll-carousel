import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  /* height: 100vh; */

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f5f5f5;
`;

export const CarouselContainer = styled.ul`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;

  li {
    position: absolute;
    width: 100%;
    height: 100vh;

    display: flex;

    h1 {
      margin: auto;
      color: white;
    }
  }
`;
