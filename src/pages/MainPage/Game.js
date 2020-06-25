import React from "react";
import moment from "moment";
import { PlayBoard } from "./PlayBoard";
import { LeaderBoard } from "./LeaderBoard";
import { GameApi } from "../../api/gameApi";
import { GridContainer } from "../../components/Grid";
import {
  whoWin,
  getGameResult,
  checkName,
  checkSelect,
  getRandomNumber,
  squareAlreadyFilled,
} from "../../utils/gameUtils";

export default class Game extends React.Component {
  state = {
    gamePresets: null,
    gameWinners: null,
    error: null,
    contorlElementsIsDisable: false,
    sizeOfBoard: 0,
    message: null,
    userName: "",
  };

  async componentDidMount() {
    try {
      this.setState({ ...this.state, isFetching: true });
      const [gamePresets, gameWinners] = await Promise.all([
        GameApi.getGamePresets(),
        GameApi.getGameWinners(),
      ]);
      this.setState({ gamePresets, gameWinners, isFetching: false });
    } catch (error) {
      this.setState({ ...this.state, isFetching: false, error: error });
    }
  }

  clickPlayStartGame = () => {
    const { sizeOfBoard, userName } = this.state;
    if (checkName(userName)) {
      this.setState({ message: "plz enter User name" });
      return;
    }
    if (checkSelect(sizeOfBoard)) {
      this.setState({ message: "plz choose Game mode" });
      return;
    }
    this.setState({
      contorlElementsIsDisable: !this.state.contorlElementsIsDisable,
      winner: null,
      timerBlue: setTimeout(() => this.setBlueSquare(), this.state.delay),
      squares: Array(sizeOfBoard * sizeOfBoard).fill(null),
      message: "Game started...",
    });
  };

  setBlueSquare = () => {
    const { squares, sizeOfBoard } = this.state;
    let random = getRandomNumber(sizeOfBoard);
    if (squareAlreadyFilled(squares[random])) {
      this.setBlueSquare();
    } else {
      this.setState(state => ({
        squares: state.squares.map((item, id) =>
          id === random ? "blue" : item
        ),
        idOfBlue: random,
      }));
      this.setRedSquare(random);
    }
  };

  setRedSquare = idOfSquare => {
    this.setState({
      timerRed: setTimeout(
        () =>
          this.setState(
            state => ({
              squares: state.squares.map((item, id) =>
                id === idOfSquare ? "red" : item
              ),
            }),
            () => this.checkWinner()
          ),
        this.state.delay
      ),
    });
  };

  setGreenSquare = idOfSquare => {
    if (
      idOfSquare === this.state.idOfBlue &&
      this.state.squares[idOfSquare] == "blue"
    ) {
      clearTimeout(this.state.timerRed);
      this.setState(
        state => ({
          squares: state.squares.map((item, id) =>
            id === idOfSquare ? "green" : item
          ),
        }),
        () => this.checkWinner()
      );
    }
  };

  checkWinner = () => {
    const { squares, sizeOfBoard } = this.state;
    const result = getGameResult(squares);
    switch (whoWin(result, sizeOfBoard)) {
      case "User":
        this.setState(
          state => ({
            message: `user ${state.userName} win`,
            winner: state.userName,
          }),
          () => this.finishGame()
        );
        break;
      case "Computer":
        this.setState(
          () => ({ message: "Computer win", winner: "Computer" }),
          () => this.finishGame()
        );
        break;
      case "Nobody":
        this.setState({
          timerBlue: setTimeout(() => this.setBlueSquare(), this.state.delay),
        });
        break;
    }
  };

  finishGame = () => {
    clearTimeout(this.state.timerBlue);
    clearTimeout(this.state.timerRed);
    this.saveWinner();
  };

  saveWinner = async () => {
    try {
      this.setState({
        ...this.state,
        isFetching: true,
        contorlElementsIsDisable: false,
      });
      await GameApi.saveWinner({
        winner: this.state.winner,
        date: moment().format("H:mm; DD MMMM YYYY"),
      });
      const gameWinners = await GameApi.getGameWinners();
      this.setState({ gameWinners, isFetching: false });
    } catch (error) {
      this.setState({ ...this.state, isFetching: false, error: error });
    }
  };

  handleSelect = e => {
    e.preventDefault();
    const { gamePresets } = this.state;
    this.setState({
      sizeOfBoard: gamePresets[e.target.value].field,
      delay: gamePresets[e.target.value].delay,
      squares: Array(
        gamePresets[e.target.value].field * gamePresets[e.target.value].field
      ).fill(null),
    });
  };

  handleChangeName = e => {
    this.setState({ userName: e.target.value });
  };

  componentWillUnmount() {
    clearTimeout(this.state.timerBlue);
    clearTimeout(this.state.timerRed);
  }

  render() {
    const {
      gamePresets,
      gameWinners,
      sizeOfBoard,
      contorlElementsIsDisable,
      squares,
      message,
      userName,
      winner,
    } = this.state;
    return (
      <GridContainer>
        {this.state.error && <h2>{this.state.error.message}</h2>}
        {gamePresets && (
          <PlayBoard
            clickPlayStartGame={this.clickPlayStartGame}
            setGreenSquare={this.setGreenSquare}
            handleSelect={this.handleSelect}
            handleChangeName={this.handleChangeName}
            sizeOfBoard={sizeOfBoard}
            isDisable={contorlElementsIsDisable}
            squares={squares}
            message={message}
            userName={userName}
            winner={winner}
          />
        )}
        {gameWinners && <LeaderBoard winners={this.state.gameWinners} />}
      </GridContainer>
    );
  }
}
