import { ChangeEvent } from "react";

export interface InputProps {
    name: string,
    className?: string,
    value?: string,
    label?: string,
    placeholder?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}