import User from '../models/User.js';

//to get user 
export const getUser = async (req, res) => {  
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

////////
export const getUserId = async (req, res) => {
    try {
    // Get the user ID from the authenticated request
    const userId = req.user.id;

    res.status(200).json({ userId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get user ID', error: error.message });
  }
};

export const getUsernameByEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the username
    res.status(200).json({ username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get username', error: error.message });
  }
};


export const getUserById = async (req, res) => {
    try {
      const userId = req.params.id; 
      // Get the user ID from the request parameters
  
      // Retrieve the user from the database using the user ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the user details
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: 'Failed to get user', error: error.message });
    }
  };

  export const getAllUserIds = async (req, res) => {
  try {
    // Retrieve all user IDs from the database
    const users = await User.find({}, '_id');

    // Extract the user IDs from the user objects
    const userIds = users.map((user) => user._id);

    res.status(200).json({ userIds });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get all user IDs', error: error.message });
  }
};


export const getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username; // Get the username from the request parameters

    // Retrieve the user from the database using the username
    const user = await User.findByUsername(username);

    if (!user) {
      return res.status(404).json({ message: 'Username not found' });
    }

    // Return the user details
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get username', error: error.message });
  }
};




