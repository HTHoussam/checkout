const ErrorSpan = ({ message }: { message: string }) => {
  return <div className="bg-red-400 text-lg w-full h-10 mt-1 rounded-md p-2 text-center capitalize">{message}</div>;
};
export default ErrorSpan;
