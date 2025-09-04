export function CadTarefa(){
    return(
        <form className="formulario">
            <h1 className="titulo">Cadastro de Tarefas</h1>
            <label>Descrição:</label>
            <input type="text" alt="campo de descrição" required/>
            <label>Setor:</label>
            <input type="text" alt="setor" required/>
            <label>Prioridade:</label>
            <select>
                <option>Selecione o Usuário:</option>
                <option>Maria</option>
                <option>Duda</option>
                <option>Eduarda</option>
            </select>
            <select>
                <option>Selecione a Prioridade:</option>
                <option>Alta</option>
                <option>Média</option>
                <option>Baixa</option>
            </select>
            <button type="submit">Cadastrar</button>
        </form>
    )
}