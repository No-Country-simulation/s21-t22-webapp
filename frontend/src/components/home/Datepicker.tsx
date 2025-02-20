import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface CustomDatePickerProps {
  value: Date | null;
  onChange: (value: Date | null) => void;
  placeholder: string;
  sx?: object;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  placeholder,
  sx,
}) => {
  return (
    <DatePicker
      value={value}
      onChange={onChange}
      slotProps={{
        textField: {
          placeholder: placeholder,
          sx: {
            bgcolor: "white",
            borderRadius: 1,
            width: "100%",
            maxWidth: { sm: "100%", md: "170px" },
            "& .MuiInputBase-root": {
              bgcolor: "white",
            },
            ...sx,
          },
        },
      }}
    />
  );
};

export default CustomDatePicker;
