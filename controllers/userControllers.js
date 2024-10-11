import User from "../models/user.js"
import jwt from 'jsonwebtoken' 
import bcrypt from 'bcrypt'

// export function getUser(req, res) {
//     User.find().then(
//         (userslist) => {
//             res.json({
//                 list: userslist
//             })
//             }
//         )
//     }

export function postUser(req, res) {
    
    const user = req.body

    const password = req.body.password

    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(password,saltRounds);
    user.password = passwordHash //user model eke pasword ek hash kara

    const newUser = new User(user)
    newUser.save().then(
        () => {
            res.json({
                message : "User created successfully"
            })
        }
    ) .catch(
            () => {
                res.json({
                    message: "User cration failed"
                })
        }
    )
}

export function putUser(req, res) {
    res.json({
        message: "This is put"
    })
}

export function loginUser(req, res) {
    const credentials = req.body;

    // Query only by email
    User.findOne({ email: credentials.email }).then((user) => {
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = bcrypt.compareSync(credentials.password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({
                message: "Incorrect password"
            });
        }

        // Prepare the payload for JWT
        const payload = {
            id: user._id,
            email: user.email,
            firstName: user.firstName, // Corrected typo
            lastName: user.lastName,
            type: user.type,
        };

        // Sign the JWT
        const token = jwt.sign(payload, "secret", { expiresIn: "48h" });

        // Respond with user data and token
        res.json({
            message: "User authenticated successfully",
            user: user,
            token: token
        });
    }).catch((error) => {
        // Handle potential errors
        res.status(500).json({
            message: "An error occurred during login",
            error: error.message
        });
    });
}

// export function deleteUser(req, res) {
//     const email = req.body.email;
//     User.deleteOne({ email: email }).then( ()=> {
//         res.json({
//             message: "User deleted successfully!"
//         })
//     }).catch(() => {
//         res.json({
//             message:'User deletion failed!'
//         })
//     })
// }

