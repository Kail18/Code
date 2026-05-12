type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
};

export default function SearchBox({ value, onChange, label }: SearchBoxProps) {
  return (
    <input
      className="form-control mb-3 search-input"
      placeholder={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
