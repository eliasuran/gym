interface InputProps {
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue: string;
}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className='rounded-md bg-transparent border-2 border-primary outline-none'
    />
  );
};
