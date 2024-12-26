export const checkForCartAvailability = (
  state: number[][],
  selectedTypeLenght: number,
  actualSet: number
): boolean => {
  let areArraysFilled: boolean[] = [];
  state.forEach((e) => {
    if (e.length === selectedTypeLenght) {
      areArraysFilled.push(true);
    } else {
      areArraysFilled.push(false);
    }
  });

  const checkAllElements = areArraysFilled.every((e) => e === true);
  if (state.length === actualSet && checkAllElements) {
    return true;
  } else {
    return false;
  }
};
