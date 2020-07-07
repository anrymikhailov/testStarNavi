import React from "react";
import PropTypes from "prop-types";
import { GridItemBoard } from "../../components/Grid";
import { Button, SquareButton } from "../../components/Button";
import InputText from "../../components/Input";
import Select from "../../components/Select";

const ShowControlsElement = React.memo(function MemoizeElements({
  handleSelect,
  handleChangeName,
  userName,
  isDisable,
  winner,
  clickPlayStartGame,
}) {
  return (
    <>
      <Select defaultValue="" onChange={handleSelect} disabled={isDisable}>
        <option value="" disabled>
          Pick game mode
        </option>
        <option value="easyMode">Easy Mode</option>
        <option value="normalMode">Normal Mode</option>
        <option value="hardMode">Hard Mode</option>
      </Select>
      <InputText
        type="text"
        placeholder="Enter your name"
        onChange={handleChangeName}
        value={userName}
        disabled={isDisable}
      />
      <Button onClick={clickPlayStartGame} disabled={isDisable}>
        {!winner ? "Play" : "Play again"}
      </Button>
    </>
  );
});

ShowControlsElement.propTypes = {
  handleSelect: PropTypes.func,
  handleChangeName: PropTypes.func,
  userName: PropTypes.string,
  isDisable: PropTypes.bool,
  winner: PropTypes.string,
  clickPlayStartGame: PropTypes.func,
};

const ShowMessage = ({ message }) => {
  return <p>{message}</p>;
};

ShowMessage.propTypes = {
  message: PropTypes.string,
};

const ShowTableOfSquares = React.memo(function MemoizeShowTableOfSquares({
  sizeOfBoard,
  setGreenSquare,
  squares,
}) {
  return (
    <div>
      {[...Array(sizeOfBoard * sizeOfBoard).keys()].map((item, id) => (
        <React.Fragment key={id}>
          {id % sizeOfBoard == 0 && <div></div>}
          <SquareButton
            color={squares[id]}
            key={id}
            onClick={() => setGreenSquare(id)}
          />
        </React.Fragment>
      ))}
    </div>
  );
});

ShowTableOfSquares.propTypes = {
  sizeOfBoard: PropTypes.number,
  setGreenSquare: PropTypes.func,
  squares: PropTypes.array,
};

export const PlayBoard = props => {
  const {
    sizeOfBoard,
    clickPlayStartGame,
    isDisable,
    setGreenSquare,
    squares,
    message,
    handleSelect,
    handleChangeName,
    userName,
    winner,
  } = props;
  return (
    <GridItemBoard width="50%" align="center">
      <ShowControlsElement
        handleSelect={handleSelect}
        handleChangeName={handleChangeName}
        userName={userName}
        isDisable={isDisable}
        winner={winner}
        clickPlayStartGame={clickPlayStartGame}
      />
      <ShowMessage message={message} />
      <ShowTableOfSquares
        squares={squares}
        sizeOfBoard={sizeOfBoard}
        setGreenSquare={setGreenSquare}
      />
    </GridItemBoard>
  );
};

PlayBoard.propTypes = {
  sizeOfBoard: PropTypes.number,
  clickPlayStartGame: PropTypes.func,
  isDisable: PropTypes.bool,
  setGreenSquare: PropTypes.func,
  squares: PropTypes.array,
  message: PropTypes.string,
  handleSelect: PropTypes.func,
  handleChangeName: PropTypes.func,
  userName: PropTypes.string,
  winner: PropTypes.string,
};
