import React from "react";

interface ButtonProps {
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
    return <button>{children}</button>;
};

export default Button;
