import { MapSocketRequest, MapSocketResponse } from "src/common/types";
import { RawData, WebSocket } from "ws";

/**
 * Minimalistic request-response mapped websocket client implementation.
 */
export class MapSocketClient {
  private port: number;
  private isOpen: boolean;
  private webSocketClient: WebSocket;
  private messageCount: number;
  private messageInboundQueue: {
    [requestID: string]: (value: any) => void;
  };
  private messageOutboundQueue: ((value: WebSocket) => void)[];

  /**
   * Constructor
   * @param port specifies the port to which the client should connect
   */
  constructor(port: number) {
    this.port = port;
    this.isOpen = false;
    this.connect();
  }

  /**
   * Invokes a remote procedure with the given parameters
   * @param procedure remote procedure to invoke
   * @param params params to send with the invoked remote procedure
   * @returns promise that is resolved once the remote server sends a response
   */
  public async invoke(procedure: string, params: any): Promise<any> {
    /* Get websocket with open connection */
    const ws = await this.getOpenClient();

    /* Dispatch request call and put the resolver method in the message queue */
    return new Promise((resolve) => {
      const requestBody = this.buildRequest(procedure, params);

      this.messageInboundQueue[requestBody.requestId] = resolve;
      ws.send(JSON.stringify(requestBody));
    });
  }

  /**
   * Get the websocket client with an open connection.
   * If the connection has not yet been opened, register a promise which is to be resolved as soon as the connection has been established.
   * @returns WebSocket client promise
   */
  private getOpenClient(): Promise<WebSocket> {
    return new Promise<WebSocket>((resolve) => {
      if (this.isOpen) {
        resolve(this.webSocketClient);
      } else {
        this.messageOutboundQueue.push(resolve);
      }
    });
  }

  /**
   * Handler method which is invoked once the websocket connection has been established
   * @param ws the websocket object
   */
  private onOpenHandler() {
    this.isOpen = true;
    this.messageOutboundQueue.forEach((func) => func(this.webSocketClient));
    this.messageOutboundQueue = [];
  }

  /**
   * Message handler method to receive responses from the server
   * @param data message body
   */
  private onMessageHandler(data: RawData) {
    /* Parse response body and invoke the resolve method belonging to the same request */
    const responseBody: MapSocketResponse = JSON.parse(data.toString());
    const resolve = this.messageInboundQueue[responseBody.requestId];

    resolve(responseBody.response);

    /* Remove request from message queue */
    this.messageInboundQueue[responseBody.requestId] = undefined;
  }

  /**
   * Generate the request body with a unique request ID
   * @param procedure procedure name to invoke remotely
   * @param params procedure params
   * @returns the request body
   */
  private buildRequest(procedure: string, params: any): MapSocketRequest {
    const requestId = (this.messageCount++).toString();
    return { procedure, params, requestId };
  }

  /**
   * Opens a WebSocket connection on demand and register message handler
   */
  public connect() {
    this.isOpen = false;
    this.messageCount = 0;
    this.messageInboundQueue = {};
    this.messageOutboundQueue = [];
    this.webSocketClient = new WebSocket(`ws://localhost:${this.port}`);
    this.webSocketClient.on("open", this.onOpenHandler.bind(this));
    this.webSocketClient.on("message", this.onMessageHandler.bind(this));
  }

  /**
   * Closes a WebSocket connection on demand
   */
  public disconnect() {
    this.webSocketClient.close();
  }
}
