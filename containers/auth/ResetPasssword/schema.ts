import * as yup from "yup";

export const schema = yup.object().shape({
    password: yup.string().min(8).max(40).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match"),
});
