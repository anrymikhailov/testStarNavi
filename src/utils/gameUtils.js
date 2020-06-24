export const checkName = userName => userName === "";

export const checkSelect = sizeOfBoard => sizeOfBoard === 0;

export const getRandomNumber = sizeOfBoard =>
  Math.floor(Math.random() * (sizeOfBoard * sizeOfBoard));

export const squareAlreadyFilled = squareState => squareState != null;

export function whoWin(result, sizeOfBoard) {
  if (result.user >= Math.round((sizeOfBoard * sizeOfBoard) / 2)) return "User";
  else if (result.computer >= Math.round((sizeOfBoard * sizeOfBoard) / 2))
    return "Computer";
  else return "Nobody";
}

export function getGameResult(squares) {
  const result = squares.reduce(
    (acc, elem) => {
      switch (elem) {
        case "green":
          acc.user++;
          break;
        case "red":
          acc.computer++;
          break;
      }
      return acc;
    },
    { user: 0, computer: 0 }
  );
  return result;
}
