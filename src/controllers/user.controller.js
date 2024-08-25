import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
    // Extract user details from request body
    const { fullName, username, email, password } = req.body;
    console.log("email:", email);

    // Validate required fields
    if ([fullName, username, email, password].some(field => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    // Validate file uploads
    const avatarFiles = req.files?.avatar;
    const coverImageFiles = req.files?.coverImage;

    if (!avatarFiles || !Array.isArray(avatarFiles) || avatarFiles.length === 0) {
        throw new ApiError(400, "Avatar is required");
    }
    if (!coverImageFiles || !Array.isArray(coverImageFiles) || coverImageFiles.length === 0) {
        throw new ApiError(400, "Cover image is required");
    }

    // Upload files to Cloudinary
    const avatarLocalPath = avatarFiles[0].path;
    const coverImageLocalPath = coverImageFiles[0].path;

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed");
    }

    if (!coverImage) {
        throw new ApiError(400, "Cover image upload failed");
    }

    // Create new user
    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage.url
    });

    // Retrieve the created user without sensitive data
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user");
    }

    // Respond with success message and user details
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User created successfully")
    );
});

export { registerUser };
