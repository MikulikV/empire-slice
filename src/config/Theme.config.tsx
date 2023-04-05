import { createTheme, Rating, styled, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fe5f1e",
    },
  },
});

// Color for rating in PizzaInfo
export const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: "gold",
  },
});

type ThemePropType = {
  children: JSX.Element
};

export const ThemeConfig: React.FC<ThemePropType> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

