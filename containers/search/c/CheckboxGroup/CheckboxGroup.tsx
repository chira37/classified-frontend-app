import { setExtras } from "@redux/slices/searchSlice";
import { useAppDispatch, useAppSelector } from "@redux/store";
import React, { useState } from "react";
import { Option } from "types";
import { object } from "yup/lib/locale";

interface CheckboxGroupProps {
    id: string;
    name: string;
    options: Option[];
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ id, name, options }) => {
    const [show, setShow] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const extras = useAppSelector((state) => state.search.extras);

    const toggleShow = () => {
        setShow((state) => !state);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = e.target;
        const checkedIds = extras[id] || [];
        let newCheckedIds = [];
        if (checked) {
            newCheckedIds = [...checkedIds, value];
        } else {
            newCheckedIds = checkedIds.filter((item) => item !== value);
        }

        dispatch(setExtras({ [id]: newCheckedIds }));
    };

    return (
        <div>
            <div>
                <div className="flex items-center gap-x-2">
                    <label className="font-semibold">{name}</label>
                    <div className="h-1 bg-gray-300 w-full" />
                    <div>
                        <a onClick={toggleShow} className="cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {show ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 15l7-7 7 7"
                                    />
                                )}
                            </svg>
                        </a>
                    </div>
                </div>

                {show && (
                    <div>
                        {options.map((item, key) => (
                            <div key={key} className="flex items-center">
                                <input
                                    checked={extras[id]?.includes(item.id) || false}
                                    onChange={handleChange}
                                    value={item.id}
                                    type="checkbox"
                                    className="w-4 h-4 cursor-pointer"
                                />
                                <span className="ml-2 font-medium">{item.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckboxGroup;
