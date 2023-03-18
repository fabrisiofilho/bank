import { useDispatch } from "react-redux";
import { TableCustom, TypeColumn } from "../components/table";
import { useAppSelector } from "../redux/store";
import { useEffect, useRef, useState } from "react";
import { createClient, deleteClient, getClients, updateClient } from "../redux/reducers/client";
import { Alert, Box, Fab, FilledInput, FormControl, InputLabel, Stack, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Title } from "../components/title";
import { ModalCu } from "../components/modal";
import { useForm } from "react-hook-form";
import { TextMaskCustom } from "../components/text-mask";
import { yupResolver } from '@hookform/resolvers/yup';
import { pessoaSchema } from "../validators/pessoa";
import { Client } from "../models/client";

interface PessoaProps {

}

export function PessoaScreen ({}: PessoaProps) {
    const {     
        register,
        formState: { errors },
        setValue,
        watch,
        handleSubmit, 
        reset
    } = useForm({
        resolver:  yupResolver(pessoaSchema)
    });

    const formRef = useRef<HTMLFormElement | null>(null);

    const [page, setPage] = useState(0);

    const dispatch = useDispatch();
    const pessoas = useAppSelector((state) => state.pessoa.clients);

    const [messageError, setMessageError] = useState();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        reset();
    };

    useEffect(() => {
        dispatch(getClients(page.toString()))
    }, [page])


    function submit() {
        formRef.current?.requestSubmit();
    }
    
    function cadastrar(data: Client) {
        if (data.id) {
            dispatch(updateClient(data)).then(() => {
                dispatch(getClients(page.toString()));
                reset();
                setOpen(false);
            })
        } else {
            dispatch(createClient(data)).then(() => {
                dispatch(getClients(page.toString()));
                reset();
                setOpen(false);
            })
        }
    }

    function remove(id: string) {
        dispatch(deleteClient(id)).then(() => {
            dispatch(getClients(page.toString()));
        });
    }

    function edit(pessoa: Client) {
        setOpen(!open)
        setValue('id', pessoa.id);
        setValue('name', pessoa.name);
        setValue('cpf', pessoa.cpf);
        setValue('address', pessoa.address);
    }

    function alterPage(page: number) {
        setPage(page - 1)
    }

    return (
        <Stack position={'relative'} sx={{padding: '0px 50px'}} height={'calc(100vh - 70px)'}>
            <Title title={"Pessoa"}></Title>
            <TableCustom<Client>
                values={[ 
                    {name: "Nome", type: TypeColumn.STRING, value: ["name"]}, 
                    {name: "CPF", type: TypeColumn.STRING, value: ["cpf"]}, 
                    {name:"Endereço", type: TypeColumn.STRING, value: ["address"]} ]} 
                hasActivity={true} 
                pageable={pessoas} 
                removeItem={remove}
                editItem={edit}
                page={page}
                alterPage={alterPage}
            >
            </TableCustom>
            <Stack position={'absolute'} bottom={'20px'} right={'20px'}>
                <Fab color="primary" onClick={() => setOpen(!open)}>
                    <AddIcon></AddIcon>
                </Fab>
            </Stack>
            <ModalCu open={open} handleClose={handleClose} handleOpen={handleOpen} handlerSubmit={() => submit()} title={"Cadastro de Pessoa"}>
                <Box
                    ref={formRef}
                    onSubmit={handleSubmit((data: Client)=> {
                        cadastrar(data);
                    })}
                    component="form"
                    gap={2}
                >
                    {
                        messageError ? 
                            <Alert sx={{marginBottom: '10px'}} severity="error">{messageError}</Alert>
                        :
                        ''
                    }
                    <TextField
                        {...register('name', {required: true})}
                        fullWidth
                        variant="filled"
                        label="Nome"
                        size="small"
                        error={!!errors?.name?.message}
                        helperText={errors?.name?.message || ''}
                    />

                    <TextField
                        sx={{mt: 1}}
                        {...register('lastName', {required: true})}
                        fullWidth
                        variant="filled"
                        label="Sobrenome"
                        size="small"
                        error={!!errors?.name?.message}
                        helperText={errors?.name?.message || ''}
                    />

                    <FormControl variant="filled" fullWidth sx={{mt: 1}}>
                        <InputLabel htmlFor="formatted-text-mask-input">CPF</InputLabel>
                        <FilledInput
                            {...register('cpf', {required: true, minLength: 14})}
                            value={watch('cpf')}
                            name="cpf"
                            size="small"
                            id="formatted-text-mask-input"
                            onChange={(value) => setValue('cpf', value)}
                            inputComponent={TextMaskCustom as any}
                            error={!!errors?.cpf?.message}
                            helperText={errors?.cpf?.message || ''}
                        />
                    </FormControl>

                    <TextField
                        sx={{mt: 1}}
                        {...register('address', {required: true})}
                        fullWidth
                        variant="filled"
                        label="Endereço"
                        size="small"
                        error={!!errors?.address?.message}
                        helperText={errors?.address?.message || ''}
                    />
                </Box>
            </ModalCu>
        </Stack>
    )

}