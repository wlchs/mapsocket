import { MapSocketClient } from "mapsocket";

const ms = new MapSocketClient(8080);

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
