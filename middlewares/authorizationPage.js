import cookies from "next-cookies";

export function unauthPage(context) {
  return new Promise((resolve) => {
    const allCookies = cookies(context);

    allCookies.token &&
      context.res
        .writeHead(302, {
          location: "/posts",
        })
        .end();

    return resolve("unauthorized");
  });
}

export function authPage(context) {
  return new Promise((resolve) => {
    const allCookies = cookies(context);

    !allCookies.token &&
      context.res
        .writeHead(302, {
          location: "/auth/login",
        })
        .end();

    return resolve({
      token: allCookies.token,
    });
  });
}
