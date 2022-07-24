import React from "react";
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Header.css';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { CryptoState } from "../CryptoContext";



const Header = () => {

    const navigate = useNavigate();
    const {currency, setCurrency} = CryptoState();

    const theme = createTheme({
        palette: {
            primary: {
            main: "#ffffff",
            },
            type: "dark",
        },
    }); 
    return (
        <ThemeProvider theme={theme}>
        <AppBar color="transparent" position="static">
            <Container>
                <Toolbar>
                        <Typography
                        variant="h6"
                        onClick={() => navigate("/")}
                        className="Title">
                        Crypto Argos
                    </Typography>

                        {/* <Select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            variant="outlined" style={{
                        width: 100,
                        height: 40,
                        marginRight: 15,
                        color: "white",
                    }}
                    >
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value ={"EGP"}>EGP</MenuItem>
                    </Select> */}
                </Toolbar>
            </Container>

            </AppBar>
            </ThemeProvider>
    )
}

export default Header;