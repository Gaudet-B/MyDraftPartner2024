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
    <div>
      <input
        name={name}
        type={type}
        value={value}
        className={`w-full rounded border border-black bg-sky-100 p-1 font-semibold text-sky-900`}
        onChange={handleChange}
      />
    </div>
  );
}
