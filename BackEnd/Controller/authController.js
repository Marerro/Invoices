const {
  userRegister,
  getUserByEmail,
  getUserById,
} = require("../Model/authModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const AppError = require("../utilities/appError");

class authController {
  signToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  };

  sendCookie = (token, res) => {
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true, // for security
    };

    res.cookie("jwt", token, cookieOptions); // send cookie
  };

  signUp = async (req, res, next) => {
    try {
      const userDetails = req.body;

      const hashedPassword = await argon2.hash(userDetails.password);

      userDetails.password = hashedPassword;

      const user = await userRegister(userDetails);

      const postUser = {
        name: user.name,
        email: user.email,
        id: user.id,
        roles: user.roles || "user",
      }

      // after signup instant login

      const token = this.signToken(user.id);

      this.sendCookie(token, res);

      userDetails.password = undefined;

      res.status(200).json({
        status: "success",
        user: postUser,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email } = req.body;

      const user = await getUserByEmail(email);

      const token = this.signToken(user.id);

      this.sendCookie(token, res);

      user.password = undefined;
      user.id = undefined;

      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  protect = async (req, res, next) => {
    try {
      const token = req.cookies?.jwt;

      console.log(token)

      if (!token) {
        throw new AppError(
          "You are not logged in, please login to get access",
          401
        );
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const currentUser = await getUserById(decoded.id);

      console.log(decoded.id); 

      if (!currentUser) {
        throw new AppError(
          "The user belonging to this token does no longer exist",
          401
        );
      }

      req.user = currentUser;
      next();
    } catch (error) {
      next(error);
    }
}

    getAuthenticatedUser = async (req, res, next) => {
      try {
        const authUser = req.user;
        authUser.password = undefined;
        res.status(200).json({
          status: "success",
          data: authUser,
        });
      } catch (error) {
        next(error);
      }
    };
  };


module.exports = new authController();
