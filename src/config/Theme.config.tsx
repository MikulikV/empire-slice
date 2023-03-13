import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fe5f1e",
    },
  },
});

type ThemePropType = {
  children: JSX.Element
};

const ThemeConfig: React.FC<ThemePropType> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeConfig;
