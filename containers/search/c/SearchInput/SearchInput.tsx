import Button from "@components/Button";
import TextInput from "@components/TextInput";
import { setSearchText } from "@redux/slices/searchSlice";
import { useAppDispatch, useAppSelector } from "@redux/store";
import React, { useState } from "react";

interface SearchInputProps {
    onSearch: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
    const dispatch = useAppDispatch();

    const { searchText } = useAppSelector((state) => state.search);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchText(e.target.value));
    };

    const handleOnSearch = () => {
        onSearch(searchText);
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearch(searchText);
        }
    };

    return (
        <div className="flex items-center">
            <TextInput
                value={searchText}
                containerClassName="mb-0 w-full"
                inputClassName="rounded-tr-none rounded-br-none focus:outline-none focus:border-primary"
                onChange={handleOnChange}
                onKeyUp={handleKeyUp}
            />
            <Button onClick={handleOnSearch} className="rounded-tl-none rounded-bl-none">
                SEARCH
            </Button>
        </div>
    );
};

export default SearchInput;
