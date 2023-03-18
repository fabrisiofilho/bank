import { Avatar, Badge, Button, Divider, IconButton, ListItemIcon, MenuItem, Stack, Typography, styled } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuBank } from "./menu";
import Logout from '@mui/icons-material/Logout';
import { logout } from "../services/auth";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

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

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <Stack position={'sticky'} top={'0'} zIndex={'1000'} direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={1} sx={{backgroundColor: '#fff', height: '70px', padding: '0px 30px', boxShadow: '0 4px 6px 0 rgba(31, 70, 88, 0.04)'}}>
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
                        Titulares
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
            <Stack>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar alt=''src='' />
                    </IconButton>
                </StyledBadge>
            </Stack>
            <MenuBank element={anchorEl} open={open} onClose={handleClose} onClick={handleClose}>
                <MenuItem>
                    Minha conta
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => {
                    logout();
                    navigate("/login");
                }}>
                <ListItemIcon>
                    <Logout fontSize="small"/>
                </ListItemIcon>
                    Sair
                </MenuItem>
            </MenuBank>
        </Stack>
    )
}