
export interface InputProps {
    name: string,
    className?: string,
    value?: any,
    label?: string,
    placeholder?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}