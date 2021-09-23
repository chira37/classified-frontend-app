export interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_no_1: string;
    phone_no_2: string;
    address_1: Address;
    address_2: Address;
    profile_image: string;
    verified: boolean;
}

export interface Address {
    line_1: string;
    line_2: string;
    city: string;
    province: string;
    zip_code: string;
}

export interface Ad {
    id: string;
    user_id: string;
    shop_id?: string;
    category_id?: string;
    brand_id: string;
    model: string;
    url: string;
    title: string;
    description?: string;
    condition?: string;
    price: number;
    images: string[];
    city_id: { id: string; name: string };
    province_id: { id: string; name: string };
    phone_no_1?: string;
    phone_no_2?: string;
    extras?: Array<{
        [key: string]: string;
    }>;
    active?: boolean;
    status?: "reject" | "active" | "disable" | "update" | "new" | "expire";
    note?: string;
    view_count?: number;
}
