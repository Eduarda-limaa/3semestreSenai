import { useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import axios from "axios";

export default function Tarefa({ tarefa }) {
  const [usuarios, setUsuarios] = useState({}); // mapa id → nome

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

  // drag and drop
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: tarefa.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  // altera status da tarefa
  const alterarStatus = (novoStatus) => {
    axios
      .patch(`http://localhost:8000/api/tarefa/${tarefa.id}`, { status: novoStatus })
      .then(() => {
        tarefa.status = novoStatus;
      })
      .catch((err) => console.error("Erro ao alterar status", err));
  };

  // editar descrição via prompt
  const editarTarefa = () => {
    const novaDescricao = prompt("Editar descrição:", tarefa.descricao);
    if (!novaDescricao) return;

    axios
      .patch(`http://localhost:8000/api/tarefa/${tarefa.id}`, { descricao: novaDescricao })
      .then(() => {
        tarefa.descricao = novaDescricao;
      })
      .catch((err) => console.error("Erro ao editar tarefa", err));
  };

  // excluir tarefa
  const excluirTarefa = () => {
    if (!confirm("Deseja realmente excluir esta tarefa?")) return;

    axios
      .delete(`http://localhost:8000/api/tarefa/${tarefa.id}`)
      .then(() => {
        alert("Tarefa excluída com sucesso");
      })
      .catch((err) => console.error("Erro ao excluir tarefa", err));
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`card prioridade-${tarefa.prioridade.toLowerCase()}`}
    >
      <p className="descricao">
        <strong>Descrição:</strong> {tarefa.descricao}
      </p>
      <p className="setor">
        <strong>Setor:</strong> {tarefa.setor}
      </p>
      <p className="usuario">
        <strong>Vinculado a:</strong> {usuarios[tarefa.usuario] ?? "—"}
      </p>
      <span className="prioridade">{tarefa.prioridade}</span>

      <div className="acoes">
        <button onClick={editarTarefa}>Editar</button>
        <button onClick={excluirTarefa}>Excluir</button>
        <select
          value={tarefa.status}
          onChange={(e) => alterarStatus(e.target.value)}
        >
          <option value="A fazer">A Fazer</option>
          <option value="Fazendo">Fazendo</option>
          <option value="Pronto">Pronto</option>
        </select>
      </div>
    </div>
  );
}
