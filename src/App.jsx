import { useState, useEffect } from "react"
import Header from "./components/Header"
import IconoNuevoGasto from "./img/nuevo-gasto.svg"
import Modal from "./components/Modal"
import {generarId} from "./helpers"
import ListadoGastos from "./components/ListadoGastos"
import Filtros from "./components/Filtros"


function App() {
  
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : []
  )

  const [presupuesto,setPresupuesto] = useState(
    localStorage.getItem("presupuesto") ? Number(localStorage.getItem("presupuesto")) :  0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [filtro, setFiltro] = useState("")
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  

  //detectar cambio en swip
  const [gastoEditar, setGastoEditar] = useState({})


  useEffect(()=>{
    if( Object.keys(gastoEditar).length > 0){
      setModal(true)
  
      setTimeout(() => {
        setAnimarModal(true)
      },500)
    }
  },[gastoEditar])

  useEffect(()=>{
    //guardas en el localStorage
    localStorage.setItem("presupuesto", presupuesto ?? 0)
  },[presupuesto])

  useEffect(()=>{
    localStorage.setItem("gastos",JSON.stringify(gastos) ?? [])
  },[gastos])


  useEffect(()=>{
    //carga de gastos del localstorage
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }

  },[])

  useEffect(()=>{

    if(filtro){
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)

    }


  },[filtro])

  const handleNuevoGasto = () => {  
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    },500)
  }

  const guardarGasto = gasto =>{

    if(gasto.id){
      //actualizar
      const gastosActualizados = gastos.map( gastoState => 
        gastoState.id === gasto.id ? gasto : gastoState)

      setGastos(gastosActualizados)
      setGastoEditar({})

    }else{
      //nuevo gasto
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos,gasto])
    }

    
  }

  const eliminarGasto = id => {
   const gastosActualizados = gastos.filter( gasto => gasto.id !== id)
    setGastos(gastosActualizados)

  }

  return (
    
    <div className={modal ? "fijar":""}>
      <Header
        gastos = {gastos}
        setGastos = {setGastos}
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        isValidPresupuesto = {isValidPresupuesto} 
        setIsValidPresupuesto = {setIsValidPresupuesto}

      />

      {isValidPresupuesto && (
        <>
          <main>

            <Filtros
              filtro = {filtro}
              setFiltro = {setFiltro}
            />

            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
              
            />
          </main>
          <div className="nuevo-gasto">
            <img 
              src={IconoNuevoGasto} 
              alt="icono nuevo gasto" 
              onClick={handleNuevoGasto}
            />
         </div>      
        
        </>

      )}

      {modal && <Modal
        
        animarModal = {animarModal}
        setAnimarModal = {setAnimarModal}
        setModal={setModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
        />}
      
    </div>
  )
}

export default App
