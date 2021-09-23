import { setPage, setSearchState, setSearchText } from "@redux/slices/searchSlice";
import { useAppDispatch, useAppSelector } from "@redux/store";
import React, { useEffect, useRef, useState } from "react";
import SearchInput from "../c/SearchInput";
import Sidebar from "../c/Sidebar";
import createSearchUrl from "@utils/createSearchUrl";
import createSearchReduxState from "@utils/createSearchReduxState";
import { useRouter } from "next/dist/client/router";
import classNames from "classnames";
import { toggleFilter } from "@redux/slices/uiSlice";
import useScreenSize from "@hooks/useScreenSize";
import PostSection from "@components/AdSection";
import { useQuery } from "react-query";
import { Pagination, QueryResponse } from "types";
import { Ad } from "types/models";
import http from "@api/http";
import { AxiosResponse } from "axios";

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
    const dispatch = useAppDispatch();
    const { filter } = useAppSelector((state) => state.ui);
    const router = useRouter();
    const isFirstRun = useRef(true);
    const { breakPoint, width } = useScreenSize();
    const [loadingAds, setLoadingAds] = useState(true);
    const [ads, setAds] = useState<Array<Ad>>([]);
    const [pagination, setPagination] = useState<Pagination>();

    const search = useAppSelector((state) => state.search);
    const { searchText, extras, category, province, city } = search;

    const handlePageChange = (pageNumber: number) => {
        dispatch(setPage(pageNumber));
    };

    const handleSearch = () => {
        SearchAds();
    };

    const handleToggleFilter = () => {
        dispatch(toggleFilter());
    };

    const SearchAds = async () => {
        const searchParams = createSearchUrl(search);
        router.push(`/search?${searchParams}`, undefined, { shallow: true });

        try {
            setLoadingAds(true);
            const { data } = await http.get<any, AxiosResponse<QueryResponse<Array<Ad>>>>(
                `/ad/search/?${searchParams}`
            );

            setPagination(data.pagination);
            setAds(data.data);
        } catch (error) {
        } finally {
            setLoadingAds(false);
        }
    };

    useEffect(() => {
        const searchParams = router.asPath.split("?")[1];
        const searchReduxState = createSearchReduxState(searchParams);
        dispatch(setSearchState(searchReduxState));
    }, []);

    useEffect(() => {
        // neglet first render
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        SearchAds();
    }, [extras, category, province, city]);

    return (
        <div className="flex flex-row items-center justify-center py-10 bg-bg-primary">
            <div className="max-w-screen-md w-full px-3 md:px-0">
                <div className="md:grid grid-cols-7 md:gap-5">
                    {width < 768 ? (
                        <div
                            className={classNames(
                                "absolute duration-300 transform translate-x-0 h-full top-0 overflow-y-auto  left-0 bg-yellow-300",
                                {
                                    "-translate-x-48": !filter,
                                }
                            )}
                        >
                            <Sidebar onToggleFilter={handleToggleFilter} onApply={SearchAds} />
                        </div>
                    ) : (
                        <div className="col-span-2 bg-white rounded-lg">
                            <Sidebar onApply={SearchAds} />
                        </div>
                    )}

                    <div className="col-span-12 sm:col-span-5 ">
                        <div className="flex flex-col gap-y-5">
                            <SearchInput onSearch={handleSearch} />
                            <div className="flex justify-between">
                                <div></div>
                                <button
                                    className="bg-white p-2 text-primary rounded-md shadow-sm transition 
                                            hover:bg-primary hover:text-white"
                                    onClick={handleToggleFilter}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                                    </svg>
                                </button>
                            </div>
                            <PostSection data={ads} onPageChange={handlePageChange} pagination={pagination} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
