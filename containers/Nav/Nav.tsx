import React from "react";
import Link from "next/link";

interface NavProps {}

const Nav: React.FC<NavProps> = ({}) => {
    return (
        <nav className="h-16 flex flex-row justify-center items-center bg-gray-100 w-full">
            <div className="font-semibold">
                <Link href="/">
                    <a className="mx-4">Home</a>
                </Link>

                <Link href="/user">
                    <a className="mx-4">Profile</a>
                </Link>

                <Link href="/">
                    <a className="mx-4">Categories</a>
                </Link>
                {/* <Link href={{ pathname: session ? "/createListing" : "/api/auth/signin" }}>
                    <a
                        className="mx-4 text-blue-500"
                        onClick={(e) => {
                            if (!session) {
                                e.preventDefault();
                                signIn(undefined, { callbackUrl: "http://localhost:3000/createListing" });
                            }
                        }}
                    >
                        Post Ad
                    </a>
                </Link>

                <Link href="/api/auth/signin">
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            signIn();
                        }}
                    >
                        Sign in
                    </a>
                </Link> */}
            </div>
        </nav>
    );
};

export default Nav;
