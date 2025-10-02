import { useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import axios from "axios";


export default function Tarefa({ tarefa, onAtualizar, onExcluir, usuarios }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: tarefa.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const alterarStatus = (novoStatus) => {
    axios
      .patch(`http://localhost:8000/api/tarefa/${tarefa.id}`, { status: novoStatus })
      .then((res) => onAtualizar(res.data))
      .catch((err) => console.error("Erro ao alterar status", err));
  };

  const editarTarefa = () => {
    const novaDescricao = prompt("Editar descrição:", tarefa.descricao);
    if (!novaDescricao) return;

    axios
      .patch(`http://localhost:8000/api/tarefa/${tarefa.id}`, { descricao: novaDescricao })
      .then((res) => onAtualizar(res.data))
      .catch((err) => console.error("Erro ao editar tarefa", err));
  };

  const handleExcluirTarefa = () => {
    if (!confirm("Deseja realmente excluir esta tarefa?")) return;

    axios
      .delete(`http://localhost:8000/api/tarefa/${tarefa.id}`)
      .then(() => onExcluir(tarefa.id))
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
        <button onClick={handleExcluirTarefa}>Excluir</button>
        <select
          value={tarefa.status}
          onChange={(e) => alterarStatus(e.target.value)}
        >
          <option value="a fazer">A Fazer</option>
          <option value="fazendo">Fazendo</option>
          <option value="pronto">Pronto</option>
        </select>
      </div>
    </div>
  );
}

