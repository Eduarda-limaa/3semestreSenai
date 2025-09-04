import { BarraNavegacao } from "../BarraNavegacao";
import { Cabecalho } from "../Cabecalho";
import { Outlet } from "react-router-dom";

export function Inicial(){
    return(
        <>
            <BarraNavegacao/>
            <Cabecalho/>
            <Outlet/>
        </>
    )
}