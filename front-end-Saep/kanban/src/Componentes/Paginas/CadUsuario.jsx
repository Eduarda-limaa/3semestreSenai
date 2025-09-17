// hooks que é o mecanismo já pronto para boas práticas da programação
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schemaCadUsuario= z.object({
    nome: z.string()
        .min(5, "Informe um nome válido!")
        .max(60, "Informe no máximo 60 caracteres")
        .regex(/(?=.*[aeiouAEIOU])/, { message: "O nome deve conter ao menos uma vogal" })
        .regex(/^(?!.*(.)\1{3,}).*$/, { message: "Não repita tantas vezes a mesma letra" })
        .regex(/^([A-ZÀ-Ú][a-zà-ú']+(?:-[A-ZÀ-Ú][a-zà-ú']+)?)(\s[A-ZÀ-Ú][a-zà-ú']+(?:-[A-ZÀ-Ú][a-zà-ú']+)?){1,5}$/,{ message: "Digite um nome válido: de 2 a 6 palavras, cada uma começando com maiúscula, apenas letras, apóstrofo ou hífen" }),
    email: z.string()
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,{message: "Email inválido"})
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