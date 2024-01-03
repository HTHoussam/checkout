interface InputWrapperProps {
  name: string;
  type: string;
  label: string;
}
const InputWrapper = ({ name, type, label }: InputWrapperProps) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <label htmlFor="card-number">{label} </label>
      <input className="h-8 rounded-md " name={name} type={type} />
    </div>
  );
};
export default InputWrapper;
