import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
}

const userSchema = new Schema(
  {
    name: String,
    email: String,
  },
  { timestamps: true }
)

const User =
  (mongoose.models?.User as Model<IUser>) ||
  mongoose.model<IUser>('User', userSchema)

export default User
