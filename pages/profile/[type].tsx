import Profile from "@containers/profile/Profile";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    return {
        props: { name: "test name" },
    };
};

export default Profile;
