import { useState, useEffect, useCallback } from "react";
import "./Card.css";
import { dispatchRequest } from "../network/mapsocket";

export function Card(props: { cardId: number; trigger: number }) {
  const [input, setInput] = useState<number[]>([]);
  const [response, setResponse] = useState<{ sum: number; time: number }>();
  const [loading, setLoading] = useState<boolean>(false);

  /* Generate random input params */
  useEffect(() => {
    const paramCount = Math.floor(Math.random() * 3) + 2;
    setInput(
      [...Array(paramCount).keys()].map(() => Math.floor(Math.random() * 9) + 1)
    );
  }, []);

  /* Dispatch a remote calculation call */
  const sendRequest = useCallback(async () => {
    setResponse(undefined);
    setLoading(true);
    const res = await dispatchRequest(input);
    setResponse(res);
    setLoading(false);
  }, [input]);

  /* Dispatch a request if the trigger increments */
  useEffect(() => {
    if (props.trigger > 0) {
      sendRequest();
    }
  }, [props.trigger, sendRequest]);

  return (
    <div>
      <div className="card" onClick={sendRequest}>
        <h2>Card: {props.cardId}</h2>
        <p>
          <b>Parameters: </b>
          {input.join(", ")}
        </p>
        {loading && <p>Loading...</p>}
        {response && (
          <>
            <p>
              <b>Response: </b>
              {response.sum}
            </p>
            <p>
              <b>Took: </b>
              {response.time} ms
            </p>
          </>
        )}
      </div>
    </div>
  );
}
