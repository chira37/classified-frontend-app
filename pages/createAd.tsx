import CreateAd from "@containers/createAd/CreateAd";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    return {
        props: { name: "test name" },
    };
};

export default CreateAd;
