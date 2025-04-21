export const initialGameState = {
  cycleKings: false,
  numToCycleOut: 3,
  currentMenu: "set-court-num",
  queue: [],
  courts: {},
  leaderBoard: [],
};

export const isEmpty = (obj) => {
  if (obj) {
    return Object.keys(obj)?.length === 0;
  }
};

export const deepCopy = (obj) => {
  try {
    const copiedObject = JSON.parse(JSON.stringify(obj));
    return copiedObject;
  } catch (error) {
    console.warn(error);
  }
};

export const addKingWin = (obj, courtData, winner) => {
  obj.courts[courtData.courtNum][winner].kingWins++;
};

export const tooManyWins = (copiedGameState, courtData, winner) => {
  return (
    copiedGameState.courts[courtData.courtNum][winner].kingWins >=
    copiedGameState.numOfKingCycles
  );
};

export const resetLevel = (
  copiedGameState,
  courtData,
  winner,
  totalNumOfCourts
) => {
  copiedGameState.courts[courtData.courtNum][winner].level = totalNumOfCourts;
  copiedGameState.courts[courtData.courtNum][winner].kingWins = 0;
  copiedGameState.courts[courtData.courtNum][winner].kingWinsTotal++;
  copiedGameState.queue.push(
    copiedGameState.courts[courtData.courtNum][winner]
  );
};
