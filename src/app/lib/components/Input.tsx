export const Input = (props: {
  id?: string;
  type: string;
  placeholder: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange: (e: any) => void;
}) => {
  return (
    <input
      className='w-12 bg-transparent input-xs text-lg placeholder:text-secondary-content'
      {...props}
    />
  );
};
