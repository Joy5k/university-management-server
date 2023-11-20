import { Schema, model } from 'mongoose';
import  bcrypt from 'bcrypt';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  StudentModel,
  TUserName,
} from './students/student.interface';
import config from '../config';

const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    require: [true, 'First name is required'],
    trim: true, // for remove unnecessary space
    maxlength: [20, 'First name can not be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalized ',
    },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    readonly: [true, 'last name is required'],

    //no Need the below code because instead using Joi validation

    //   validate: {
    //     validator: (value:string) => {
    //       return validator.isAlpha(value)
    //     },
    //     message:"{VALUE} is not a valid"
    // },
  },
});
const GuardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});
const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true,},
  name: {
    type: UserNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message:
        "The gender field can only be one of the following:'male','female','other'",
    },
    required: true,
  },
  dateOfBirth: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    //no Need the below code because instead using Joi validation
    // validate: {
    // validator:(value:string)=>validator.isEmail(value),
    // message: "{VALUE} is not a valid email address"
    // },
  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'B+', 'AB+', 'O+', '-A', '-B', '-AB', '-O'],
      message: '{VALUE} is not valid',
    },
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: GuardianSchema,
    required: true,
  },
  localGuardian: {
    type: LocalGuardianSchema,
    required: true,
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
  isDeleted: {
    type:Boolean,
  }
}, {
  toJSON: {
    virtuals:true,
  }
});
studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
// নিচে pre function দিয়ে এটা বোঝাচ্ছে ডাটা ফ্রন্টেন্ড থেকে রিছিফ করা হইছে কিন্তু এখনো ডাটা
// বেজে  এখনো সেভ হয়নায় এমতাবস্থায়  আছে। এই সুযোগ কাজে লাগিয়ে  ইউজারের কাছে থেকে
// password নিয়ে সেই password  database এ hashing করে সেভ করেছি।

studentSchema.pre('save', async function (next) {
   // eslint-disable-next-line @typescript-eslint/no-this-alias
   const user=this
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
 next()
})


studentSchema.pre('find', function (next) {
  // console.log(this);
  this.find({isDeleted:{$ne:true}})
  next()
})
studentSchema.pre('findOne', function (next) {

  this.find({isDeleted:{$ne:true}})
  next()
})
studentSchema.pre('aggregate', function (next) {
 this.pipeline().unshift({$match:{isDeleted:{$ne:true}}})
  next()
})
// এখানে নিচে একটা নতুন ডাটা তৈরি করে ইউজারকে দেয়া হচ্ছে।এই ডাটা ডাটাবেজে সরাসরি ভাবে নেই
//নিচের ফাংশন কাজ করবেনা যদিনা তুমি  {
//   toJSON: {
//     virtuals:true,
//   }
// }
// মডেলে firstBracket এর আগে না বসাও
studentSchema.virtual("Fullname").get(function () {
  return (
    `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
  )
})


studentSchema.post('save', function (doc, next) {
  doc.password = "";
  next()

})
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
