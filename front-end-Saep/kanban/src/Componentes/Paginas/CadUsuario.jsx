// hooks que é o mecanismo já pronto para boas práticas da programação
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schemaCadUsuario= z.object({
    nome: z.string()
        .min(9, 'Informe um nome válido!')
        .max(20, 'Informe no máximo 20 caracteres'), // pode ter que mudar daqui e do backend
    email: z.string()
        // .min(9, 'Informe ao menos 9 digitos')
        // .max(30, 'Informe até 50 caracteres')
        // .email('Informe um email válido'),
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,{
            message: "Email inválido"
        })
});

export function CadUsuario(){
    const{
        register, // registrar para mim o que o usuário inputar
        handleSubmit, // no momento em que ele submeter 
        formState: { errors }, // o formulario, e se ele errar guarda no errors
        reset
    }=useForm({ resolver : zodResolver(schemaCadUsuario)});

    async function obterDados(data) {
        console.log("Dados recebidos", data);

        try{
            await axios.post("http://127.0.0.1:8000/api/usuario/", data);
            alert("Usuário cadastrado com sucesso!");
            reset();
        }catch(error){
            alert("Erro ao cadastrar usuário");
            console.error("Deu ruim.", error);
        }
    }


    return(
        <form className="formulario" onSubmit={handleSubmit(obterDados)}>
            <h1>Cadastro de Usuário</h1>
            <label>Nome:</label>
            <input type="text" {...register("nome")}/>
            {errors.nome && <p>{errors.nome.message}</p>}

            <label>E-mail:</label>
            <input type="email" {...register("email")} /> 
            {errors.email && <p>{errors.email.message}</p>}

            <button type="submit">Cadastrar</button>
        </form>
    )
}