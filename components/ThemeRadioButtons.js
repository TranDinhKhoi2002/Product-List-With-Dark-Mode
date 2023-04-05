import { EventRegister } from "react-native-event-listeners";
import { RadioButton, RadioGroup } from "react-native-radio-buttons-group";
import themes from "../config/theme";
import { useContext } from "react";
import ThemeContext from "../context/themeContext";

function ThemeRadioButtons() {
  const theme = useContext(ThemeContext);

  const onPressRadioButton = (radioButtonsArray) => {
    const selectedTheme = radioButtonsArray.find((button) => button.selected === true);
    EventRegister.emit("changeTheme", selectedTheme);
  };

  const configTheme = [...Object.values(themes)];
  configTheme.forEach((item) => {
    item.color = theme.textColor;
    item.labelStyle = {
      color: theme.textColor,
    };
  });

  return (
    <RadioGroup radioButtons={configTheme} layout="row" onPress={onPressRadioButton}>
      <RadioButton label="test" />
    </RadioGroup>
  );
}

export default ThemeRadioButtons;
