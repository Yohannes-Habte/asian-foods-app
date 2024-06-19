import JWT from "jsonwebtoken";

const userToken = (userId) => {
  const token = JWT.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  return token;
};

export default userToken;
