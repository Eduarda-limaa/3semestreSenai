import { useEffect, useState } from "react";
import axios from "axios";

export default function Quadro() {
  const [tarefas, setTarefas] = useState([]);
  const [usuarios, setUsuarios] = useState({}); // o nome vem por id do back

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/tarefa/")
      .then((res) => setTarefas(res.data))
      .catch((err) => console.error("Erro ao carregar tarefas", err));
  }, []);

  // caarrega os usuários e mapea id para nome
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/usuario/")
      .then((res) => {
        const mapUsuarios = {};
        res.data.forEach((u) => {
          mapUsuarios[u.id] = u.nome;
        });
        setUsuarios(mapUsuarios);
      })
      .catch((err) => console.error("Erro ao carregar usuários", err));
  }, []);

  const colunas = {
    "a fazer": "A Fazer",
    "fazendo": "Fazendo",
    "pronto": "Pronto",
  };

  // altera o status da tarefa e muda e ela de coluna
  const alterarStatus = (tarefaId, novoStatus) => {
    axios
      .patch(`http://localhost:8000/api/tarefa/${tarefaId}`, { status: novoStatus })
      .then(() => {
        setTarefas((prev) =>
          prev.map((t) => (t.id === tarefaId ? { ...t, status: novoStatus } : t))
        );
      })
      .catch((err) => console.error("Erro ao alterar status", err));
  };

  const excluirTarefa = (tarefaId) => {
    axios
      .delete(`http://localhost:8000/api/tarefa/${tarefaId}`)
      .then(() => {
        setTarefas((prev) => prev.filter((t) => t.id !== tarefaId));
      })
      .catch((err) => console.error("Erro ao excluir tarefa", err));
  };

  const editarTarefa = (tarefa) => {
    // edicao por prompt  
    const novaDescricao = prompt("Editar descrição:", tarefa.descricao);
    if (!novaDescricao) return;
    axios
      .patch(`http://localhost:8000/api/tarefa/${tarefa.id}`, { descricao: novaDescricao })
      .then(() => {
        setTarefas((prev) =>
          prev.map((t) =>
            t.id === tarefa.id ? { ...t, descricao: novaDescricao } : t
          )
        );
      })
      .catch((err) => console.error("Erro ao editar tarefa", err));
  };

  return (
    <div className="kanban">
      {Object.entries(colunas).map(([status, titulo]) => (
        <div key={status} className="coluna">
          <h2>{titulo}</h2>
          {tarefas
            .filter((t) => t.status === status)
            .map((tarefa) => (
              <div
                key={tarefa.id}
                className={`card prioridade-${tarefa.prioridade.toLowerCase()}`}
              >
                <p className="descricao">
                  <strong>Descrição:</strong> {tarefa.descricao}
                </p>
                <p className="setor">
                  <strong>Setor:</strong> {tarefa.setor}
                </p>
                <p className="usuario">
                  <strong>Vinculado a:</strong>{" "}
                  {usuarios[tarefa.usuario] ?? "—"}
                </p>
                <span className="prioridade">{tarefa.prioridade}</span>

                <div className="acoes">
                  <button onClick={() => editarTarefa(tarefa)}>Editar</button>
                  <button onClick={() => excluirTarefa(tarefa.id)}>Excluir</button>

                  <select
                    value={tarefa.status}
                    onChange={(e) =>
                      alterarStatus(tarefa.id, e.target.value)
                    }
                  >
                    <option value="a fazer">A Fazer</option>
                    <option value="fazendo">Fazendo</option>
                    <option value="pronto">Pronto</option>
                  </select>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
