import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import type {} from 'redux-thunk/extend-redux';
import { Nav } from "../components/nav";
import { useEffect } from "react";
import { isValidAcesso } from "../services/auth";

interface HomeProps {

}

export function Home ({}: HomeProps) {

    useEffect(() => {
        isValidAcesso()
    }, []);

    return (
        <Stack>
            <Nav></Nav>
            <Box>
                <Outlet/>
            </Box>
        </Stack>
    )

}