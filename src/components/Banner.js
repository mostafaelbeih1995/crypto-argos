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
                    height: 400,
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: 25,
                    justifyContent: "space-around"
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
                            fontFamily: "Montserrat"
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