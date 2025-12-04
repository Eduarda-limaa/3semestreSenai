import { useState } from "react";
import { Camera } from "./Camera";
import toast, { Toaster } from "react-hot-toast";

export function Galeria() {
    const [fotos, setFotos] = useState(() => {
        const salvas = localStorage.getItem("fotos");
        return salvas ? JSON.parse(salvas) : [];
    });

    const adicionarFoto = (novaFoto) => {
        if (!novaFoto) return;

        setFotos((prevFotos) => {
            const atualizadas = [...prevFotos, novaFoto];

            if (atualizadas.length % 3 === 0) {
                toast.success(`Você já tirou ${atualizadas.length} fotos!`);
            }

            // salva no localStorage
            localStorage.setItem("fotos", JSON.stringify(atualizadas));

            return atualizadas;
        });
    };


    const limparGaleria = () => {
        if (!confirm("Deseja limpar sua galeria?")) return;
        localStorage.removeItem("fotos");
        setFotos([]);
    };

    return (
        <main className="galeria-container">
            <Toaster position="top-right" />
            <h2 className="galeria-titulo">Sua Galeria</h2>

            <Camera onFotoTirada={adicionarFoto} />

            <button className="botao-limpar" onClick={limparGaleria}>
                Limpar galeria
            </button>

            <div className="grid-fotos">
                {fotos.map((foto, index) => (
                    <div className="foto-item" key={index}>
                        <img src={foto} alt={`foto ${index}`} />
                    </div>
                ))}
            </div>
        </main>
    );
}
