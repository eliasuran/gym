export default function EntryForm(props: {
  setShow: (showLogin: boolean) => void;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    values: string[],
  ) => Promise<void>;
  values: string[];
  children: React.ReactNode;
}) {
  return (
    <>
      <form
        onSubmit={async (e) => await props.handleSubmit(e, props.values)}
        className='z-50 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  p-4 flex flex-col justify-center items-center gap-4 text-green-900'
      >
        {props.children}
        <button type='submit'>Login</button>
      </form>
      <div
        className='fixed z-40 inset-0 bg-black/70'
        onClick={() => props.setShow(false)}
      ></div>
    </>
  );
}
