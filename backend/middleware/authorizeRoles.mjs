export const authorizeRole = (requiredRoles) => {
  return (req, res, next) => {
	console.log("hello2")

    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized access' });
      }

      if (user.role === 'admin' || requiredRoles.includes(user.role)) {
        return next(); 
      }

      return res.status(403).json({ error: 'Forbidden: Not Authorized' });
    } catch (error) {
      console.error('Error in authorization middleware:', error);
      return res.status(500).json({ error: 'Server error during authorization' });
    }
  };
};
