import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";



export const verifyJWT = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.get('accessToken')) {
    token = req.cookies.get('accessToken');
  } else if (req.headers.authorization) {
    token = req.headers.authorization.replace("Bearer ", "");
  }
  
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new ApiError(500, "Internal Server Error");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken || !decodedToken._id) {
        throw new ApiError(401, "Unauthorized");
    }
    
    const user = await User.findById(decodedToken._id).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(401, "Unauthorized");
    }
    
    req.user = user;
    next();
} catch (error) {
    throw new ApiError(401, "Unauthorized");
}
});