export type Option = {
    id: string;
    name: any;
};

export interface Extra {
    category_id: string;
    id: string;
    name: string;
    options: string;
}

export interface WindowSize {
    height: number;
    width: number;
}

export interface QueryResponse<T> {
    data: T;
    message: string;
    success: boolean;
    pagination?: Pagination;
}
export interface Pagination {
    total_pages: number;
    current_page: number;
    next_page: number;
    previous_page: number;
    total_items: number;
}
