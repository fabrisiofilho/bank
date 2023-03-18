import { Grid, Stack } from "@mui/material";
import { Card } from "../components/card";
import { Title } from "../components/title";
import { useAppSelector } from "../redux/store";
import { useEffect, useState } from "react";
import { getAccounts, getCountsAccount } from "../redux/reducers/account";
import { useDispatch } from "react-redux";
import { CardStats } from "../components/card-stats";
import { getCountsTransaction } from "../redux/reducers/transaction";
import { getCountsClient } from "../redux/reducers/client";

interface CentralProps {

}

export function CentralScreen ({}: CentralProps) {
    const contas = useAppSelector((state) => state.conta.accounts);
    const [countsContas, setCountsContas] = useState();
    const [countsMovimentacoes, setCountsMovimentacoes] = useState();
    const [countsPessoas, setCountsPessoas] = useState();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAccounts('0'))
        dispatch(getCountsAccount()).then((res) => setCountsContas(res.payload))
        dispatch(getCountsTransaction()).then((res) => setCountsMovimentacoes(res.payload))
        dispatch(getCountsClient()).then((res) => setCountsPessoas(res.payload))
    }, [])

    return (
        <Stack position={'relative'} sx={{padding: '0px 50px'}}>
            <Title title={"Dashboard"}></Title>
            <CardStats countsContas={countsContas} countsMovimentacoes={countsMovimentacoes} countsPessoas={countsPessoas}></CardStats>
            <Grid container spacing={2} sx={{marginBottom: '30px'}}>
                {
                    contas.content.map((conta) => (
                        <Grid item xs={6}>
                            <Card conta={conta}></Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Stack>
    )
}