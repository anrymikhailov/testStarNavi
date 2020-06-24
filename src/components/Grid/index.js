import styled from "styled-components";

export const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

export const GridItem = styled.div`
  margin: 0;
  box-sizing: border-box;
  flex-grow: 0;
  border: 2px solid #dcd8d1;
  max-width: ${props => props.width};
  flex-basis: ${props => props.width};
  text-align: ${props => props.align};
  @media screen and (max-width: 960px) {
    max-width: 100%;
    flex-basis: 100%;
    padding: 0;
  }
`;

export const GridItemBoard = styled(GridItem)`
  padding-top: 50px;
`;

export const GridItemLeader = styled(GridItem)`
  padding-left: 100px;
`;

export const GridItemLeaderElement = styled(GridItem)`
  border: none;
  background: #dad6d6;
  padding: 10px;
  margin-bottom: 4px;
  @media screen and (max-width: 960px) {
    max-width: 50%;
    flex-basis: 50%;
    padding: 0;
  }
`;
