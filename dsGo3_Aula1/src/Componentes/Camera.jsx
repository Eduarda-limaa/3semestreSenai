// Ref: é hook que permite que eu interaja com os perifericos do usuario
import { useState, useEffect, useRef } from "react";

export function Camera({onFotoTirada}){
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [foto, setFoto] = useState(null);

    // Inicializa a camera
    useEffect(() => {
        iniciarCamera();
    },[]);

    const iniciarCamera = async ()=>{
        try{
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
            if(videoRef.current){
                videoRef.current.srcObject = stream;
            }
        }
        catch(error){
            console.error("Falha de comunicação com a camera", error)
        }
    };

    const tirarFoto = () =>{
        const video  = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0,0,canvas.width, canvas.height);

        const imagem = canvas.toDataURL("image/png");
        setFoto(imagem)

    if(onFotoTirada){
        onFotoTirada(imagem)// permite a comunicação com as props
        }
    }

    const reiniciar = () =>{
        setFoto(null);
        iniciarCamera();
    }

    return(
        <section className="camera-box">
            <h2>Captura da Camera</h2>
            <div className="preview">
                {! foto ? (
                    <video ref={videoRef} autoPlay playsInline aria-label="Fluxo de camera"/>
                ):
                (
                    <img src={foto} alt="Foto capturada" />
                )}
            </div>
            <div>
                {! foto ?
                 (
                    <button onClick={tirarFoto}>TirarFoto</button>
                ):
                (
                    <button onClick={reiniciar}>Nova Foto</button>
                )
            }
            </div>
            <canvas ref={canvasRef} style={{display: "none"}}></canvas>
        </section>
    )
}