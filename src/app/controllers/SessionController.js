import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Email and password are requireds. Please check these fields and try again',
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: 'User does not exist',
      });
    }

    if (!(await user.validatePassword(password))) {
      return res.status(401).json({
        error: 'Password invalid',
      });
    }

    const { id, name, userType } = user;

    return res.json({
      user: {
        id,
        name,
        userType,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async verifyUser(req, res) {
    const { token } = req.body;
    try {
      const data = await jwt.verify(token, authConfig.secret);
      return res.send(data);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

export default new SessionController();
