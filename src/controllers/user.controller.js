import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/user.model.js';
import cloudinary from '../utils/cloudinary.js';


const registerUser = asyncHandler(async (req, res) => {
  // extract user deatails
  const { username, fullname, email, password } = req.body;
  console.log('Registering user:', { username, fullname, email, password });

  // Validate input
  if (!username || !fullname || !email || !password) {
    res.status(400);
    throw new Error(400, 'Please provide all required fields');
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error(400, 'User already exists');
  }

  // check for images and avatar
  const avatar = req.files.avatar ? req.files.avatar[0].path : null;
  const coverImage = req.files.coverImage ? req.files.coverImage[0].path : null;

  if (!avatar || !coverImage) {
    res.status(400);
    throw new Error(400, 'Please provide avatar and cover image');
  }

  // Upload them to Cloudinary
  const avatarUpload = await cloudinary.uploader.upload(avatar, {
    folder: 'avatars',
  });

  const coverImageUpload = await cloudinary.uploader.upload(coverImage, {
    folder: 'coverImages',
  });

  // Create user objects - create entry in the database with the provided details and uploaded image URLs

  // Create new user
  const user = await User.create({
    username,
    fullname,
    email,
    password,
    avatar: avatarUpload.secure_url,
    coverImage: coverImageUpload.secure_url,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error(400, 'Invalid user data');
  }
}
);


export { registerUser };
