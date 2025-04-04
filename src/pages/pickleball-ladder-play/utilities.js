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
