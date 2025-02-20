import { Autocomplete, TextField } from "@mui/material";

interface Props {
  value: string | null;
  onChange: (value: string | null) => void;
  options: string[];
  onSearch: (query: string) => void;
  placeholder: string;
}

const CustomAutocomplete: React.FC<Props> = ({
  value,
  onChange,
  options,
  onSearch,
  placeholder,
}) => {
  return (
    <Autocomplete
      fullWidth
      options={options}
      noOptionsText="No se encontraron resultados"
      onInputChange={(_, newInputValue) => {
        if (newInputValue === "") {
          onSearch("");
        } else {
          onSearch(newInputValue);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder={placeholder}
          sx={{ bgcolor: "white", borderRadius: 1 }}
          slotProps={{
            inputLabel: { shrink: false },
          }}
        />
      )}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
    />
  );
};

export default CustomAutocomplete;
