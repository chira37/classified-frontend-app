import Button from "@components/Button";
import TextInput from "@components/TextInput";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";

const SearchInput: React.FC = () => {
    const [searchText, setSearchText] = useState<string>("");

    const router = useRouter();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            router.push(`/search?searchText=${searchText}`);
        }
    };

    const handleOnSearch = () => {
        router.push(`/search?searchText=${searchText}`);
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
            <Button onClick={handleOnSearch} className="rounded-tl-none rounded-bl-none ">
                SEARCH
            </Button>
        </div>
    );
};

export default SearchInput;
