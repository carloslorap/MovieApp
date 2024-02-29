export const Message = ({ label, placeholder, name, register, bg }) => {
  return (
    <div className="text-sm w-full">
      <label className="text-border font-semibold">{label}</label>
      <textarea
        className={`w-full h-40  mt-2 p-6 border border-dry rounded ${
          bg ? "bg-main" : "bg-dry"
        }`}
        placeholder={placeholder}
        {...register}
        name={name}
      ></textarea>
    </div>
  );
};

export const Select = ({ label, options, register, name, bg }) => {
  return (
    <>
      <label className="text-border font-semibold">{label}</label>
      <select
        className={`w-full mt-2 px-6 py-4 text-text border border-dry rounded ${
          bg ? "bg-main" : "bg-dry"
        }`}
        {...register}
        name={name}
      >
        {options.map((o, i) => (
          <option key={i} value={o?.value} className="border border-main">
            {o?.title}
          </option>
        ))}
      </select>
    </>
  );
};

export const Input = ({
  label,
  placeholder,
  type,
  bg,
  register,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="text-sm w-full">
      <label className="text-border font-semibold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        {...register}
        value={value}
        onChange={onChange}
        className={`w-full text-sm mt-2 p-5 border border-main rounded text-white ${
          bg ? "bg-main" : "bg-dry"
        }`}
      />
    </div>
  );
};
