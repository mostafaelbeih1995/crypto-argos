import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Container } from "@mui/system";
import { Button, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import './CoinTable.css';

import { numberWithCommas } from "../Carousel";

import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const CustomPagination = styled(Pagination)(({ theme }) => ({
    backgroundColor: "blue",
    color: "white", 
}));

const CoinTable = () => {

    const [page, setPage] = useState(1);

    const navigate = useNavigate();
    
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState();

    const { currency, symbol }  = CryptoState();

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
        if (search == null) {
            return coins
        }
        else {
            const result = coins.filter((coin) => (
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
            ));
            console.log("result", result);    
            return result;
        }
        
        
    };

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
                                    <TableBody style={{
                                        color: "red"
                                    }}>
                                        {handleSearch()
                                            .slice((page-1) * 10, (page-1) * 10 + 10)
                                            .map((row) => {
                                            const profit = row.price_change_percentage_24h > 0;
                                            return (
                                                <TableRow
                                                    className="row"
                                                    key={row.name}

                                                >
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        style={{
                                                            display: "flex",
                                                            gap: 15,
                                                        }}
                                                    >
                                                        <img
                                                            src={row?.image}
                                                            alt={row?.name}
                                                            height= "50"
                                                            style={{
                                                                marginBottom: 10,
                                                            }}
                                                        />
                                                        <div 
                                                            // style={{ display: "flex", flexDirection: "column" }}
                                                        >
                                                            <span
                                                                style={{
                                                                    textTransform: "uppercase",
                                                                    fontSize: 22,
                                                                    color: "white"
                                                                }}
                                                            >
                                                                {row.symbol}
                                                            </span>
                                                            <span style={{ color: "darkgrey" }}> {row.name}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align= "right" style= {{color: "white"}}>
                                                        
                                                        {symbol}{" "}
                                                        {numberWithCommas(row.current_price.toFixed(2))}

                                                    </TableCell>
                                                    <TableCell align="right"
                                                    style={{color: profit > 0 ? "rgb(14,203,129)" : "red", fontWeight: 500 }}>

                                                        {profit && "+"}
                                                        {row.price_change_percentage_24h.toFixed(2)}%
                                                    </TableCell>
                                                    <TableCell align="right" style={{color: "white"}}>
                                                        {symbol}{" "}
                                                        {numberWithCommas(
                                                            row.market_cap.toString().slice(0, -6)
                                                        )}
                                                        M
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                        )
                    }
                </TableContainer>
                <Pagination
                    color="primary"
                    style={{
                        padding: 20,
                        width: "100%:",
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "gold",
                    }}
                    count={(handleSearch()?.length / 10).toFixed(0)}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                />
            </Container>
        </ThemeProvider>
    );
}

export default CoinTable;
