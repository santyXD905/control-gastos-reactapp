import {useState, useEffect} from 'react'
import CerrarBtn from "../img/cerrar.svg"
import Mensaje from './Mensaje'

const Modal = ({setModal, animarModal, setAnimarModal,guardarGasto,gastoEditar,setGastoEditar}) => {

    const [mensaje, setMensaje] = useState("")

    const [nombre, setNombre] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [categoria, setCategoria] = useState("")
    const [fecha, setFecha] = useState("")
    const [id, setId] = useState("")

    useEffect(()=>{
        if( Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setFecha(gastoEditar.fecha)
            setId(gastoEditar.id)
            
          }
    },[gastoEditar])

    const handleSubmit = e => {

        //EVITA QUE SE RECARGUE EL NAVEGADOR
        e.preventDefault()

        if([nombre,cantidad,categoria].includes("")){
            setMensaje('Todos los campos son obligatorios')

            setTimeout(()=>{
                setMensaje('')
            },2000)
            return 
        }

        guardarGasto({nombre,cantidad,categoria,id,fecha})
        setNombre("")
        setCantidad("")
        setCategoria("")

    }

  return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img 
                src={CerrarBtn} 
                alt="cerrar modal" 
                onClick={() => {
                                setAnimarModal(false) 
                                setGastoEditar({}) 
                                setTimeout(()=>{
                                    setModal(false)
                                },500)
                                }}/>
        </div>

        <form 
            onSubmit={handleSubmit}
            className={`formulario ${animarModal ? "animar": "cerrar"}`} >
            <legend>{gastoEditar.id ? "Editar Gasto":"Nuevo Gasto" }</legend>

            {mensaje && <Mensaje tipo="error">
                {mensaje}
                </Mensaje>}

            <div className='campo'>
                <label htmlFor="nombre">Nombre Gasto</label>
                <input 
                    id='nombre'
                    type="text" 
                    placeholder='Añade el Nombre del Gasto'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    />

                <label htmlFor="cantidad">Cantidad</label>
                <input 
                    id='cantidad'
                    type="number" 
                    placeholder='Añade la cantidad del Gasto: ej. 300'
                    value={cantidad}
                    onChange={e => setCantidad(Number(e.target.value))}
                    />
            </div>
            <div className='campo'>
                <label htmlFor="categoria">Categoria</label>
                <select name=""
                     id="categoria"
                     value={categoria}
                     onChange={e=>setCategoria(e.target.value)}
                     >
                    <option value=""> -- Seleccione -- </option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>

                </select>
            </div>
            <input type="submit" 
            value={gastoEditar.id ? "Editar Gasto":"Agregar Gasto" }/>
        </form>
    </div>
  )
}

export default Modal