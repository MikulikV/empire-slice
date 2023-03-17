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

export const ThemeConfig: React.FC<ThemePropType> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

