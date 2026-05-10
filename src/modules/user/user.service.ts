import { User } from "./user.model";

export const getAllUsers = async () => {
  return await User.find().select("-password");
};

export const getSingleUser = async (id: string) => {
  return await User.findById(id).select("-password");
};

export const updateUser = async (id: string, data: any) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};
