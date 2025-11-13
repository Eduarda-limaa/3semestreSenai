import { useState } from "react";
import { Camera } from "./Camera";
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export function Galeria() {
    const [fotos, setFotos] = useState(() => {
        const salvas = localStorage.getItem("fotos");
        return salvas ? JSON.parse(salvas) : [];
    })

    //adicionar foto
    const adicionarFoto = (novaFoto) => {
        const novasFotos = [...fotos, novaFoto]
        setFotos(novasFotos)
        localStorage.setItem("fotos", JSON.stringify(novasFotos))
    }

    const limparGaleria = () => {
        if (!confirm("Deseja limpar sua galeria?")) return;
        localStorage.removeItem("fotos");
        setFotos([]);
    }


    return (
        <main>
            <Camera onFotoTirada={adicionarFoto} />
            <button onClick={limparGaleria}>Limpar galeria</button>

            {/* componentes do MUI */}
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                {fotos.map((f, i) => (
                    <ImageListItem key={i}>
                        <img
                            src={f}
                            alt={`foto ${i + 1}`}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </main>
    )
}