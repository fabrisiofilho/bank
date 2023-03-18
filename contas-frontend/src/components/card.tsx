import { Accordion, AccordionDetails, AccordionSummary, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import { Account } from "../models/account"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilePdf } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
  

interface CardProps {
    conta: Account
}
    

export function Card ({conta}: CardProps) {
    const [expanded, setExpanded] = useState<string | false>();
    
    const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

    function getExtract() {
        window.open(`http://localhost:8080/conta/getExtract/${conta?.id}`, '_blank');
    }

    return (
        <Paper sx={{ backgroundColor: '#fff', border: '1px solid #dbe9f5', borderRadius: '10px', boxShadow: '0 4px 6px 0 rgba(31, 70, 88, 0.04)'}}>
            <Stack sx={{ margin: '10px 20px', padding: '5px'}} position={'relative'}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Stack direction={'row'} alignItems={'center'} sx={{padding: '4px 10px'}}>
                            <Typography variant="body1" fontWeight={'600'} fontSize={'15px'} color={'primary'} sx={{marginRight: '10px'}}>
                                CONTA
                            </Typography>
                            <Typography variant="body1" fontWeight={'600'} fontSize={'15px'} color={'primary'} sx={{marginRight: '10px'}}>
                                |
                            </Typography>
                            <Typography variant="body1" fontWeight={'600'} fontSize={'15px'}>
                                Titular da conta:&nbsp;
                            </Typography>
                            <Typography variant="body1" fontSize={'15px'} sx={{marginRight: '10px'}}>
                                {conta?.owner.name}
                            </Typography>
                            <Stack position={'absolute'} top={'0px'} right={'0px'} padding={1}>
                                <IconButton aria-label="delete" size="small" sx={{color: '#1e2023'}} onClick={() => getExtract()}>
                                    <FontAwesomeIcon icon={faFilePdf}  size="sm"/>
                                </IconButton>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction={'row'} alignItems={'center'} sx={{padding: '4px 10px'}}>
                            <Typography variant="body1" fontWeight={'600'} fontSize={'15px'}>
                                CPF:&nbsp;
                            </Typography>
                            <Typography variant="body1" fontSize={'15px'} sx={{marginRight: '10px'}}>
                                {conta?.owner.cpf}
                            </Typography>
                            <Typography variant="body1" fontWeight={'600'} fontSize={'15px'} color={'primary'} sx={{marginRight: '10px'}}>
                                |
                            </Typography>
                            <Typography variant="body1" fontWeight={'600'} fontSize={'15px'}>
                                Nº da conta:&nbsp;
                            </Typography>
                            <Typography variant="body1" fontSize={'15px'} sx={{marginRight: '10px'}}>
                                {conta?.number}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{boxShadow: 'none'}}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Stack direction={'column'} justifyContent={'center'} sx={{ width: '100%', padding: '4px 10px', backgroundColor: '#fff', border: '1px solid #dbe9f5', borderRadius: '10px', boxShadow: '0 4px 6px 0 rgba(31, 70, 88, 0.04)'}}>
                                    <Typography color={'primary'} fontWeight={'bold'} variant="body1" fontSize={'30px'} sx={{marginRight: '10px'}}>
                                        {conta?.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}
                                    </Typography>
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack alignItems={'center'}>
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
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Stack>
        </Paper>
    )
}