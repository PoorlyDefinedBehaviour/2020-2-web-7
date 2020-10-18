// partition :: (a -> Bool) -> [a] -> [[a], [a]]
export const partition = (predicate, list) => {
  const xs = [];
  const ys = [];

  for (const element of list) {
    if (predicate(element)) {
      xs.push(element);
    } else {
      ys.push(element);
    }
  }

  return [xs, ys];
};
