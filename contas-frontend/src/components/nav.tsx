import { Button, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

interface NavProps {
}

interface Tab {
    path: string
}

export function Nav ({}: NavProps) { 
    const location = useLocation();
    const navigate = useNavigate();
    
    function validationPath(item: Tab) {
        return location.pathname === item.path
    }

    return (
        <Stack position={'sticky'} top={'0'} zIndex={'1000'} direction={'row'} alignItems={'center'} gap={1} sx={{backgroundColor: '#fff', height: '70px', padding: '0px 30px', boxShadow: '0 4px 6px 0 rgba(31, 70, 88, 0.04)'}}>
            <Stack></Stack>
            <Stack height={'100%'} direction={'row'} alignItems={'center'} gap={1}>
                <Button 
                    variant="text" 
                    sx={{height: '100%'}}
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    <Typography variant="body1" sx={{ fontWeight: '600', fontSize: '16px', color: validationPath({path: '/'})? 'primary': '#8498AE', textTransform: 'capitalize'}}>
                        Central
                    </Typography>
                </Button>
                <Button 
                    variant="text" 
                    sx={{height: '100%'}}
                    onClick={() => {
                        navigate('/pessoa');
                    }}
                >
                    <Typography variant="body1" sx={{ fontWeight: '600', fontSize: '16px', color: validationPath({path: '/pessoa'})? 'primary': '#8498AE', textTransform: 'capitalize'}}>
                        Pessoa
                    </Typography>
                </Button>
                <Button
                    variant="text" 
                    sx={{height: '100%'}}
                    onClick={() => {
                        navigate('/conta');
                    }}
                >
                    <Typography variant="body1" sx={{ fontWeight: '600', fontSize: '16px', color: validationPath({path: '/conta'})? 'primary': '#8498AE', textTransform: 'capitalize'}}>
                        Conta
                    </Typography>
                </Button>
                <Button 
                    variant="text" 
                    sx={{height: '100%'}}
                    onClick={() => {
                        navigate('/movimentacao');
                    }}
                >
                    <Typography variant="body1" sx={{ fontWeight: '600', fontSize: '16px', color: validationPath({path: '/movimentacao'})? 'primary': '#8498AE', textTransform: 'capitalize'}}>
                        Movimentação
                    </Typography>
                </Button>
            </Stack>
        </Stack>
    )
}