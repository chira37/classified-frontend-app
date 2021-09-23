import * as yup from "yup";

export const schema = yup.object().shape({
    previous_password: yup.string().required(),
    password: yup.string().min(8).max(40).required(),
    confirm_password: yup.string().oneOf([yup.ref("password")], "Passwords must match"),
});
