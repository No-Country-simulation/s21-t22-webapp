import { Autocomplete, TextField } from "@mui/material";

interface Option {
  id: string;
  name: string;
}

interface Props {
  value: Option | null;
  onChange: (value: Option | null) => void;
  options: Option[];
  onSearch: (query: string) => void;
  onBlur?: () => void;
  placeholder: string;
}

const CustomAutocomplete: React.FC<Props> = ({
  value,
  onChange,
  options,
  onBlur,
  onSearch,
  placeholder,
}) => {
  return (
    <Autocomplete
      fullWidth
      options={options}
      noOptionsText="No se encontraron resultados"
      getOptionLabel={(option) => option.name} // Muestra el nombre de la opción
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
      onBlur={onBlur}
    />
  );
};

export default CustomAutocomplete;
