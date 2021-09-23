import { SearchSliceIinitialState } from "@redux/slices/searchSlice";
import lodash from "lodash";

const createSearchUrl = (values: SearchSliceIinitialState) => {
    const params = new URLSearchParams();

    lodash.forEach(values.extras, (value, key) => {
        if (value.length > 0) {
            value.forEach((item) => params.append(key, item));
        }
    });

    values.city.forEach((item) => params.append("city", item));

    lodash.forEach(values, (value, key) => {
        if (value === "" || value === undefined || value === null || key === "city" || key === "extras") return;
        params.append(key, value as string);
    });

    return params.toString();
};

export default createSearchUrl;
