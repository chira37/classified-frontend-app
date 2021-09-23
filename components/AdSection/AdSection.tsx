import AdPost from "@components/AdPost";
import React from "react";
import ReactPaginate from "react-paginate";
import { Pagination } from "types";
import { Ad } from "types/models";

interface AdSectionProps {
    onPageChange: (pageNumber: number) => void;
    pagination?: Pagination;
    loading?: boolean;
    data: Array<Ad>;
}

const AdSection: React.FC<AdSectionProps> = ({ onPageChange, pagination, data = [], loading }) => {
    const showPagination = pagination && !loading && data.length > 0;

    return (
        <div className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-5">
                {data.map((item) => (
                    <AdPost
                        key={item.id}
                        title={item.title}
                        province={item.province_id.name}
                        city={item.city_id.name}
                        price={item.price}
                    />
                ))}
            </div>

            {showPagination && (
                <div className="flex justify-center">
                    <ReactPaginate
                        previousLabel="<"
                        previousClassName="bg-white w-10 h-10 font-medium shadow rounded-md flex items-center justify-center"
                        nextClassName="bg-white w-10 h-10 font-medium shadow rounded-md flex items-center justify-center"
                        pageClassName="bg-white w-10 h-10 font-medium shadow rounded-md flex items-center justify-center"
                        activeLinkClassName="bg-primary text-white font-medium shadow w-10 h-10 rounded-md flex items-center justify-center"
                        nextLabel=">"
                        breakClassName="bg-white w-10 h-10 font-medium shadow rounded-md flex items-center justify-center"
                        onPageChange={(page) => onPageChange(page.selected + 1)}
                        containerClassName="flex flex-row gap-x-2"
                        forcePage={pagination.current_page - 1}
                        pageCount={pagination.total_pages}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={1}
                    />
                </div>
            )}
        </div>
    );
};

export default AdSection;
