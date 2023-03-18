import { Alert, Autocomplete, Box, Fab, FilledInput, FormControl, InputLabel, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { createAccount, deleteAccount, getAccounts, updateAccount } from "../redux/reducers/account";
import { TableCustom, TypeColumn } from "../components/table";
import { Account } from "../models/account";
import AddIcon from '@mui/icons-material/Add';
import { Title } from "../components/title";
import { ModalCu } from "../components/modal";
import { debounce } from 'lodash';
import { getClientByName } from "../redux/reducers/client";
import { Client } from "../models/client";
import { TextMaskCustom } from "../components/text-mask";
import { Extract } from "../components/extract";
import { yupResolver } from '@hookform/resolvers/yup';
import { contaSchema } from "../validators/conta";

interface ContaProps {

}
export function ContaScreen ({}: ContaProps) {
    const {     
        register,
        formState: { errors },
        setValue,
        watch,
        handleSubmit, 
        reset
    } = useForm({
        resolver:  yupResolver(contaSchema)
    });

    const formRef = useRef<HTMLFormElement | null>(null);

    const dispatch = useDispatch();
    const contas = useAppSelector((state) => state.conta.accounts);
    const [pessoas, setPessoas] = useState<Client[]>([]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setMessageError(undefined);
        reset();
    };

    const [page, setPage] = useState(0);
    const [openAutoComplete, setOpenAutoComplete] = useState(false);
    const loading = open && pessoas.length === 0;
    
    const [messageError, setMessageError] = useState();
    const [conta, setConta] = useState<Account>();
    const [openExtract, setOpenExtract] = useState(false);
    const handleOpenExtract = () => setOpenExtract(true);
    const handleCloseExtract = () => {
        setOpenExtract(false);
        reset();
    };

    function findUser(value: string) {
        dispatch(getClientByName(value));
    }

    const debouncedChangeHandler = useCallback(
        debounce(findUser, 300)
    , []);

    function submit() {
        formRef.current?.requestSubmit();
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
    
    function cadastrar(data: Account) {
        if (data.id) {
            dispatch(updateAccount(data)).then((res) => {
                if (res.error) {
                    setMessageError(res.error.message);
                    return;
                } else {
                    dispatch(getAccounts(page.toString()));
                    setOpen(false);
                    reset();
                }
            })
        } else {
            dispatch(createAccount(data)).then((res) => {
                console.log(res);
                if (res.error) {
                    setMessageError(res.error.message);
                    return;
                } else {
                    dispatch(getAccounts(page.toString()));
                    setOpen(false);
                    reset();
                }
            })
        }
    }

    function remove(id: string) {
        dispatch(deleteAccount(id)).then(() => {
            dispatch(getAccounts(page.toString()));
        });
    }

    function edit(conta: Account) {
        setOpen(!open)
        setValue('id', conta.id);
        setValue('number', conta.number);
        setValue('balance', conta.balance);
        setValue('owner', conta.owner);
    }

    function openExtractFunc(data: Account) {
        setConta(data);
        setOpenExtract(true);
    }

    function alterPage(page: number) {
        setPage(page - 1)
    }

    useEffect(() => {
        dispatch(getAccounts(page.toString()))
    }, [page])

    return (
        <Stack position={'relative'} sx={{padding: '0px 50px'}} height={'calc(100vh - 70px)'}>
            <Title title={"Conta"}></Title>
            <TableCustom<Account> 
                values={[ 
                    {name: "Nome", type: TypeColumn.STRING, value: ["owner", "name"]}, 
                    {name:"CPF", type: TypeColumn.STRING, value: ["owner", "cpf"]}, 
                    {name:"Número da Conta", type: TypeColumn.STRING, value: ["number"]},
                    {name:"Saldo", type: TypeColumn.MONEY, value: ["balance"]}
                 ]} 
                hasActivity={true} 
                hasExtract={true}
                pageable={contas} 
                editItem={edit}
                removeItem={remove}
                extract={openExtractFunc}
                page={page}
                alterPage={alterPage}
            >
            </TableCustom>
            <Stack position={'absolute'} bottom={'20px'} right={'20px'}>
                <Fab color="primary" onClick={() => setOpen(!open)}>
                    <AddIcon></AddIcon>
                </Fab>
            </Stack>
            <Extract open={openExtract} handleClose={handleCloseExtract} handleOpen={handleOpenExtract} conta={conta}/>
            <ModalCu open={open} handleClose={handleClose} handleOpen={handleOpen} handlerSubmit={() => submit()} title={"Cadastro de Conta"}>
                <Box
                    ref={formRef}
                    onSubmit={handleSubmit((data: Account)=> {
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
                        value={watch('owner')}
                        fullWidth
                        getOptionLabel={(option) => {
                            if (typeof option === 'string') {
                                return option;
                            }
                            return option.name;
                        }}
                        onChange={(event, value)=> {
                            setValue('owner', value);
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
                                error={!!errors?.owner?.message}
                                helperText={errors?.owner?.message || ''}
                            />
                        )}
                    />

                    <FormControl variant="filled" fullWidth sx={{mt: 1}}>
                        <InputLabel htmlFor="formatted-text-mask-input">Número da Conta</InputLabel>
                        <FilledInput
                            {...register('number', {required: true, minLength: 9})}
                            value={watch('number')}
                            error={!!errors?.number?.message}
                            helperText={errors?.number?.message || ''}
                            name="numero"
                            size="small"
                            id="formatted-text-mask-input"
                            onChange={(value) => setValue('number', value)}
                            inputComponent={TextMaskCustom as any}
                        />
                    </FormControl>
                </Box>
            </ModalCu>
        </Stack>
    )

}
