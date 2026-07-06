export async function onRequest(context) {
  const { request, next } = context;
  const authorization = request.headers.get("Authorization");

  const USERNAME = "admin";
  const PASSWORD = "mukakin_racing"; 

  if (authorization) {
    const encoded = authorization.split(" ")[1];
    const decoded = atob(encoded);
    const [user, pass] = decoded.split(":");

    if (user === USERNAME && pass === PASSWORD) {
      return await next();
    }
  }

  return new Response("認証が必要です", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}
