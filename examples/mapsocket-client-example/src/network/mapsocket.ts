import { MapSocketClient } from "mapsocket";

/* Initialize mapsocket client */
const ms = new MapSocketClient(8080);

/**
 * Dispatch a remote calculation with the given params
 * @param params numbers to sum up
 * @returns the sum and the time it took to process the requsts
 */
export async function dispatchRequest(params: number[]): Promise<{
  sum: number;
  time: number;
}> {
  const startTime = new Date().getTime();
  const sum: number = await ms.invoke("sumAfterDelay", params);

  return {
    sum,
    time: new Date().getTime() - startTime,
  };
}
