import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { pessoaSchema } from "../validators/pessoa";
import { loginSchema } from "../validators/login";
import { Login } from "../models/login";
import { useDispatch } from "react-redux";
import { login } from "../redux/reducers/session";
import { useNavigate } from "react-router-dom";

interface LoginProps {

}
export function LoginScreen ({}: LoginProps) {
    const {     
        register,
        formState: { errors },
        setValue,
        watch,
        handleSubmit, 
        reset
    } = useForm({
        resolver:  yupResolver(loginSchema)
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function cadastrar(data: Login) {
        dispatch(login(data)).then(() => {
            navigate("/");
        })
    }

    return (
        <Container sx={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box 
                onSubmit={handleSubmit((data: Login)=> {
                    cadastrar(data);
                })}
                component="form"
                sx={{width: '340px', backgroundColor: '#fff', border: '1px solid #dbe9f5', borderRadius: '10px', boxShadow: '0 4px 6px 0 rgba(31, 70, 88, 0.04)'}}>
                <Stack justifyContent={'center'} alignItems={'center'} padding={1} sx={{backgroundColor: 'rgb(248, 250, 251)'}}>
                    <Typography variant="body1" fontWeight={'600'} fontSize={'22px'} sx={{ color: '#8498AE'}} >
                        Login
                    </Typography>
                </Stack>
                <Stack padding={5} sx={{height: '100px', alignItems: 'center', justifyContent: 'center'}}>
                    <TextField
                        {...register('email', {required: true})}
                        fullWidth
                        variant="filled"
                        label="Username ou Email"
                        size="small"
                        error={!!errors?.email?.message}
                        helperText={errors?.email?.message || ''}
                    />

                    <TextField
                        sx={{mt: 1}}
                        {...register('password', {required: true})}
                        fullWidth
                        type="password"
                        variant="filled"
                        label="Senha"
                        size="small"
                        error={!!errors?.password?.message}
                        helperText={errors?.password?.message || ''}
                    />
                </Stack>
                <Stack justifyContent={'center'} alignItems={'center'} padding={1} sx={{backgroundColor: 'rgb(248, 250, 251)'}}>
                    <Button variant="contained" sx={{width: '250px'}} type="submit">Salvar</Button>
                </Stack>
            </Box>
        </Container>
    )
}