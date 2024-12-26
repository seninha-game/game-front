export function makeRandomUniqueNumbers(quantity: number): number[] {
  let result = [];
  const usedNumbers: Set<number> = new Set();
  while (result.length < quantity) {
    const raffledNumber = Math.floor(Math.random() * 60 + 1);
    if (!usedNumbers.has(raffledNumber)) {
      result.push(raffledNumber);
      usedNumbers.add(raffledNumber);
    }
  }
  return result;
}
