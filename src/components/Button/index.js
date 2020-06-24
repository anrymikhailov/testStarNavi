import styled from "styled-components";

export const Button = styled.button`
  background: #a99292;
  color: white;
  font-size: 1.2em;
  border: 0;
  border-radius: 5px;
  margin: 10px;
  width: 130px;
  height: 50px;
  box-sizing: border-box;
  text-transform: uppercase;
`;

export const SquareButton = styled.button`
  border: 1px solid #dfd6d6;
  background: ${props => props.color};
  font-size: 1.2em;
  font-weight: bold;
  line-height: 34px;
  margin-top: -3px;
  padding: 0;
  width: 40px;
  height: 40px;
`;
// margin-right: -1px;
