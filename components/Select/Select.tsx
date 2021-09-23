/* eslint-disable react/display-name */
import React from "react";
import ReactSelect, {  Props } from "react-select";
import CreatableSelect from "react-select/creatable";
import { Option } from "types";

interface SelectProps extends Props<{ id: string; name: string }> {
    error?: string;
    label?: string;
}

const Select = React.forwardRef<any, SelectProps>(({ error, label, options, value, ...rest }, ref) => (
    <div className="mb-5 flex-row">
        {label && <label className="pl-1 text-sm font-semibold">{label}</label>}
        <ReactSelect
            {...rest}
            className="mt-1 text-sm font-medium rounded-md"
            options={options}
            getOptionLabel={(option: { id: string; name: string }) => option.name}
            getOptionValue={(option: { id: string; name: string }) => option.id}
            value={options?.find((option) => option.id == value) as Option}
            ref={ref}
        />

        {error && <label className="text-red-500 pl-1 text-sm font-medium mt-1">{error}</label>}
    </div>
));

Select.displayName = "Select";

export default Select;
