import * as yup from "yup";
import { number } from "yup/lib/locale";

const schema = yup.object().shape({
    category_id: yup.string().required(),
    brand_id: yup.string().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    condition: yup.string().required(),
    price: yup.number().required(),
    images: yup.array(yup.string()),
    city_id: yup.string().required(),
    province_id: yup.string().required(),
    phone_no_1: yup.string().required(),
    phone_no_2: yup.string(),
    extras: yup.lazy((value) => {
        if (value) {
            const extrasSchema = {...value};
            Object.keys(extrasSchema).forEach((key) => {
                extrasSchema[key] = yup.string().required();
            });
            return yup.object().shape(extrasSchema);
        } else {
            return yup.object();
        }
    }),
});

export default schema;
