import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'
import Filter from './Filter'


const Header = ({ presupuesto, setPresupuesto, isValid, setIsValid, setTotalDisponible, setTotalGastado, totalGastado, totalDisponible,advertencia }) => {
    return (
        <>
            <header>
                <h1>Planificador de gastos</h1>

                {
                    isValid ? (
                        <>
                            <ControlPresupuesto presupuesto={presupuesto} setTotalGastado={setTotalGastado} 
                            totalGastado={totalGastado} totalDisponible={totalDisponible}
                            advertencia={advertencia} />
                           
                        </>


                    ) : (
                        <NuevoPresupuesto presupuesto={presupuesto} setPresupuesto={setPresupuesto}
                            setIsValid={setIsValid} setTotalDisponible={setTotalDisponible} />
                    )
                }

            </header>
        </>
    )
}

export default Header
