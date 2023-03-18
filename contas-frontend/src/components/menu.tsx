import { Menu } from "@mui/material";
import { ReactNode, useState } from "react";

interface MenuProps {
    children: ReactNode;
    element: null | HTMLElement;
    open: boolean;
    onClose: () => void
    onClick: () => void
}

export function MenuBank ({children, open, element, onClose, onClick}: MenuProps) {
    return (
        <Menu
            anchorEl={element}
            id="account-menu"
            open={open}
            onClose={onClose}
            // onClick={onClick}
            PaperProps={{
            elevation: 0,
            sx: {
                minWidth: '200px',
                overflow: 'visible',
                bgcolor: '#fff',
                border: '1px solid #dbe9f5',
                borderRadius: '10px',
                boxShadow: '0 4px 6px 0 rgba(31, 70, 88, 0.04)',
                mt: 1.5,
                '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                },
                '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'white',
                    boxShadow: '0 4px 6px 0 rgba(31, 70, 88, 0.04)',
                    border: '1px solid #dbe9f5',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            {children}
        </Menu>
    )

}