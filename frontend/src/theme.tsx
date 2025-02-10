const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: '"42dot Sans", sans-serif',
        fontSize: "22px",
        lineHeight: "1.7",
        margin: "40px",
        padding: "20px",
      },
    },
  },
  colors: {
    ui: {
      main: "#0A2540", // Deep cobalt blue
      secondary: "#EDF2F7",
      success: "#48BB78",
      danger: "#E53E3E",
      light: "#FAFAFA",
      dark: "#1A202C",
      darkSlate: "#252D3D",
      dim: "#A0AEC0",
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          backgroundColor: "ui.main",
          color: "ui.light",
          _hover: {
            backgroundColor: "#082135", // Even darker for hover
          },
          _disabled: {
            backgroundColor: "ui.main",
          },
        },
        danger: {
          backgroundColor: "ui.danger",
          color: "ui.light",
          _hover: {
            backgroundColor: "#E32727",
          },
        },
      },
    },
    Tabs: {
      variants: {
        enclosed: {
          tab: {
            _selected: {
              color: "ui.main",
            },
          },
        },
      },
    },
    Badge: {
      defaultProps: {
        colorScheme: "blue",
      },
      baseStyle: {
        container: {
          bg: "blue.500",
          color: "white",
        },
      },
    },
    Radio: {
      baseStyle: {
        control: {
          _checked: {
            bg: "ui.main",
            borderColor: "ui.main",
          },
        },
      },
    },
  },
});

export default theme;
