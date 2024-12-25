import User from '../models/User.model.mjs'
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.userId, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

export const updateUserRole = async (req, res) => {
  const { userId, newRole } = req.body; // Extract data from the request body

  if (!userId || !newRole) {
    return res.status(400).json({ success: false, message: 'User ID and new role are required' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};


export const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id).select('name email profilePicture');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found"
      });
    }
    res.status(200).json({
      success: true,
      users: users
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

