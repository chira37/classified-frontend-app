import React from "react";
import CheckboxGroup from "../CheckboxGroup";
import extras from "@data/extra";
import PriceRange from "../PriceRange";
import categories from "@data/category";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { setCategory } from "@redux/slices/searchSlice";
import Location from "../Location";

interface SidebarProps {
    onApply: () => void;
    onToggleFilter?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onApply, onToggleFilter }) => {
    const { category } = useAppSelector((state) => state.search);
    const dispatch = useAppDispatch();

    const handleSelelctCategory = (value: string) => {
        dispatch(setCategory(value));
    };

    return (
        <div className="z-50">
            <div>
                <button onClick={onToggleFilter}>close</button>
            </div>
            <div>
                <div>
                    <h4>Categories</h4>
                    <ul>
                        {categories.map((category) => (
                            <li key={category.id}>
                                <a className="cursor-pointer" onClick={() => handleSelelctCategory(category.id)}>
                                    {category.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <CheckboxGroup
                    id="condition"
                    name="Condition"
                    options={[
                        { id: "new", name: "New" },
                        { id: "used", name: "Used" },
                    ]}
                />

                <div className="flex">
                    <PriceRange onApply={onApply} />
                </div>

                <Location />

                {extras.map((item) => (
                    <CheckboxGroup key={item.id} id={item.id} name={item.name} options={item.options} />
                ))}

            </div>
        </div>
    );
};

export default Sidebar;
