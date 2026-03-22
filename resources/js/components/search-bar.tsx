import { Search } from 'lucide-react';
import { Input } from './ui/input';

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({
  value = '',
  onChange,
  placeholder = 'Search here',
  className = '',
}: SearchBarProps) => {
  return (
    <div className={`flex w-full items-center gap-2 rounded-md border px-3 ${className}`.trim()}>
      <Search size={18} className="shrink-0 text-gray-400" />
      <Input
        type="text"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className="border-0 px-0 shadow-none focus-visible:ring-0"
      />
    </div>
  );
};

export default SearchBar;
