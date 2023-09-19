import { useState, useEffect } from 'react'
import NuevoGasto from './NuevoGasto'
import MoneyFormated from '../helpers/MoneyFormated'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



const ControlPresupuesto = ({ presupuesto, setTotalGastado, totalGastado, totalDisponible,advertencia}) => {

    const [porcentaje, setPorcentaje] = useState(0);
    /* Quiere redondar el porcentaje en 2 decimales */


    useEffect(() => {
        setPorcentaje((totalGastado / Number(presupuesto) * 100).toFixed(1))

    }, [totalGastado])

    const resetearApp = () => {
        /* Preguntar si esta seguro */
        advertencia()
        
    }
    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            {/* si porcentaje menor o igual a 50 es naranaja  mayor a 80 rojo dame rojo  */}
            <div>
                <CircularProgressbar text={`${porcentaje}% Gastado`} styles={buildStyles({ pathColor: porcentaje >= 80 ? '#940100 ' : (porcentaje >= 50 ? '#f59e0b' : (porcentaje >= 30 ? '#3b82f6' : '#00f700')), trailColor: '#f5f5f5', textColor: '#3b82f6' })} value={porcentaje} />
            </div>
            <div className='contenido-presupuesto'>
                <button type='button' className='reset-app' onClick={resetearApp}>Reiniciar Aplicacion</button>
                <p>
                    <span>
                        Presupuesto:{" "}
                    </span>
                    {MoneyFormated(presupuesto)}
                </p>
                <p>
                    <span>
                        Gastado:{" "}
                    </span>
                    {MoneyFormated(totalGastado)}
                </p>
                <p>
                    <span>
                        Disponible:{" "}
                    </span>
                    {MoneyFormated(totalDisponible)}
                </p>
            </div>

        </div>
    )
}

export default ControlPresupuesto
