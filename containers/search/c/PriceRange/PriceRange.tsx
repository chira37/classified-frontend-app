import Button from "@components/Button";
import { setPriceFrom, setPriceTo } from "@redux/slices/searchSlice";
import { useAppDispatch, useAppSelector } from "@redux/store";
import React, { useState } from "react";

interface PriceRnageProps {
    onApply: () => void;
}

const PriceRange: React.FC<PriceRnageProps> = ({ onApply }) => {
    const dispatch = useAppDispatch();

    const { priceFrom, priceTo } = useAppSelector((state) => state.search);

    const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPriceFrom(e.target.value));
    };

    const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPriceTo(e.target.value));
    };

    return (
        <div>
            <label className="font-semibold">Price</label>
            <div className="flex gap-x-2 items-center">
                <input
                    value={priceFrom}
                    onChange={handleMin}
                    className="border-2 w-16 py-1 px-1 font-medium rounded-md"
                />
                -
                <input
                    value={priceTo}
                    onChange={handleMax}
                    className="border-2 w-16 py-1 px-1 font-medium rounded-md"
                />
            </div>
            <Button onClick={onApply} className="py-1 mt-4">
                Apply
            </Button>
        </div>
    );
};

export default PriceRange;
