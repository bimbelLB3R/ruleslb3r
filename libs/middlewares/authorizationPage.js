import cookies from 'next-cookies';
// jika ada token
export function unauthPage(ctx) {
  return new Promise((resolve) => {
    const allCookies = cookies(ctx);
    if (allCookies.token)
      ctx.res
        .writeHead(302, {
          Location: '../posts',
        })
        .end();
    return resolve('unauthorized');
  });
}

// jika tidak ada token
export function authPage(ctx) {
  return new Promise((resolve) => {
    const allCookies = cookies(ctx);
    if (!allCookies.token)
      ctx.res
        .writeHead(302, {
          Location: 'auth/login',
        })
        .end();
    return resolve({
      token: allCookies.token,
    });
  });
}
