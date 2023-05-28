import styled from "styled-components";

export const Music = styled.div`
  background-color: #0C134F;
  padding: 10px 0;
  width: 90%;
  .btn-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 1rem;
    button {
      align-items: center;
      display: flex;
      justify-content: center;
      padding: 5px 10px;
      cursor: pointer;
    }
  }
  p {
    text-align: center;
    margin-bottom: 5px;
  }
`;

export const Audio = styled.div`
  width: 95%;
  height: 6px;
  margin: 0 auto;
  background-color: black;
  border-radius: 20px;
  cursor: pointer;
  .progress {
    height: 100%;
    width: auto;
    background-color: white;
    border-radius: 20px;
  }
`;
