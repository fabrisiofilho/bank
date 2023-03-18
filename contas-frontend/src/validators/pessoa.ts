import * as yup from 'yup';

export const pessoaSchema = yup.object().shape({
    name: yup
        .string()
        .transform((str) => str.trim())
        .required('Campo do nome é obrigatorio!'),
    cpf: yup
        .string()
        .min(14)
        .required('CPF do setor é obrigatório!'),
    address: yup
        .string()
        .transform((str) => str.trim())
        .required('Endereço de local é obrigatório!'),
});
