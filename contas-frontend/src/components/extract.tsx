import { Box, IconButton, Modal, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import { Account } from "../models/account";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

interface ExtractProps {
    open: boolean,
    conta?: Account,
    handleOpen: ()=> void;
    handleClose: ()=> void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#fff'
};

export function Extract ({open, handleOpen, handleClose, conta}: ExtractProps) {
    function getExtract() {
        window.open(`http://localhost:8080/conta/getExtract/${conta?.id}`, '_blank');
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            >
            <Box sx={style}>
                <Stack justifyContent={'center'} alignItems={'center'} padding={1} sx={{backgroundColor: 'rgb(248, 250, 251)'}}>
                    <Typography variant="body1" fontWeight={'600'} fontSize={'22px'} sx={{ color: '#8498AE'}} >
                        Extrato da conta - {conta?.number}
                    </Typography>
                </Stack>
                <Stack sx={{ backgroundColor: '#fff', border: '1px solid #dbe9f5', borderRadius: '10px', boxShadow: '0 4px 6px 0 rgba(31, 70, 88, 0.04)', margin: '10px 20px', padding: '5px'}}>
                    <Stack direction={'row'} alignItems={'center'} sx={{padding: '4px 10px'}}>
                        <Typography variant="body1" fontWeight={'600'} fontSize={'15px'}>
                            Titular da conta:&nbsp;
                        </Typography>
                        <Typography variant="body1" fontSize={'15px'}>
                            {conta?.owner.name}
                        </Typography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} sx={{padding: '4px 10px'}}>
                        <Typography variant="body1" fontWeight={'600'} fontSize={'15px'}>
                            CPF:&nbsp;
                        </Typography>
                        <Typography variant="body1" fontSize={'15px'}>
                            {conta?.owner.cpf}
                        </Typography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} sx={{padding: '4px 10px'}}>
                        <Typography variant="body1" fontWeight={'600'} fontSize={'15px'}>
                            Nº da conta:&nbsp;
                        </Typography>
                        <Typography variant="body1" fontSize={'15px'}>
                            {conta?.number}
                        </Typography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} sx={{padding: '4px 10px'}}>
                        <Typography variant="body1" fontWeight={'600'} fontSize={'15px'}>
                            Saldo:&nbsp;
                        </Typography>
                        <Typography variant="body1" fontSize={'15px'}>
                            {conta?.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}
                        </Typography>
                    </Stack>
                </Stack>

                <Stack padding={3} alignItems={'center'}>
                    {conta?.transactions && conta?.transactions.length !== 0 ? 
                    <TableContainer sx={{ backgroundColor: '#fff', border: '1px solid #dbe9f5', borderRadius: '10px', boxShadow: '0 4px 6px 0 rgba(31, 70, 88, 0.04)'}}>
                        <Table aria-label="simple table">
                            <TableBody>
                                    {conta.transactions.map((row) => (
                                        <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center" sx={{justifyContent: 'center', alignItems: 'center'}}>
                                                {
                                                    row.type === "DEPOSIT" ? 
                                                        <AttachMoneyIcon fontSize="small"></AttachMoneyIcon>
                                                    :
                                                        <MoneyOffIcon fontSize="small"></MoneyOffIcon>
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {row.type}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.mount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}
                                            </TableCell>
                                            <TableCell align="center">
                                                {new Date(row.data).toLocaleDateString()} - {new Date(row.data).toLocaleTimeString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                        : 
                        <Typography variant="body1" fontWeight={'600'} fontSize={'22px'} sx={{ color: '#8498AE'}} >
                            Nenhuma movimentação registrada
                        </Typography>
                    }
                </Stack>
                <Stack justifyContent={'center'} alignItems={'center'} padding={1} sx={{backgroundColor: 'rgb(248, 250, 251)'}}>
                    <IconButton aria-label="delete" sx={{color: '#1e2023'}} onClick={() => getExtract()}>
                        <FontAwesomeIcon icon={faFilePdf}  size="sm"/>
                    </IconButton>
                </Stack>
            </Box>
        </Modal>
    ) 
}