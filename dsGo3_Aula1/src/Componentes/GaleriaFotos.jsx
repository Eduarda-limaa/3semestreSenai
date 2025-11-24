import { useState } from "react";
import { Camera } from "./Camera";

export function Galeria() {
    const [fotos, setFotos] = useState(() => {
        const salvas = localStorage.getItem("fotos");
        return salvas ? JSON.parse(salvas) : [];
    });

    const adicionarFoto = (novaFoto) => {
        console.log("Foto recebida pela galeria:", novaFoto);

        if (!novaFoto) return;

        const novas = [...fotos, novaFoto];
        setFotos(novas);
        localStorage.setItem("fotos", JSON.stringify(novas));
    };

    const limparGaleria = () => {
        if (!confirm("Deseja limpar sua galeria?")) return;
        localStorage.removeItem("fotos");
        setFotos([]);
    };

    return (
        <main className="galeria-container">
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
