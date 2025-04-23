import React from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';

interface PasswordInputProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
                                                         name,
                                                         value,
                                                         onChange,
                                                         placeholder = "Enter your password",
                                                         className,
                                                     }) => {
    return (
        <Input.Password
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
        />
    );
};

export default PasswordInput;
