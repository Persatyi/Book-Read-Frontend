import DatePicker, { registerLocale } from "react-datepicker";
import { useField, useFormikContext } from "formik";
import "react-datepicker/dist/react-datepicker.css";

import uk from "date-fns/locale/uk";
import us from "date-fns/locale/en-US";

registerLocale("uk-UA", uk);
registerLocale("en-US", us);

const DatePickerField = ({ onChangeCb, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(value) => {
        setFieldValue(field.name, value);
        onChangeCb(value);
      }}
    />
  );
};
export default DatePickerField;
