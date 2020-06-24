import React from "react";
import PropTypes from "prop-types";
import {
  GridItemLeader,
  GridItemLeaderElement,
  GridContainer,
} from "../../components/Grid";

export const LeaderBoard = props => {
  const { winners } = props;
  return (
    <GridItemLeader width="50%" align="left">
      <h1>Leader Board</h1>
      {winners.map(winner => (
        <GridContainer key={winner.id}>
          <GridItemLeaderElement width="40%">
            <span>{winner.winner}</span>
          </GridItemLeaderElement>
          <GridItemLeaderElement width="40%">
            <span>{winner.date}</span>
          </GridItemLeaderElement>
        </GridContainer>
      ))}
    </GridItemLeader>
  );
};

LeaderBoard.propTypes = {
  winners: PropTypes.array,
};

{
  /* <div
          key={winner.id}
          style={{
            background: "#d3cece",
            marginBottom: "5px",
            padding: "10px",
          }}
        > */
}
