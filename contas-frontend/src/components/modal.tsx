import { Box, Button, Modal, Stack, Typography } from "@mui/material"
import { ReactNode } from "react";

interface ModalProps {
    open: boolean,
    title: string,
    handleOpen: ()=> void;
    handleClose: ()=> void;
    handlerSubmit: () => void;
    children: ReactNode;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#fff'
};

export function ModalCu ({open, handleOpen, handleClose, handlerSubmit, children, title}: ModalProps) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            >
            <Box sx={style}>
                <Stack justifyContent={'center'} alignItems={'center'} padding={1} sx={{backgroundColor: 'rgb(248, 250, 251)'}}>
                    <Typography variant="body1" fontWeight={'600'} fontSize={'22px'} sx={{ color: '#8498AE'}} >
                        {title}
                    </Typography>
                </Stack>
                <Stack padding={3}>
                    {children}
                </Stack>
                <Stack justifyContent={'center'} alignItems={'center'} padding={1} sx={{backgroundColor: 'rgb(248, 250, 251)'}}>
                    <Button variant="contained" sx={{width: '200px'}} onClick={handlerSubmit}>Salvar</Button>
                </Stack>
            </Box>
        </Modal>
    )
}