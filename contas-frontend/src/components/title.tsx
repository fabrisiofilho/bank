import { Stack, Typography } from "@mui/material"
import format from 'date-fns/format'

interface TitleProps {
    title: string
}

export function Title ({title}: TitleProps) {
    return (
            <Stack height={'180px'} justifyContent={'center'}>
                <Stack direction={'row'} alignItems={'center'}>
                    <Typography variant="body1" fontWeight={'bold'} fontSize={'15px'} sx={{color: '#1da584'}}>
                    SuperBank | Manager Accounts
                    </Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'}>
                    <Typography variant="body1" fontWeight={'600'} fontSize={'22px'}>
                        Controle&nbsp;
                    </Typography>
                    <Typography variant="body1" fontSize={'22px'} sx={{ textTransform: 'capitalize'}}>
                        {title}
                    </Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'}>
                    <Typography variant="body1" fontWeight={'600'} fontSize={'15px'} sx={{color: '#8498AE'}}>
                        Ultima atualização: &nbsp;
                    </Typography>
                    <Typography variant="body1" fontWeight={'600'} fontSize={'12px'} sx={{ color: '#8498AE'}}>
                        {format(new Date(Date()),   'MM/dd/yyyy hh:mm:ss')}
                    </Typography>
                </Stack>
            </Stack>
    )
}