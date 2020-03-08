import User from '../models/User';

class UserController {
  // METHOD TO SHOW THE USERS

  async show(req, res) {
    const { id } = req.params;
    const { page } = req.query;

    if (id) {
      const user = await User.findOne(
        {
          _id: id,
        },
        {
          email: 1,
          name: 1,
          isAdmin: 1,
        }
      );

      return res.status(200).json(user);
    }

    const users = await User.find(
      {},
      {
        email: 1,
        name: 1,
        isAdmin: 1,
      }
    )
      .skip((page - 1) * 10)
      .limit(10);

    return res.status(200).json(users);
  }

  //  METHOD TO CREATE A NEW USER
  async store(req, res) {
    const { email, name, password, isAdmin } = req.body;

    const alreadyExists = await User.findOne({
      email,
    });

    if (alreadyExists) {
      return res.status(400).json({
        error: 'Already have an user with this e-mail',
      });
    }

    const userCreate = await User.create({
      email,
      name,
      password,
      isAdmin,
    });

    return res.status(200).json(userCreate);
  }

  async countPages(req, res) {
    const data = await User.countDocuments();

    const pages = data / 10;

    return res.status(200).json(pages);
  }

  async editUser(req, res) {
    const { id } = req.params;
    const { name, email, isAdmin } = req.body;
    const filter = id;

    try {
      const response = await User.findByIdAndUpdate(filter, {
        name,
        email,
        isAdmin,
      });

      const returnEditted = await User.findOne({
        // eslint-disable-next-line no-underscore-dangle
        _id: response._id,
      });

      return res.status(200).json({
        success: 'User updated',
      });
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  }

  // eslint-disable-next-line consistent-return
  async delete(req, res) {
    const { id } = req.params;
    try {
      const response = await User.findOneAndRemove({
        _id: id,
      });

      if (response) {
        return res.status(200).json({
          success: 'User Deleted',
        });
      }
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  }
}

export default new UserController();
