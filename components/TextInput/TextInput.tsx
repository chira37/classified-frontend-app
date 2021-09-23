import React, { InputHTMLAttributes } from "react";
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    inputClassName?: string;
    containerClassName?: string;
    error?: string;
    label?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    ({ id, inputClassName, containerClassName, placeholder, error, type, label, disabled, ...rest }, ref) => (
        <div className={`textinput-container ${containerClassName}`}>
            {label && <label className="pl-1 text-sm font-semibold mb-1">{label}</label>}
            <input
                {...rest}
                disabled={disabled}
                ref={ref}
                type={type}
                className={`textinput-base  ${inputClassName}`}
                placeholder={placeholder}
            />
            {error && <label className="text-red-500 pl-1 text-sm font-medium mt-1">{error}</label>}
        </div>
    )
);

TextInput.displayName = "TextInput";

export default TextInput;
