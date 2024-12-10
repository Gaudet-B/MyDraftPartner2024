export function FormInput({
  name,
  type,
  value,
  handleChange,
}: {
  name: string;
  type: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="col-span-2 flex justify-start">
      <input
        name={name}
        type={type}
        value={value}
        className={`w-4/5 rounded border border-black bg-sky-100 p-1 font-semibold text-sky-900`}
        onChange={handleChange}
      />
    </div>
  );
}
