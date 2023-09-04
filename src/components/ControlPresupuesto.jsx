import {useState, useEffect} from 'react'
import { CircularProgressbar,  buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto}) => {

  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)

  useEffect(()=>{
    //acumulador y variable
    const totalGastado = gastos.reduce((total ,gasto)=> gasto.cantidad + total,0)

    const totalDisponible = presupuesto - totalGastado

    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

    setGastado(totalGastado)
    setDisponible(totalDisponible)

    setTimeout(()=>{
      setPorcentaje(nuevoPorcentaje)
    },1500)
    
  },[gastos])

  const formatearCantidad = (cantidad) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(cantidad);
  }

  const handleResetApp = () => {
    const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?')

    if(resultado){
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
              value={porcentaje}
              text={`${porcentaje}% Gastado`}
              styles={buildStyles({
                // Text size
                textSize: '16px',
            
                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,
            
                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',
            
                // Colors
                pathColor: porcentaje > 100 ? '#ff0000' : '#3B82F6',
                textColor: porcentaje > 100 ? '#ff0000' : '#3B82F6',
                backgroundColor: '#3e98c7',
              })}
            
            />
        </div>

        <div className='contenido-presupuesto'>
            <button 
              className='reset-app'
              type='button'
              onClick={handleResetApp}
            >
              Resetear App
            </button>
            <p>
                <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? "negativo": ""}`}>
                <span>Disponible: </span>{formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span>{formatearCantidad(gastado)}
            </p>
        </div>

    </div>
  )
}

export default ControlPresupuesto