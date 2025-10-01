import { useEffect, useState } from "react";
import axios from "axios";
import { Coluna } from "../Coluna";
import { DndContext } from "@dnd-kit/core"; // biblioteca que permite clicar e arrasta

export default function Quadro() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    const apiUrlTarefa = "http://localhost:8000/api/tarefa/";
    axios.get(apiUrlTarefa)
      .then(response => {
        setTarefas(response.data);
      })
      .catch(error => {
        console.error("Erro ao carregar tarefas", error);
      });
  }, []);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (over && active) {
      const tarefaId = active.id;
      const novaColuna = over.id; // a coluna onde a tarefa foi solta

      setTarefas(prev =>
        prev.map(tarefa =>
          tarefa.id === tarefaId ? { ...tarefa, status: novaColuna } : tarefa
        )
      );

      // atualiza no backend também
      axios.patch(`http://localhost:8000/api/tarefa/${tarefaId}/`, {
        status: novaColuna
      }).catch(error => console.error("Erro ao atualizar status:", error));
    }
  }

  const tarefasAFazer = tarefas.filter(tarefa => tarefa.status === 'a fazer');
  const tarefasFazendo = tarefas.filter(tarefa => tarefa.status === 'fazendo');
  const tarefasPronto = tarefas.filter(tarefa => tarefa.status === 'pronto');

  return (
    <>
      <h1 className="quadroTitle">Meu Quadro</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <main className="kanban">
          <section className="atividades">
            <Coluna id="a fazer" titulo="A fazer" tarefas={tarefasAFazer} />
            <Coluna id="fazendo" titulo="Fazendo" tarefas={tarefasFazendo} />
            <Coluna id="pronto" titulo="Pronto" tarefas={tarefasPronto} />
          </section>
        </main>
      </DndContext>
    </>
  );
}
