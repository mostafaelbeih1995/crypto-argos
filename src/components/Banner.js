import React from "react";
import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';
import Carousel from "./Carousel";
const Banner = () => {
    return (
        <Container sx={{
            backgroundImage: "url(../banner2.jpg)",
        }}>
        {/* <div> */}
                <Container sx={{
                    // height: "400",
                    display: "flex",
                    flexDirection: "column",
                    // paddingBottom: 25,
                    justifyContent: "space-around",
                    textAlign: "center",
            }}>
                <div>
                    <Typography
                        variant="h2"
                        style={{
                            fontWeight: "bold",
                            marginBottom: 15,
                            fontFamily: "Montserrat"
                        }}
                    >
                        Crypto Argos
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        style={{
                            color: "darkgrey",
                            textTransform: "capitalize",
                            fontFamily: "Montserrat",
                            paddingBottom: 150,
                        }}
                    >
                        Get all the info regarding your favourite Crypto Currency
                    </Typography>
                </div>
                <Carousel/>
            </Container>
            {/* </div>   */}
            </Container>
    );
}

export default Banner;