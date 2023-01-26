import React, { useState, useEffect } from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import {Paper} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Typography} from "@mui/material";

export default function (){
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("https://reqres.in/api/products")
            .then(res => {
                setProducts(res.data.data);
            })
            .catch(err => console.log(err));

    }, []);

        return(
        <main>
            <Box
                sx={{
                    bgcolor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',

                }}
            >
                <Box
                    sx={{
                        pt:8,
                        pb: 6,
                    }}
                >
                    <Typography component="h1"
                                variant="h2"
                                align="center"
                                color="text.primary"
                                gutterBottom
                    >
                        SPA website
                    </Typography>
                    <div>
                        {products && <div>{JSON.stringify(products)}</div>}
                    </div>

                </Box>

            </Box>
            <Box
                sx={{
                    bgcolor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',

                }}
            >
                <Box
                    sx={{
                        pt:8,
                        pb: 6,
                    }}
                >
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead >
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product["id"]}
                                // onClick={() => handleRowClick(product)}
                                style={{ backgroundColor: product["color"] }}
                            >
                                <TableCell component="th" scope="row">
                                    {product["id"]}
                                </TableCell>
                                <TableCell align="right">{product["name"]}</TableCell>
                                <TableCell align="right">{product["year"]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
                </Box>
            </Box>
        </main>
    );
}
