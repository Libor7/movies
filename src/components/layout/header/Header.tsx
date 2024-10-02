/** COMPONENTS */
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

/** LIBRARIES */
import { useCallback, useContext, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

/** MODELS */
import { CONTENT } from "../../../model/constants";
import { HeaderType, INavLink, ISettings } from "../../../model/Movie";

/** OTHER */
import useWindowSize from "../../../hooks/useWindowSize";
import { MovieContext } from "../../../store/MovieContext";

const navigation: INavLink[] = [
  {
    label: "Movies",
    to: "movies",
  },
  {
    label: "Favorites",
    to: "favorite-movies",
  },
];

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  "&": {
    color: theme.palette.primary.light,
  },
  "&.active": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.dark,
  },
  "&:focus-visible": {
    outline: "unset",
    outlineOffset: "unset",
  },
}));

const Header = () => {
  const { miscellaneousData, changeMiscellaneousData } =
    useContext(MovieContext);
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
  const [anchorElSettings, setAnchorElSettings] = useState<HTMLElement | null>(
    null
  );
  const { isExtraSmall, isSmall } = useWindowSize();
  const { palette } = useTheme();
  const { primary } = palette;

  const appName =
    isExtraSmall || isSmall ? CONTENT.APP_NAME_MOBILE : CONTENT.APP_NAME;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenSettingsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSettings(event.currentTarget);
  };

  const handleCloseSettingsMenu = () => {
    setAnchorElSettings(null);
  };

  const toggleHeaderFixation = useCallback(() => {
    const newPosition =
      miscellaneousData.headerPosition === HeaderType.STATIC
        ? HeaderType.FIXED
        : HeaderType.STATIC;
    changeMiscellaneousData("headerPosition", newPosition);
    handleCloseSettingsMenu();
  }, [changeMiscellaneousData, miscellaneousData.headerPosition]);

  const settings: ISettings[] = useMemo(
    () => [
      {
        label: "Fix Header",
        clickHandler: toggleHeaderFixation,
      },
    ],
    [toggleHeaderFixation]
  );

  return (
    <AppBar position={miscellaneousData.headerPosition}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              letterSpacing: "0.3rem",
            }}
          >
            {appName}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="aplication navigation"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {navigation.map((link) => (
                <StyledNavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {link.label}
                    </Typography>
                  </MenuItem>
                </StyledNavLink>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: { xs: 0, md: 2 },
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              letterSpacing: "0.3rem",
            }}
          >
            {appName}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navigation.map((link) => (
              <StyledNavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {link.label}
                </Button>
              </StyledNavLink>
            ))}
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", sm: "none" },
              justifyContent: { xs: "flex-end", sm: "unset" },
            }}
          >
            <IconButton
              size="large"
              aria-label="aplication settings"
              aria-controls="menu-settings"
              aria-haspopup="true"
              onClick={handleOpenSettingsMenu}
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="menu-settings"
              anchorEl={anchorElSettings}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElSettings)}
              onClose={handleCloseSettingsMenu}
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              {settings.map(({ label, clickHandler }) => (
                <Button
                  key={label}
                  onClick={clickHandler}
                  sx={{ color: primary.main, display: "block" }}
                >
                  {label}
                </Button>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
