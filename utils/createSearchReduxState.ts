import { SearchSliceIinitialState } from "@redux/slices/searchSlice";

const createSearchReduxState = (url: string) => {
    const params = new URLSearchParams(url);

    const reduxState: SearchSliceIinitialState = {
        extras: {},
        searchText: "",
        category: "",
        province: "",
        city: [],
        condition: "",
        sortBy: "",
        page: "",
        priceFrom: "",
        priceTo: "",
    };
    const extras: { [key: string]: string[] } = {};

    params.forEach((value, key) => {
        if (
            key === "searchText" ||
            key === "category" ||
            key === "province" ||
            key === "condition" ||
            key === "sortBy" ||
            key === "page" ||
            key === "priceFrom" ||
            key === "priceTo"
        ) {
            reduxState[key] = value;
        } else if (key === "city") {
            reduxState[key] = params.getAll(key);
        } else {
            extras[key] = params.getAll(key);
        }
    });

    reduxState.extras = extras;

    return reduxState;
};

export default createSearchReduxState;
