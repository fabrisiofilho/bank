import { Grid, Paper, Skeleton, Stack, Typography } from "@mui/material";

interface CardStatsProps {
    countsContas: string
    countsMovimentacoes: string
    countsPessoas: string
}
    

export function CardStats ({countsContas, countsMovimentacoes, countsPessoas}: CardStatsProps) {
    return (
        <Stack direction={'row'} gap={2}>
            <Paper sx={{ width: '300px', backgroundColor: '#fff', border: '1px solid #dbe9f5', borderRadius: '10px', boxShadow: '0 4px 6px 0 rgba(31, 70, 88, 0.04)', marginBottom: '15px'}}>
                <Grid container padding={'18px'}>
                    <Grid item xs={12}>
                        <Typography variant="body1" fontWeight={'600'} fontSize={'15px'} sx={{ color: '#8498AE'}} align="right">
                            Pessoas cadastradas no sistemas
                        </Typography>
                    </Grid>
                    <Grid item xs={12} alignItems={'center'} justifyContent={'center'}>
                        {
                            countsPessoas?
                                <Typography variant="body1" fontWeight={'600'} fontSize={'40px'} color={'primary'} align="right">
                                    {countsPessoas}
                                </Typography> 
                                :   
                                <Skeleton variant="text"
                                    height={60}
                                />
                        }
                    </Grid>
                </Grid>
            </Paper>
            <Paper  sx={{ width: '300px', backgroundColor: '#fff', border: '1px solid #dbe9f5', borderRadius: '10px', boxShadow: '0 4px 6px 0 rgba(31, 70, 88, 0.04)', marginBottom: '15px'}}>
                <Grid container padding={'18px'}>
                    <Grid item xs={12}>
                        <Typography variant="body1" fontWeight={'600'} fontSize={'15px'} sx={{ color: '#8498AE'}} align="right">
                            Contas abertas
                        </Typography>
                    </Grid>
                    <Grid item xs={12} alignItems={'center'} justifyContent={'center'}>
                        {
                            countsContas?
                                <Typography variant="body1" fontWeight={'600'} fontSize={'40px'} color={'primary'} align="right">
                                    {countsContas}
                                </Typography> 
                                :   
                                <Skeleton variant="text"
                                    height={60}
                                />
                        }
                    </Grid>
                </Grid>
            </Paper>
            <Paper sx={{ width: '300px', backgroundColor: '#fff', border: '1px solid #dbe9f5', borderRadius: '10px', boxShadow: '0 4px 6px 0 rgba(31, 70, 88, 0.04)', marginBottom: '15px'}}>
                <Grid container padding={'18px'}>
                    <Grid item xs={12}>
                        <Typography variant="body1" fontWeight={'600'} fontSize={'15px'} sx={{ color: '#8498AE'}} align="right">
                            Movimentações realizadas
                        </Typography>
                    </Grid>
                    <Grid item xs={12} alignItems={'center'} justifyContent={'center'}>
                        {
                            countsMovimentacoes?
                                <Typography variant="body1" fontWeight={'600'} fontSize={'40px'} color={'primary'} align="right">
                                    {countsMovimentacoes}
                                </Typography> 
                                :   
                                <Skeleton variant="text"
                                    height={60}
                                />
                        }
                    </Grid>
                </Grid>
            </Paper>
        </Stack>
    )
}