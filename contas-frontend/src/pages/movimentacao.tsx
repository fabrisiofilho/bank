import { useDispatch } from "react-redux";
import { TableCustom, TypeColumn } from "../components/table";
import { useAppSelector } from "../redux/store";
import { useCallback, useEffect, useRef, useState } from "react";
import { createTransaction, getTransactions, updateTransaction } from "../redux/reducers/transaction";
import { Transaction } from "../models/transaction";
import { Alert, Autocomplete, Box, Fab, Stack, TextField, debounce } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Title } from "../components/title";
import { ModalCu } from "../components/modal";
import { useForm } from "react-hook-form";
import { getClientByName } from "../redux/reducers/client";
import { Client } from "../models/client";
import { NumericFormatCustom } from "../components/input-money";
import { movimentacaoSchema } from "../validators/movimentacao";
import { yupResolver } from '@hookform/resolvers/yup';

interface MovimentacaoProps {

}

export function MovimentacaoScreen ({}: MovimentacaoProps) {
    const {     
        register,
        formState: { errors },
        setValue,
        watch,
        handleSubmit, 
        reset
    } = useForm({
        resolver:  yupResolver(movimentacaoSchema)
    });

    const formRef = useRef<HTMLFormElement | null>(null);

    const dispatch = useDispatch();
    const movimentacaos = useAppSelector((state) => state.movimentacao.transactions);

    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const [messageError, setMessageError] = useState();

    const [openAutoComplete, setOpenAutoComplete] = useState(false);
    const [openAutoCompleteConta, setOpenAutoCompleteConta] = useState(false);
    const [pessoas, setPessoas] = useState<Client[]>([]);

    const [pessoa, setPessoa] = useState<Client>();

    const loading = open && pessoas.length === 0;

    useEffect(() => {
        dispatch(getTransactions(page.toString()))
    }, [page])

    const debouncedChangeHandler = useCallback(
        debounce(findUser, 300)
    , []);

    function findUser(value: string) {
        dispatch(getClientByName(value)).then();
    }

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            if (active) {
                setPessoas([...await dispatch(getClientByName('')).unwrap()]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    function submit() {
        formRef.current?.requestSubmit();
    }
    
    function cadastrar(data: any) {
        if (data.id) {
            dispatch(updateTransaction(data)).then((res) => {
                if (res.error) {
                    setMessageError(res.error.message);
                    return;
                } else {
                    dispatch(getTransactions(page.toString()));
                    setOpen(false);
                    setPessoa(undefined);
                    reset();
                }
            })
        } else {
            dispatch(createTransaction(data)).then((res) => {
                console.log(res);
                if (res.error) {
                    setMessageError(res.error.message);
                    return;
                } else {
                    dispatch(getTransactions(page.toString()));
                    setOpen(false);
                    setPessoa(undefined);
                    reset();
                }
            })
        }
    }

    function alterPage(page: number) {
        setPage(page - 1)
    }

    return (
        <Stack position={'relative'} sx={{padding: '0px 50px'}} height={'calc(100vh - 70px)'}>
            <Title title={"Movimentação"}></Title>
            <TableCustom<Transaction>
                values={[
                    {name: "Número da Conta", type: TypeColumn.STRING, value: ["account", "number"]}, 
                    {name: "Valor", type: TypeColumn.MONEY, value: ["mount"]}, 
                    {name: "Data", type: TypeColumn.STRING, value: ["data"]},
                    {name: "Tipo", type: TypeColumn.STRING, value: ["type"]}
                ]} 
                hasActivity={false}
                pageable={movimentacaos}
                hasMovement={true}
                page={page}
                alterPage={alterPage}
            >
            </TableCustom>
            <Stack position={'absolute'} bottom={'20px'} right={'20px'}>
                <Fab color="primary" onClick={() => setOpen(!open)}>
                    <AddIcon></AddIcon>
                </Fab>
            </Stack>
            <ModalCu open={open} handleClose={handleClose} handleOpen={handleOpen}  handlerSubmit={() => submit()} title={"Cadastro de Movimentação"}>
                <Box
                    ref={formRef}
                    onSubmit={handleSubmit((data)=> {
                        cadastrar(data);
                    })}
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { mt: 1 },
                    }}
                >
                    {
                        messageError ? 
                            <Alert sx={{marginBottom: '10px'}} severity="error">{messageError}</Alert>
                        :
                        ''
                    }
                    <Autocomplete
                        {...register('owner', {required: true})}
                        freeSolo
                        open={openAutoComplete}
                        onOpen={() => {
                            setOpenAutoComplete(true);
                        }}
                        onClose={() => {
                            setOpenAutoComplete(false);
                        }}
                        options={pessoas}
                        value={pessoa}
                        fullWidth
                        getOptionLabel={(option) => {
                            if (typeof option === 'string') {
                                return option;
                            }
                            return option.name;
                        }}
                        onChange={(event, value)=> {
                            setPessoa(value);
                            setValue('owner', value);
                            setValue('account', undefined);
                        }}
                        renderOption={(props, option) => <li {...props}>{option.name} - {option.cpf}</li>}
                        renderInput={(params) => (
                            <TextField 
                                {...params}
                                fullWidth
                                variant="filled"
                                onChange={(event) => debouncedChangeHandler(event.target.value)} 
                                label="Pessoa" 
                                size="small"
                                error={!!errors?.pessoa?.message}
                                helperText={errors?.pessoa?.message || ''}
                            />
                        )}
                    />

                    <Autocomplete
                        {...register('account', {required: true})}
                        disabled={!pessoa}
                        freeSolo
                        open={openAutoCompleteConta}
                        onOpen={() => {
                            setOpenAutoCompleteConta(true);
                        }}
                        onClose={() => {
                            setOpenAutoCompleteConta(false);
                        }}
                        options={pessoa?.account ? pessoa?.account : []}
                        value={watch('account')}
                        fullWidth
                        getOptionLabel={(option) => {
                            if (typeof option === 'string') {
                                return option;
                            }
                            return option.number;
                        }}
                        onChange={(event, value)=> {
                            setValue('account', value);
                        }}
                        renderOption={(props, option) => <li {...props}>{option.number} - Saldo: {parseFloat(option.balance).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}</li>}
                        renderInput={(params) => (
                            <TextField 
                                {...params}
                                fullWidth
                                variant="filled"
                                label="Número da Conta"
                                size="small"
                                error={!!errors?.conta?.message}
                                helperText={errors?.conta?.message || ''}
                            />
                        )}
                    />

                    <TextField
                        defaultValue="0"
                        {...register('mount', {required: true})}
                        fullWidth
                        variant="filled"
                        label="Valor"
                        size="small"
                        id="formatted-numberformat-input"
                        name="numberformat"
                        value={watch('mount')}
                        onChange={(value) => {setValue('mount', value)}}
                        InputProps={{
                            inputComponent: NumericFormatCustom as any,
                        }}
                        error={!!errors?.valor?.message}
                        helperText={errors?.valor?.message || ''}
                    />
                    <Autocomplete
                        disablePortal
                        options={["DEPOSIT", "WITHDRAW", "PIX", "TRANSFER"]}
                        renderInput={(params) => 
                            <TextField
                                {...params}
                                {...register('type', {required: true})}
                                fullWidth
                                variant="filled"
                                label="Tipo"
                                size="small"
                                error={!!errors?.tipo?.message}
                                helperText={errors?.tipo?.message || ''}
                            />
                        }
                    />
                </Box>
            </ModalCu>
        </Stack>
    )

}