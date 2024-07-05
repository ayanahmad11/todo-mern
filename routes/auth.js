const router = require("express").Router();
const bodyParser = require("body-parser");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
router.use(bodyParser.json());

// Register user
router.post("/register", async (req, res) => {
    try {

        const { email, username, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(200).json({ message: "User already exists" });
        }
    
      // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create a new user
        const user = new User({ email, username, password: hashedPassword });
        await user.save().
        then(()=> res.status(200).json({message:"sign up successfull "}));

        
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "User Already exists" });
    }
});

// Sign In
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(200).json({ message: "Email and password are required." });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({ message: "Please sign up first." });
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(200).json({ message: "Password is not correct." });
        }

        // Exclude password from response
        const { password: _, ...userWithoutPassword } = user._doc;

        res.status(200).json({userWithoutPassword,message:"logged in successfully"});
    } catch (error) {
        console.error(error);
        res.status(200).json({ message: "Server error, please try again later." });
    }
});

module.exports = router;
