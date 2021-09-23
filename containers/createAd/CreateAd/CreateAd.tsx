import React, { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@components/TextInput";
import Select from "@components/Select";
import Upload from "@components/Upload";
import Button from "@components/Button";
import { useForm, Controller, NestedValue, useFieldArray } from "react-hook-form";
import schema from "./schema";
import { useMutation } from "react-query";
import { AxiosResponse } from "axios";
import http from "@api/http";
import { Extra, Option } from "types";

import allCategories from "@data/category";
import allBrands from "@data/brand";
import allExtras from "@data/extra";

interface FormValues {
    category_id: string;
    brand_id: string;
    model: string;
    title: string;
    description: string;
    condition: string;
    price: string;
    images: [];
    city_id: string;
    province_id: string;
    phone_no_1: string;
    phone_no_2: string;
    extras: { [key: string]: string };
    active: boolean;
}

const CreateAd: React.FC = () => {
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [brands, setBrands] = useState<any>([]);
    const [extras, setExtras] = useState<any>([]);

    const brandRef = useRef(null);
    const cityRef = useRef(null);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        unregister,
    } = useForm<FormValues>({ defaultValues: { active: true }, resolver: yupResolver(schema) });

    const { mutate, isLoading } = useMutation<AxiosResponse, unknown, FormValues>(
        (formData) => http.post("/ad", formData),
        {
            onSuccess: (res) => {
                const { data } = res.data;
            },
        }
    );

    const handleSubmitAd = handleSubmit((data) => mutate(data));

    const handleSelectProvince = async (value: string) => {
        clearSelected(cityRef);
        try {
            const { data } = await http.get(`/city/city-by-province/${value}`);
            setCities(data?.data);
        } catch (error) {
            setCities([]);
        }
    };

    const clearSelected = (ref: any) => {
        try {
            ref?.current?.select?.clearValue();
        } catch (error) {
            // do nothing
        }
    };

    const handleOnSelectCategory = (value: string) => {
        unregister();
        const selectedBrands = allBrands.filter((item) => item.category_id.includes(value));
        const selectedExtras = allExtras.filter((item) => item.category_id === value);
        setBrands(selectedBrands);
        setExtras(selectedExtras);
        clearSelected(brandRef);
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const { data } = await http.get("/province");
                setProvinces(data.data);
            } catch (error) {
                setProvinces([]);
            }
        };

        fetchInitialData();
    }, []);

    return (
        <div className="flex flex-row items-center justify-center py-10 bg-gray-50">
            <div className="max-w-screen-md w-full px-3 md:px-0">
                <h2 className="title-1 mb-10">Create Ad</h2>
                <form onSubmit={handleSubmitAd} className="mb-10 bg-white p-10 rounded-md filter shadow">
                    <div className="md:grid grid-cols-2 gap-4">
                        <Controller
                            name="category_id"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Category"
                                    placeholder="Select category..."
                                    error={errors?.category_id?.message}
                                    options={allCategories}
                                    onChange={(selectedOption: Option) => {
                                        handleOnSelectCategory(selectedOption.id);
                                        field.onChange(selectedOption.id);
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div className="md:grid grid-cols-2 gap-4">
                        <Controller
                            name="brand_id"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    ref={brandRef}
                                    label="Brand"
                                    placeholder="Select brand..."
                                    error={errors?.brand_id?.message}
                                    options={brands}
                                    onChange={(selectedOption: Option) => {
                                        field.onChange(selectedOption?.id);
                                    }}
                                />
                            )}
                        />

                        <TextInput
                            {...register("model")}
                            label="Model"
                            error={errors?.model?.message}
                            placeholder="Model"
                        />
                    </div>
                    <div>
                        <label className="pl-1 text-sm font-semibold ">Location</label>
                        <div className="md:grid grid-cols-2 gap-4">
                            <Controller
                                name="province_id"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        placeholder="Select district..."
                                        error={errors?.province_id?.message}
                                        options={provinces}
                                        onChange={(selectedOption: Option) => {
                                            handleSelectProvince(selectedOption.id);
                                            field.onChange(selectedOption.id);
                                        }}
                                    />
                                )}
                            />

                            <Controller
                                name="city_id"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        ref={cityRef}
                                        placeholder="Select city..."
                                        error={errors?.city_id?.message}
                                        options={cities}
                                        onChange={(selectedOption: Option) => {
                                            field.onChange(selectedOption.id);
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <TextInput
                        {...register("title")}
                        label="Title"
                        error={errors?.title?.message}
                        placeholder="Title"
                    />
                    <div className="flex-row mb-5">
                        <label className="pl-1 text-sm font-semibold">Drescription</label>
                        <textarea
                            placeholder="description"
                            className="mt-1 py-2 px-2 border-2 text-sm font-medium rounded-md w-full"
                            {...register("description")}
                        />
                        {errors?.description?.message && (
                            <label className="text-red-500 pl-1 text-sm font-medium mt-1">
                                {errors.description.message}
                            </label>
                        )}
                    </div>
                    <div className="flex">
                        <Controller
                            name="images"
                            control={control}
                            render={({ field }) => (
                                <Upload label="Images" onChange={(value) => field.onChange(value)} />
                            )}
                        />
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        <TextInput
                            label="Price"
                            type="number"
                            {...register("price")}
                            error={errors?.price?.message}
                            placeholder="Price"
                        />
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        <Controller
                            name="condition"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Condition"
                                    placeholder="Select condition..."
                                    error={errors?.condition?.message}
                                    options={[
                                        { id: "new", name: "New" },
                                        { id: "used", name: "Used" },
                                    ]}
                                    onChange={(selectedOption: Option) => {
                                        field.onChange(selectedOption.id);
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div>
                        <label className="pl-1 text-sm font-semibold ">Phone numbers</label>
                        <div className="md:grid grid-cols-2 gap-x-5 mt-1">
                            <TextInput
                                {...register("phone_no_1")}
                                error={errors?.phone_no_1?.message}
                                placeholder="Phone no 1"
                            />

                            <TextInput
                                {...register("phone_no_2")}
                                error={errors?.phone_no_2?.message}
                                placeholder="Phone no 2"
                            />
                        </div>
                    </div>

                    <div className="md:grid grid-cols-2 gap-x-5">
                        {extras.map((item: Extra) => (
                            <Controller
                                key={item.id}
                                name={`extras.${item.id}`}
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        key={item.id}
                                        label={item.name}
                                        placeholder="Select category..."
                                        error={errors?.extras?.[item.id]?.message}
                                        options={item.options}
                                        onChange={(selectedOption: Option) => {
                                            field.onChange(selectedOption.id);
                                        }}
                                    />
                                )}
                            />
                        ))}
                    </div>

                    <div className="flex justify-end">
                        <Button loading={isLoading} type="submit">
                            SUBMIT
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAd;
