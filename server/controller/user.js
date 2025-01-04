import User from '../modal/user.js'
import jwtToken from 'jsonwebtoken';



export const signUp = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            // console.log(req.body, "fhhfhfhfh");

            const newUser = await User.create(req.body);

            if (newUser) {
                return res.status(200).json(
                    {
                        success: true,
                        message: "new user created successfully !!!"
                    });
            }
        } else {
            return res.status(409).json(
                {
                    success: true,
                    message: "user already existed !!!"
                });
        }

    } catch (error) {

        return res.status(401).json(
            {
                success: false,
                message: "error in creating the user !!!"
            })
    }
}


export const userSignIn = async (req, res) => {
    try {



        const user = await User.findOne({ email: req.body.email });

        if (user && user.password == req.body.password) {

            const token = jwtToken.sign(user.toJSON(), 'EVST', { expiresIn: "1d" });
            return res.status(200).json(
                {
                    user: user,
                    token: token,
                    message: "Sign in successfully"
                })
        } else {
            return res.status(404).json({
                message: "User not found. Please register.",
            });
        }
    } catch (error) {

        return res.status(401).json(
            {
                error: error,
                message: "Error in Login try again later !!! "
            })
    }


}
export const adminSignIn = async (req, res) => {
    try {



        const user = await User.findOne({ email: req.body.email });

        if (user && user.password == req.body.password) {

            const token = jwtToken.sign(user.toJSON(), 'EVST', { expiresIn: "1d" });
            return res.status(200).json(
                {
                    user: user,
                    token: token,
                    message: "Sign in successfully"
                })
        } else {
            return res.status(404).json({
                message: "User not found. Please register.",
            });
        }
    } catch (error) {

        return res.status(401).json(
            {
                error: error,
                message: "Error in Login try again later !!! "
            })
    }


}



export const getUser = async (req, res) => {
    const user = await User.findById(req.user.id);
    const token = req.headers.authorization.split(' ')[1];
    if (user) {
        return res.status(200).json(
            {
                user: user,
                token: token,
                message: "successfully got the user !!!"
            })
    } else {
        return res.status(401).json(
            {
                user: user,
                token: token,
                message: "user not found !!!"
            })

    }


}









