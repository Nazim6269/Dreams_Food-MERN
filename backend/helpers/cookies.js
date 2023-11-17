const setAccessTokenCookie = (accessToken) => {
  res.cookie("accessToken", accessToken, {
    maxAge: 5 * 60 * 1000,
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
