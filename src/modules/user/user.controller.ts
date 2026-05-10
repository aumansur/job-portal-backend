import { User } from "./user.model";

// 🔥 GET USERS
export const getUsers = async (req: any, res: any) => {
  const users = await User.find().select("-password");

  res.json({
    success: true,
    data: users,
  });
};

// 🔥 TOGGLE ACTIVE
export const toggleUserStatus = async (req: any, res: any) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.isActive = !user.isActive;
  await user.save();

  res.json({
    success: true,
    message: user.isActive ? "User Activated" : "User Deactivated",
  });
};
