import User from "../Models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

//signup
export const signupController = async (req,res)=>{
    const {fullName,email,password,confirmPassword} = req.body;

    if(!fullName || !email || ! password || !confirmPassword){
        return res.status(400).json({ message: "Please fill all the fields!" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match!" });
    }

    const saltRounds = 10;
    const hashedPassWord = await bcrypt.hash(password, saltRounds);

    try{
        const newUser = new User({
            fullName,
            email,
            password:hashedPassWord,
            
        })

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}


//login


// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../Models/user.js";

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required!" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email or password is wrong!" });
    }

    // ✅ Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password!" });
    }

    // ✅ JWT token create
    const token = jwt.sign({ id: user._id }, process.env.SECRET_CODE, { expiresIn: "1h" });

    return res.status(200).json({
      message: "Login Successful!",
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
