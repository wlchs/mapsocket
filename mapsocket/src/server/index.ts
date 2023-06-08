import { MapSocketRequest, MapSocketResponse } from "src/common/types";
import { WebSocketServer, RawData, WebSocket } from "ws";

/**
 * Minimalistic request-response mapped websocket server implementation.
 */
export class MapSocketServer {
  private webSocketServer: WebSocketServer;
  private procedureMap: { [key: string]: (params: any[]) => Promise<any> };

  /**
   * Constructor
   * @param port specifies the port on which the mapsocket server expects connections
   */
  constructor(port: number) {
    this.webSocketServer = new WebSocketServer({ port });
    this.procedureMap = {};

    this.webSocketServer.on("connection", (ws: WebSocket) => {
      ws.on("message", this.onMessageHandler(ws));
    });
  }

  /**
   * Register a custom procedure to be executed upon client requests.
   * Procedures must be unique by name, should two procedures be registered with the same name, the last definition overrides all previous definitions.
   * @param name procedure name, used for procedure identification, therefore must be unique
   * @param procedure promise that is to be executed upon client request
   */
  public on(name: string, procedure: (params: any) => Promise<any>) {
    this.procedureMap[name] = procedure;
  }

  /**
   * Internal message handler implementation. Maps procedure calls the their corresponding handlers and executes the promise.
   * After the promise has been resolved, a response is prepared and dispatched to the initiator client.
   * @param ws WebSocket object to be used for dispatching messages to the registered client
   * @returns the message handler
   */
  private onMessageHandler(ws: WebSocket) {
    return async (data: RawData) => {
      const requestBody: MapSocketRequest = JSON.parse(data.toString());
      const procedure = this.procedureMap[requestBody.procedure];

      const response = await procedure(requestBody.params);
      const responseBody: MapSocketResponse = {
        requestId: requestBody.requestId,
        response,
      };

      ws.send(JSON.stringify(responseBody));
    };
  }
}
