import { useEffect, useState } from "react";
import axios from "axios";
import { Coluna } from "../Coluna";
import { DndContext } from "@dnd-kit/core";
import Tarefa from "./Tarefa";


export default function Quadro() {
  const [tarefas, setTarefas] = useState([]);
  const [usuarios, setUsuarios] = useState({});

  useEffect(() => {
    // Buscar tarefas
    axios
      .get("http://localhost:8000/api/tarefa/")
      .then((res) => setTarefas(res.data))
      .catch((err) => console.error("Erro ao carregar tarefas", err));

    // Buscar usuários apenas uma vez
    axios
      .get("http://localhost:8000/api/usuario/")
      .then((res) => {
        const mapUsuarios = {};
        res.data.forEach((u) => (mapUsuarios[u.id] = u.nome));
        setUsuarios(mapUsuarios);
      })
      .catch((err) => console.error("Erro ao carregar usuários", err));
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !active) return;

    const tarefaId = active.id;
    const novaColuna = over.id;

    axios
      .patch(`http://localhost:8000/api/tarefa/${tarefaId}`, { status: novaColuna })
      .then((res) => {
        setTarefas((prev) =>
          prev.map((t) => (t.id === res.data.id ? res.data : t))
        );
      })
      .catch((err) => console.error("Erro ao atualizar status", err));
  };

  const atualizarTarefa = (tarefaAtualizada) => {
    setTarefas((prev) =>
      prev.map((t) => (t.id === tarefaAtualizada.id ? tarefaAtualizada : t))
    );
  };

  const excluirTarefa = (idExcluido) => {
    setTarefas((prev) => prev.filter((t) => t.id !== idExcluido));
  };

  const tarefasAFazer = [...new Map(tarefas.filter(t => t.status === "a fazer").map(t => [t.id, t])).values()];
  const tarefasFazendo = [...new Map(tarefas.filter(t => t.status === "fazendo").map(t => [t.id, t])).values()];
  const tarefasPronto = [...new Map(tarefas.filter(t => t.status === "pronto").map(t => [t.id, t])).values()];

  return (
    <>
      <h1 className="quadroTitle">Meu Quadro</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <main className="kanban">
          <section className="atividades">
            <Coluna
              id="a fazer"
              titulo="A fazer"
              tarefas={tarefasAFazer}
              onAtualizar={atualizarTarefa}
              onExcluir={excluirTarefa}
              usuarios={usuarios}
            />
            <Coluna
              id="fazendo"
              titulo="Fazendo"
              tarefas={tarefasFazendo}
              onAtualizar={atualizarTarefa}
              onExcluir={excluirTarefa}
              usuarios={usuarios}
            />
            <Coluna
              id="pronto"
              titulo="Pronto"
              tarefas={tarefasPronto}
              onAtualizar={atualizarTarefa}
              onExcluir={excluirTarefa}
              usuarios={usuarios}
            />
          </section>
        </main>
      </DndContext>
    </>
  );
}

