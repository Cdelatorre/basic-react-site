const Input = ({ textLabel, value, name, onChange, type, error, placeholder }) => {
  return (
    <>
      <label className="form-label">{textLabel}</label>
      <input placeholder={placeholder} value={value} name={name} onChange={onChange} type={type} className="form-control" />
      {error && <p className="text-small text-danger">{error}</p>}
    </>
  );
};

export default Input;
