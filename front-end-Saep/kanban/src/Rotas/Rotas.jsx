import { Routes, Route } from "react-router-dom";
import { Inicial } from "../Componentes/Paginas/Inicial";
import { CadTarefa } from "../Componentes/Paginas/Tarefa";
import { CadUsuario } from "../Componentes/Paginas/CadUsuario";
import { Quadro } from "../Componentes/Quadro";

export function Rotas(){
    return(
        <Routes>
            <Route path="/" element= {<Inicial/>}>
                <Route index element={<Quadro/>}/>
                <Route path='CadTarefa' element={<CadTarefa/>}/>
                <Route path='CadUsuario' element={<CadUsuario/>}/>

            </Route>
        </Routes>
    )
}