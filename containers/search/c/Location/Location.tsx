import { setCity, setProvince } from "@redux/slices/searchSlice";
import { useAppSelector } from "@redux/store";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

interface LocationProps {}

const Location: React.FC<LocationProps> = () => {
    const [show, setShow] = useState<boolean>(false);
    // const [cities, setCities] = useState<Array<{ id: string; name: string }>>([]);

    const { province, city } = useAppSelector((state) => state.search);
    const dispatch = useDispatch();

    /**
     * ============================= fetch =============================
     */

    const { data: provinces } = useQuery<{ data: Array<{ id: string; name: string }> }, Error>("/province", {
        refetchOnWindowFocus: false,
        retry: false,
    });

    const { data: cities, refetch: refetchCities } = useQuery<{ data: Array<{ id: string; name: string }> }, Error>(
        `/city/city-by-province/${province}`,
        {
            refetchOnWindowFocus: false,
            retry: false,
            enabled: false,
        }
    );

    /**
    / =================================================================
     */

    const toggleShow = () => {
        setShow((state) => !state);
    };

    const handleChangeProvince = (value: string) => {
        dispatch(setProvince(value));
    };

    const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = e.target;
        const checkedIds = city;
        let newCheckedIds = [];

        if (checked) {
            newCheckedIds = [...checkedIds, value];
        } else {
            newCheckedIds = checkedIds.filter((item) => item !== value);
        }

        dispatch(setCity(newCheckedIds));
    };

    useEffect(() => {
        if (province) {
            refetchCities();
        }
    }, [province]);

    return (
        <div>
            <div className="flex items-center gap-x-2">
                <label className="font-semibold">Location</label>
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            )}
                        </svg>
                    </a>
                </div>
            </div>

            {show && (
                <ul>
                    {provinces?.data.map((item) => (
                        <li key={item.id}>
                            <a
                                className={classNames("cursor-pointer font-medium", {
                                    "font-semibold": province === item.id,
                                })}
                                onClick={() => handleChangeProvince(item.id)}
                            >
                                {item.name}
                            </a>
                            {/* only render for selected province only */}
                            {item.id === province && (
                                <ul className="pl-4">
                                    {cities?.data.map((item) => (
                                        <li key={item.id}>
                                            <input
                                                checked={city.includes(item.id) || false}
                                                onChange={handleChangeCity}
                                                value={item.id}
                                                type="checkbox"
                                                className="w-4 h-4 cursor-pointer"
                                            />
                                            <span className="ml-2 font-medium">{item.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Location;
