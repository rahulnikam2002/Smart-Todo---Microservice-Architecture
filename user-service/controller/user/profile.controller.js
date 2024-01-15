exports.getUserProfile = async (req, res) => {
    const userToken = req.headers["x-jwt-auth-token"];

    console.log({ userToken });
    res.send({ userToken });
};
