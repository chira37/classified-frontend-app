/* eslint-disable import/prefer-default-export */
import http from "@api/http";

export const defaultQueryFn = async ({ queryKey }: any) => {
    const { data } = await http.get(`${queryKey[0]}`);
    return data;
};
