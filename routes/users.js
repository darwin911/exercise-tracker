const router = require('express').Router();
let User = require('../models/user.model');
let Exercise = require('../models/exercise.model');
const { verify } = require('../auth');

router.route('/').get(async (req, res) => {
  try {
    let users = await User.find();
    users = await Promise.all(users.map((user) => user.toClient()));
    res.json({ users });
  } catch (error) {
    console.error(error);
  }
});

// Get User
router.route('/:id').get(async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (user) {
      user = await user.toClient();
      return res.json(user);
    } else {
      return res.status(404).json({ error: { message: 'User not found', code: 404 } });
    }
  } catch (error) {
    console.error(error);
  }
});

// Update User Data
router.route('/:id/update').put(async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (user) {
      for (let key in req.body) {
        let value = req.body[key];
        user[key] = value;
      }
      user.save();
      const updatedUser = user.toClient();
      return res.json(updatedUser);
    } else {
      return res.status(404).json({ error: { message: 'User not found', code: 404 } });
    }
  } catch (error) {
    console.error(error);
  }
});

router.route('/:id/add-friend').post(async (req, res) => {
  const { targetId } = req.body;
  const { id } = req.params;
  try {
    let user = await User.findById(id);
    if (user) {
      if (targetId) {
        let targetUser = await User.findById(targetId);

        console.log(`\n${user.username} is sending friend request to ${targetUser.username}\n`);

        const friendReqs = targetUser.friendRequests;
        if (!friendReqs.includes(id)) {
          friendReqs.push(id);
          targetUser.save();
          return res.json({
            success: true,
            message: `Friend request for user with Id ${targetId}`,
          });
        } else {
          return res.status(409).json({
            error: { message: 'Already Requested Friend. Pending Confirmation from target user' },
          });
        }
      }
    } else {
      return res.status(404).json({ error: { message: 'User not found', code: 404 } });
    }
  } catch (error) {
    console.error(error);
    return { error: 'Already Requested Friend. Pending Confirmation from target user' };
  }
});

router.route('/:id/accept-friend').post(async (req, res) => {
  const { targetId } = req.body;
  const { id } = req.params;
  try {
    let user = await User.findById(id);
    let targetUser = await User.findById(targetId);
    if (user && targetUser) {
      const requestExists = user.friendRequests.includes(targetId);
      if (requestExists) {
        // remove from friendRequests
        user.friendRequests.pull(targetId);
        // add to friends array
        user.friends.push(targetId);
        targetUser.friends.push(id);
        const updatedUser = user.toClient();
        const updateTargetUser = targetUser.toClient();
        user.save();
        targetUser.save();
        // return updated user object with update friends and friendReqs
        return res.json(updatedUser);
      }
    } else {
      return res.status(500).json({ error: "Couldn't process accept friend" });
    }
  } catch (error) {
    console.error(error);
  }
});

router.route('/:id/decline-friend/:targetId').delete(async (req, res) => {
  const { id, targetId } = req.params;
  try {
    let user = await User.findById(id);
    if (user) {
      if (user.friendRequests) {
        const index = user.friendRequests.indexOf(targetId);
        const exists = index !== -1;
        if (exists) {
          user.friendRequests.pull(targetId);
          user.save();
          return res.status(200).json({
            success: true,
            message: `Friend request for user with Id ${targetId} has been declined successfully.`,
          });
        }
      }
    } else {
      return res.status(404).json({ error: { message: 'User not found', code: 404 } });
    }
  } catch (error) {
    console.error(error);
  }
});

router.route('/:id/remove-friend/:targetId').delete(async (req, res) => {
  const { id, targetId } = req.params;
  try {
    let user = await User.findById(id);
    let targetUser = await User.findById(targetId);
    if (user) {
      if (user.friends) {
        const index = user.friends.indexOf(targetId);
        const exists = index !== -1;
        if (exists) {
          user.friends.pull(targetId);
          targetUser.friends.pull(id);
          user.save();
          targetUser.save();
          return res.status(200).json({
            success: true,
            updatedUser: user.toClient(),
            message: `Friend connection with user Id ${targetId} has been removed.`,
          });
        }
      }
    } else {
      return res.status(404).json({ error: { message: 'User not found', code: 404 } });
    }
  } catch (error) {
    console.error(error);
  }
});

router.route('/login').post(async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: 'Invalid Credentials', //  No account with this email has been found
      });
    } else {
      const isAuthenticated = await user.isValidPassword(password);
      if (!isAuthenticated) {
        return res.status(401).json({
          error: 'Invalid Credentials: Email and password are not correct',
        });
      }
      const userData = await user.toAuthJSON();
      return res.json(userData);
    }
  } catch (error) {
    console.error(error);
  }
});

router.route('/register').post(async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.find({ email });

    if (userExists.length) {
      return res.status(409).json({ error: 'Email has already been taken' });
    }
    const newUser = new User({ username, email });
    await newUser.setPassword(password);
    newUser.save();
    const userData = await newUser.toAuthJSON();
    return res.json(userData);
  } catch (error) {
    console.error(error);
  }
});

router.route('/verify').post(async (req, res) => {
  try {
    const tokenData = await verify(req.body.token);
    if (tokenData) {
      const user = await User.findById(tokenData.id);
      if (user) {
        const userData = await user.toClient();
        return res.json(userData);
      } else {
        return res.status(401).json({ error: { message: 'Unauthorized', code: 401 } }); // 401 // Unauthorized
      }
    } else {
      return res.status(401).json({ error: { message: 'Unauthorized', code: 401 } });
    }
  } catch (error) {
    console.error(error);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findById(id);
    if (user) {
      await Exercise.deleteMany({ userId: id });
      user = await User.findByIdAndDelete(id);
      return res.status(204).json({ user }); // 204 : No Content
    }
    return res.status(404).json({ error: { message: 'User Not Found', code: 404 } });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
