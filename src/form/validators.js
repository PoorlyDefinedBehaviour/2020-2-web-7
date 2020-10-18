import * as Either from "../data/either.js";
import { partition } from "../utils/partition.js";

// required :: String -> a -> Either String a
export const required = (message) => (value) => {
  if (value === false) {
    return Either.Right(value);
  }
  if (value) {
    return Either.Right(value);
  }

  return Either.Left(message);
};

// minLength :: Int -> String -> a -> Either String a
export const minLength = (length, message) => (value) =>
  value.length >= length ? Either.Right(value) : Either.Left(message);

// includes :: String -> String -> a -> Either String a
export const includes = (pattern, message) => (value) =>
  value.includes(pattern) ? Either.Right(value) : Either.Left(message);

// fieldMatches :: String -> String -> a -> {String: *} -> Either String a
export const fieldMatches = (field, message) => (value, values) =>
  value === values[field] ? Either.Right(value) : Either.Left(message);

// collect : [Either(Error | String)] -> Either([Error | String])
export const collect = (list) => {
  const [errors] = partition(Either.isLeft, list);
  return errors.map((error) => error.value);
};

export const validate = async (validations, values) => {
  const results = Object.entries(values)
    .map(([field, value]) => [field, value, validations[field](value, values)])
    .map(([field, value, result]) =>
      Either.mapLeft((message) => ({ field, value, message }), result)
    );

  return collect(results);
};
