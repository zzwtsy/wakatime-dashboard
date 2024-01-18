import { ToggleGroup } from "roku-ui";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleGroup
      data={["system", "light", "dark"]}
      value={theme}
      setValue={setTheme}
    />
  );
}
