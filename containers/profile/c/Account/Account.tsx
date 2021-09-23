import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@components/Button/Button";
import { useForm } from "react-hook-form";
import { personalDetailsScehma, emailScehma } from "./schema";
import { useMutation, useQuery } from "react-query";
import http from "@api/http";
import { AxiosResponse } from "axios";
import TextInput from "@components/TextInput";
import { useAppSelector } from "@redux/store";
import { QueryResponse } from "types";
import { Address, User } from "types/models";

interface AccountProps {}

type EmailFormValues = {
    email: string;
};

type PersonalDetailsFormValues = {
    first_name: string;
    last_name: string;
    phone_no_1: string;
    phone_no_2: string;
    address_1: Address;
    address_2: Address;
    profile_image: string;
};

const Account: React.FC<AccountProps> = () => {
    const { id } = useAppSelector((state) => state.user);

    /**
     *  hooks forms
     */
    const {
        register: registerEmail,
        handleSubmit: hadleSubmitEamil,
        formState: { errors: emailErrors },
        reset: resetEmail,
    } = useForm<EmailFormValues>({ resolver: yupResolver(emailScehma) });

    const {
        register: registerPersonalDetails,
        handleSubmit: handleSubmitPersonalDetails,
        formState: { errors: personalDetailsErrors },
        reset: resetPersonalDetails,
    } = useForm<PersonalDetailsFormValues>({ resolver: yupResolver(personalDetailsScehma) });

    /**
     *  submit request
     */
    const { mutate: mutatePersonalDetails, isLoading: isLoadingpersonalDetailsForm } = useMutation<
        AxiosResponse,
        unknown,
        PersonalDetailsFormValues
    >((formData) => http.put(`/user/${id}`, formData), {
        onSuccess: (res) => {
            console.log(res.data);
        },
    });

    const { mutate: mutateEmail, isLoading: isLoadingEmail } = useMutation<AxiosResponse, unknown, EmailFormValues>(
        (formData) => http.put("/user/update-email/", formData),
        {
            onSuccess: (res) => {
                console.log(res.data);
            },
        }
    );

    /**
     * fetch user data
     */
    const { data } = useQuery<QueryResponse<User>>(`/user/${id}`, {
        refetchOnWindowFocus: false,
        onSuccess: ({ data }) => {
            if (data) {
                resetPersonalDetails({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    phone_no_1: data.phone_no_1,
                    phone_no_2: data.phone_no_2,
                    address_1: data.address_1,
                    address_2: data.address_2,
                });

                resetEmail({ email: data.email });
            }
        },
    });

    /**
     *  handle submit
     */
    const handleUpdatePeresonalDetails = handleSubmitPersonalDetails((data) => {
        mutatePersonalDetails(data);
    });

    const handleUpdateEmail = hadleSubmitEamil((data) => {
        mutateEmail(data);
    });


    useEffect(() => {
        console.log("render")
    }, [])

    return (
        <div className="">
            <form onSubmit={handleUpdateEmail} className="mb-10 bg-white p-10 rounded-md filter shadow">
                <div className="mb-5">
                    <h4 className="subtitle-3 mb-3">Email</h4>

                    <TextInput placeholder="Email" {...registerEmail("email")} error={emailErrors?.email?.message} />
                </div>

                <div className="flex justify-end">
                    <Button loading={isLoadingEmail} type="submit">
                        Update Email
                    </Button>
                </div>
            </form>

            <form onSubmit={handleUpdatePeresonalDetails} className="mb-20 bg-white p-10 rounded-md shadow">
                <div className="md:grid grid-cols-2 gap-4">
                    <TextInput
                        placeholder="First Name"
                        {...registerPersonalDetails("first_name")}
                        error={personalDetailsErrors?.first_name?.message}
                    />
                    <TextInput
                        placeholder="Last Name"
                        {...registerPersonalDetails("last_name")}
                        error={personalDetailsErrors?.last_name?.message}
                    />
                </div>

                <div className="md:grid grid-cols-2 gap-4">
                    <TextInput
                        placeholder="Phone no 1"
                        {...registerPersonalDetails("phone_no_1")}
                        error={personalDetailsErrors?.phone_no_1?.message}
                    />
                    <TextInput
                        placeholder="Phone no 2"
                        {...registerPersonalDetails("phone_no_2")}
                        error={personalDetailsErrors?.phone_no_2?.message}
                    />
                </div>

                <div className="mb-5">
                    <h4 className="subtitle-3 mb-3">Address - 1</h4>
                    <div className="md:grid grid-cols-2 gap-4">
                        <TextInput
                            placeholder="Line 1"
                            {...registerPersonalDetails("address_1.line_1")}
                            error={personalDetailsErrors?.address_1?.line_1?.message}
                        />
                        <TextInput
                            placeholder="Line 2"
                            {...registerPersonalDetails("address_1.line_2")}
                            error={personalDetailsErrors?.address_1?.line_2?.message}
                        />
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        <TextInput
                            placeholder="City"
                            {...registerPersonalDetails("address_1.city")}
                            error={personalDetailsErrors?.address_1?.city?.message}
                        />
                        <TextInput
                            placeholder="Province"
                            {...registerPersonalDetails("address_1.province")}
                            error={personalDetailsErrors?.address_1?.province?.message}
                        />
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        <TextInput
                            placeholder="ZIP code"
                            {...registerPersonalDetails("address_1.zip_code")}
                            error={personalDetailsErrors?.address_1?.zip_code?.message}
                        />
                    </div>
                </div>

                <div className="mb-5">
                    <h4 className="subtitle-3 mb-3">Address - 2</h4>
                    <div className="md:grid grid-cols-2 gap-4">
                        <TextInput
                            placeholder="Line 1"
                            {...registerPersonalDetails("address_2.line_1")}
                            error={personalDetailsErrors?.address_2?.line_1?.message}
                        />
                        <TextInput
                            placeholder="Line 2"
                            {...registerPersonalDetails("address_2.line_2")}
                            error={personalDetailsErrors?.address_2?.line_2?.message}
                        />
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        <TextInput
                            placeholder="City"
                            {...registerPersonalDetails("address_2.city")}
                            error={personalDetailsErrors?.address_2?.city?.message}
                        />
                        <TextInput
                            placeholder="Province"
                            {...registerPersonalDetails("address_2.province")}
                            error={personalDetailsErrors?.address_2?.province?.message}
                        />
                    </div>

                    <div className="md:grid grid-cols-2 gap-4">
                        <TextInput
                            placeholder="ZIP code"
                            {...registerPersonalDetails("address_2.zip_code")}
                            error={personalDetailsErrors?.address_2?.zip_code?.message}
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button loading={isLoadingpersonalDetailsForm} type="submit">
                        Save Chnages
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Account;
