import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="text-subtle absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-heading border-default focus:border-accent w-full rounded-full border-2 bg-white py-3 pl-11 pr-4 text-sm transition-colors focus:outline-none"
      />
    </div>
  );
}
