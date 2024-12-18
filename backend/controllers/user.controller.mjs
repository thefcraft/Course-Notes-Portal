import User from '../models/User.model.mjs'
export const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id); // Assuming user ID is in req.user after verifyToken middleware
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  export const updateUserProfile = async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  export const getPublicProfile = async (req, res) => {
    try {
      const user = await User.findById(req.params.user_id).select('name email profilePicture');
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  