import { userServices } from "../services/user-services.js";

//register
export const registerController = async (req, res) => {
  try {
    const response = await userServices.userRegisterService(req.body);
    res.status(200).send(response);
  } catch (err) {
    return res
      .status(500)
      .send({ success: false, message: "Error in register", error: err });
  }
};
//login
export const loginController = async (req, res) => {
  try {
    const response = await userServices.userLoginService(req.body);
    res.status(200).send(response);
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Error in login api", error });
  }
};

//forgotPassword;
export const forgotPasswordController = async (req, res) => {
  try {
    const response = await userServices.forgotPasswordServices(req.body);
    return res.status(200).send(response);
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Error in Forgot password" });
  }
};
