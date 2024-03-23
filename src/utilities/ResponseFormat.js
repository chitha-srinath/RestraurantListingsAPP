export default function CreateResponse(code, status, data) {
  return {
    ResponseCode: code,
    ResponseStatus: status,
    ResponseData: data,
  };
}
