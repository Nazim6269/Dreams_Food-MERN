const setAccessTokenCookie = (res, accessToken) => {
  res.cookie("accessToken", accessToken, {
    expires: new Date(Date() + 25892000000),
    httpOnly: true,
    sameSite: "none",
  });
};

const setRefreshTokenCookie = (refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
  });
};

module.exports = { setAccessTokenCookie, setRefreshTokenCookie };
