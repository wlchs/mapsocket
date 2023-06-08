/**
 * Request received from the client
 */
export interface MapSocketRequest {
  procedure: string;
  params: any;
  requestId: string;
}

/**
 * Response sent to the client
 */
export interface MapSocketResponse {
  requestId: string;
  response: any;
}
