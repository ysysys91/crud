import mongoose, { Schema, models } from 'mongoose'

interface IUser {
  name: string
  email: string
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
)

// 🔥 중요: models.User 체크할 때 models가 undefined일 수도 있기 때문에 보호 필요
const User = models?.User || mongoose.model('User', UserSchema)

export default User
