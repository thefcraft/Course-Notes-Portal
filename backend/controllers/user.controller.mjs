import User from '../models/User.model.mjs'
export const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      
      res.status(200).json({success: true, user});
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  };
  
  export const updateUserProfile = async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.userId, req.body, { new: true });
      if (!updatedUser) return res.status(404).json({success: false,  message: 'User not found' });
      res.status(200).json({success: true, user: updatedUser});
    } catch (error) {
      res.status(500).json({success: false,  message: 'Server error', error });
    }
  };
  
  export const getPublicProfile = async (req, res) => {
    try {
      const user = await User.findById(req.params.user_id).select('name email profilePicture');
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({success: true, user});
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  };
  