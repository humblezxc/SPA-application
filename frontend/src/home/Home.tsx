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
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Pagination} from "@mui/material";
export default function (){
    const [products, setProducts] = useState([])
    interface TableState {
        currentPage: number;
    }
    const [state, setState] = useState<TableState>({
        currentPage: 1
    });

    interface TableProps {
        data: any[];
        rowsPerPage: number;
    }


    useEffect(() => {
        axios.get('https://reqres.in/api/products')
            .then(res => {
                setProducts(res.data.data);
            })
            .catch(err => console.log(err));

    }, []);
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setState({
            currentPage: value
        });
    };

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
                <Stack spacing={2} direction="row">
                    <TextField id="outlined-basic" label="Enter ID" variant="outlined" />
                    <Button variant="contained">Contained</Button>
                </Stack>

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
                                {products.slice((state.currentPage - 1) * 5, state.currentPage * 5).map((product) => (
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
                    <Pagination
                        count={Math.ceil(products.length / 5)}
                        page={state.currentPage}
                        onChange={handlePageChange}
                    />
                </Box>
            </Box>
        </main>
    );
}
