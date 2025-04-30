import {Schema , model} from 'mongoose';

const UserSchema = Schema(
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
            maxLength: 8,
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
            default: 'USER',
        },
        estado: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default model('User', UserSchema);
 