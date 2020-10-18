// Left :: a -> Either a b
export const Left = (value) => ({ __tag: "Left", value });

// Right :: a -> Either b a
export const Right = (value) => ({ __tag: "Right", value });

// isLeft :: Either a b -> Bool
export const isLeft = (either) => either.__tag === "Left";

// isRight :: Either a b -> Bool
export const isRight = (either) => !isLeft(either);

// map :: (a -> c) -> Either b a -> Either b c
export const map = (f, either) =>
  isRight(either) ? Right(f(either.value)) : either;

// mapLeft :: (b -> c) -> Either b a -> Either c a
export const mapLeft = (f, either) =>
  isLeft(either) ? Left(f(either.value)) : either;

// flatMap :: (a -> Either b c) -> Either b a -> Either b c
export const flatMap = (f) => (either) =>
  isRight(either) ? f(either.value) : either;
