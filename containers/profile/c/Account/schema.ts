import * as yup from "yup";

export const personalDetailsScehma = yup.object().shape({
    first_name: yup.string(),
    last_name: yup.string(),
    phone_no_1: yup.string(),
    phone_no_2: yup.string(),
    address_1: yup.object().shape({
        line_1: yup.string(),
        line_2: yup.string(),
        city: yup.string(),
        province: yup.string(),
        zip_code: yup.string(),
    }),
    address_2: yup.object().shape({
        line_1: yup.string(),
        line_2: yup.string(),
        city: yup.string(),
        province: yup.string(),
        zip_code: yup.string(),
    }),
    profile_image: yup.string(),
});


export const emailScehma = yup.object().shape({
    email: yup.string().email().required(),
    
});

