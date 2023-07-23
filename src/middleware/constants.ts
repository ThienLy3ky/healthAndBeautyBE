export function StatusCosde(status: number) {
  switch (status) {
    case 200:
      return "Successful responses: The request succeeded";
      break;
    case 201:
      return "Successful responses: The request succeeded and a new resource was created as a result";
      break;
    case 202:
      return "Successful responses: The request has been received but not yet acted upon";
      break;
    case 203:
      return "Successful responses: Non-Authoritative Information";
      break;
    case 204:
      return "Successful responses: No Content";
      break;
    case 205:
      return "Successful responses: Reset Content";
      break;
    case 206:
      return "Successful responses: Partial Content";
      break;
    case 300:
      return "Redirection messages: The request has more than one possible response";
      break;
    case 301:
      return "Redirection messages: The URL of the requested resource has been changed permanently";
      break;
    case 302:
      return "Redirection messages: This response code means that the URI of requested resource has been changed temporarily";
      break;
    case 303:
      return "Redirection messages: See Other";
      break;
    case 304:
      return "Redirection messages: This is used for caching purposes. It tells the client that the response has not been modified";
      break;
    case 305:
      return "Redirection messages: Use Proxy";
      break;
    case 306:
      return "Redirection messages: unused";
      break;
    case 400:
      return "Client error responses: The server cannot or will not process the request due to something that is perceived to be a client error";
      break;
    case 401:
      return "Client error responses: Unauthorized";
      break;
    case 402:
      return "Client error responses: Payment Required";
      break;
    case 403:
      return "Client error responses: Forbidden";
      break;
    case 404:
      return "Client error responses: The server cannot find the requested resource";
      break;
    case 405:
      return "Client error responses: Method Not Allowed";
      break;
    case 406:
      return "Client error responses: Not Acceptable";
      break;
    case 407:
      return "Client error responses: Proxy Authentication Required";
      break;
    case 408:
      return "Client error responses: Request Timeout";
      break;
    case 409:
      return "Client error responses: This response is sent when a request conflicts with the current state of the server";
      break;
    case 410:
      return "Client error responses: This response is sent when the requested content has been permanently deleted from server";
      break;
    case 411:
      return "Client error responses: Server rejected the request because the Content-Length header field is not defined and the server requires it";
      break;
    case 412:
      return "Client error responses: The client has indicated preconditions in its headers which the server does not meet";
      break;
    case 413:
      return "Client error responses: Request entity is larger than limits defined by server";
      break;
    case 414:
      return "Client error responses: The URI requested by the client is longer than the server is willing to interpret.";
      break;
    case 415:
      return "Client error responses: The media format of the requested data is not supported by the server";
      break;
    case 500:
      return "Server error responses: The server has encountered a situation it does not know how to handle";
      break;
    case 501:
      return "The request method is not supported by the server and cannot be handled";
      break;
    case 502:
      return "Server error responses: Bad Gateway";
      break;
    case 503:
      return "Server error responses: Service Unavailable";
      break;
    case 504:
      return "Server error responses: Gateway Timeout";
      break;
    case 505:
      return "Server error responses: HTTP Version Not Supported";
      break;
    case 506:
      return "Server error responses: Variant Also Negotiates";
      break;
    default:
      return "none";
      break;
  }
}
