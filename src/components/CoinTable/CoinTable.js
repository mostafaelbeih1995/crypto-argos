import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Container } from "@mui/system";
import { LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

const CoinTable = () => {

    const navigate = useNavigate();
    
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState();

    const { currency }  = CryptoState();

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }

    console.log(coins);

    
    useEffect(() => {
        fetchCoins()
    }, [currency]);
    
    const theme = createTheme({
        palette: {
            primary: {
            main: "#C7C317",
            },
            type: "dark",
        },
    });

    const handleSearch = () => {
        return CoinList.filter((coin) => (
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        ));
    }

    return (
        <ThemeProvider theme={theme}>
            <Container style={{textAlign: "center", color: "white"}}>
                <Typography variant="h4" style={{margin: 18, fontFamily: "Montserrat"}}>
                    Crypto currency Prices by Market Cap
                </Typography>
                <TextField label="Search For a Crypto Currency.." variant="outlined"
                style={{marginBottom: 20, width: "100%"}}>
                onChange= {(e) => setSearch(e.target.value)}
                </TextField>
                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress style={{backgroundColor: "gold"}}/>
                        ) : (
                                <Table>
                                    <TableHead style={{backgroundColor: "#C7C317"}}>
                                        <TableRow>
                                            {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                                <TableCell style={{
                                                    color: "black",
                                                    fontWeight: "700",
                                                    fontFamily: "Montserrat",
                                                }}
                                                    key={head}
                                                    align={head === "Coin" ? "" : "right"}
                                                >
                                                    {head}

                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    {/* <TableBody >
                                        {handleSearch().map(row => {
                                            const profit = row.price_change_24h > 0;
                                            return (
                                                <TableRow>
                                                    onClick= { () => navigate(`/coins/${row.id}`)}
                                                    key= {row.name}
                                                    <TableCell component="th" scope="row"
                                                        style={{
                                                            display: "flex",
                                                            gap: 15
                                                        }}
                                                    >
                                                        <img
                                                            src={row?.image}
                                                            alt={row?.name}
                                                            height= "50"
                                                            style={{
                                                                marginBottom:10 
                                                            }}/>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody> */}
                                </Table>
                        )
                    }
                </TableContainer>
            </Container>
        </ThemeProvider>
    );
}

export default CoinTable;
