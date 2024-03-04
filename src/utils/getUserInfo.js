// function that gets ip_adress and user_device from request
function getUserInfo(request) {
  const ip_address =
    request.headers["x-forwarded-for"] || request.socket.remoteAddress;
  let user_device = request.headers["user-agent"];
  // if it is postman or insomnia, then it will change user_device value
  if (
    user_device.includes("PostmanRuntime/") ||
    user_device.includes("insomnia/")
  ) {
    user_device = "Runtime environment";
  }
  return { ip_address, user_device };
}

module.exports = getUserInfo;
