import {Schema , model} from 'mongoose';

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLenghth: [25, "Cant be overcome 25 characters"],
        },
        username: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        phone: {
            type: String,
            minLength: 8,
            maxLength: 16,
            required: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLenght: 8
        },
        role: {
            type: String,
            enum: ['ADMIN', 'EMPLEADO'],
            default: 'EMPLEADO',
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export default model('User', UserSchema);
 