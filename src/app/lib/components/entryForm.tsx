export default function EntryForm(props: {
  setShow: (show: boolean) => void;
  setShowOpposite: (showOpposite: boolean) => void;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    values: string[],
  ) => Promise<void>;
  values: string[];
  children: React.ReactNode;
  name: string;
}) {
  return (
    <>
      <form
        onSubmit={async (e) => await props.handleSubmit(e, props.values)}
        className='z-50 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  px-14 py-14 card flex flex-col justify-center items-center gap-4 bg-base-100 drop-shadow-xl'
      >
        <h1 className='card-title'>{props.name}</h1>
        {props.children}
        <button className='btn btn-primary w-full' type='submit'>
          {props.name}
        </button>
        {props.name === 'Login' ? (
          <div className='text-[10px] flex justify-between w-full text-primary'>
            <span
              onClick={() => {
                props.setShow(false);
                props.setShowOpposite(true);
              }}
            >
              Sign Up
            </span>
            <span>Forgot Password</span>
          </div>
        ) : (
          <span
            onClick={() => {
              props.setShow(false);
              props.setShowOpposite(true);
            }}
          >
            Log In
          </span>
        )}
      </form>
    </>
  );
}
