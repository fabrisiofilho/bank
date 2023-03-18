import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import type {} from 'redux-thunk/extend-redux';
import { Nav } from "../components/nav";

interface HomeProps {

}

export function Home ({}: HomeProps) {
    return (
        <Stack>
            <Nav></Nav>
            <Box>
                <Outlet/>
            </Box>
        </Stack>
    )

}