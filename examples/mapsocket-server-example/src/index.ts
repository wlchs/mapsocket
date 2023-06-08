import { MapSocketServer } from "mapsocket";

/* Create server listening on port 8080 */
const ms = new MapSocketServer(8080);

/**
 * Define simple 'sum' procedure which is going to be invoked by the client
 * @param params number array to be summed
 * @returns promise that asyncronously calculates the response
 */
const sum = async (params: number[]) => {
  console.log("Calculating sum of", params);
  return params.reduce((acc: number, n: number) => acc + n);
};

/**
 * Delay promise that resolves after a predefined amount of time
 * @param ms delay in milliseconds
 * @returns promise that resolves after the given time has passed
 */
const delay = (ms: number): Promise<void> => {
  console.log("Delaying execution by", ms, "ms");
  return new Promise((resolve): void => {
    setTimeout(resolve, ms);
  });
};

/**
 * Generates a random number in the given range
 * @param min the lower bound
 * @param max the upper bound
 * @returns the random generated number
 */
const randomNumberBetween = (min: number, max: number): number => {
  return Math.ceil(Math.random() * (max - min) + min);
};

/* Generate random delay between 1 and 5 seconds */
const MIN_DELAY = 1000;
const MAX_DELAY = 5000;

/**
 * Delayed 'sum' procedure. Simulates an expensive procedure that might take a while to resolve.
 * @param params number array to be summed
 * @returns promise that asyncronously calculates the response after delay
 */
const sumAfterDelay = async (params: number[]) => {
  await delay(randomNumberBetween(MIN_DELAY, MAX_DELAY));
  return sum(params);
};

/* Register handler methods */
ms.on("sum", sum);
ms.on("sumAfterDelay", sumAfterDelay);
