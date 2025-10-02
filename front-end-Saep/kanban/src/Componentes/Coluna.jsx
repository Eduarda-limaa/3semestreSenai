import Tarefa from "./Paginas/Tarefa";
import { useDroppable } from "@dnd-kit/core";

export function Coluna({ id, titulo, tarefas = [], onAtualizar, onExcluir, usuarios }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <section className="coluna" ref={setNodeRef}>
      <h2>{titulo}</h2>
      {tarefas.map((tarefa) => (
        <Tarefa
          key={tarefa.id}
          tarefa={tarefa}
          onAtualizar={onAtualizar}
          onExcluir={onExcluir}
          usuarios={usuarios}
        />
      ))}
    </section>
  );
}
