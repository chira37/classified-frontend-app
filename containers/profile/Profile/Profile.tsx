import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/dist/client/router";
import Account from "../c/Account";
import Security from "../c/Security";

const getContent = (type: string) => {
    switch (type) {
        case "account":
            return <Account />;
        case "security":
            return <Security />;
        default:
            return <Account />;
    }
};

const Profile: React.FC = () => {
    const router = useRouter();
    const profileType = router.query.type;

    const type =
        profileType === "account" || profileType === "security" || profileType === "ads" ? profileType : "account";

    return (
        <div className="flex flex-row items-center justify-center py-10 bg-gray-50">
            <div className="max-w-screen-md w-full px-3 md:px-0">
                <h2 className="title-1 mb-10">Profile</h2>
                <div className="md:grid grid-cols-7 md:gap-3">
                    <div className="mb-5 md:mb-0 md:col-span-2">
                        <ul className="flex md:flex-col">
                            <li>
                                <Link href="/profile/account">
                                    <a
                                        className={classNames(
                                            "px-3 py-2 transition-colors duration-200 relative block text-gray-500",
                                            {
                                                "text-primary  border-b-2 border-primary hover:text-primary-dark md:border-l-2 md:border-b-0":
                                                    type === "account",
                                            },
                                            { "hover:text-black": type !== "account" }
                                        )}
                                    >
                                        <span className="relative font-semibold">Account</span>
                                    </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/profile/security">
                                    <a
                                        className={classNames(
                                            "px-3 py-2 transition-colors duration-200 relative block text-gray-500",
                                            {
                                                "text-primary  border-b-2 border-primary hover:text-primary-dark md:border-l-2 md:border-b-0":
                                                    type === "security",
                                            },
                                            { "hover:text-black": type !== "security" }
                                        )}
                                    >
                                        <span className="relative font-semibold">Security</span>
                                    </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/profile/ads">
                                    <a
                                        className={classNames(
                                            "px-3 py-2 transition-colors duration-200 relative block text-gray-500",
                                            {
                                                "text-primary  border-b-2 border-primary hover:text-primary-dark md:border-l-2 md:border-b-0":
                                                    type === "ads",
                                            },
                                            { "hover:text-black": type !== "ads" }
                                        )}
                                    >
                                        <span className="relative font-semibold">Ads</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-5">{getContent(type)}</div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
