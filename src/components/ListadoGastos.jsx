import React from 'react'
import Gasto from './Gasto'
import Filter from './Filter'

const ListadoGastos = ({ gasto, modalIsOpen, closeModal, customStyles, animar, setGasto, setTotalGastado, totalGastado, presupuesto, totalDisponible, openModal, animarModal, setId, deleteGasto, setFiltro, filtro, gastoFiltro }) => {

    return (
        <main className='contenedor listado-gastos '>

            <Filter setFiltro={setFiltro} filtro={filtro} />

            {filtro ? (
                <>
                    <h2>{gastoFiltro.length > 0 ? 'Listado' : `Sin gastos en la categoria: ${filtro}`}</h2>
                    {
                        gastoFiltro.map(gastoState => (
                            <Gasto key={gastoState.id} gasto={gastoState} closeModal={closeModal}
                                customStyles={customStyles}
                                animar={animar}
                                setGasto={setGasto}
                                setTotalGastado={setTotalGastado}
                                totalGastado={totalGastado}
                                presupuesto={presupuesto}
                                totalDisponible={totalDisponible}
                                openModal={openModal}
                                animarModal={animarModal}
                                setId={setId}
                                deleteGasto={deleteGasto}
                            />
                        ))
                    }

                </>
            ) : (
                <>
               <h2>{gasto.length > 0 ? 'Listado' : `Sin ningun gasto`}</h2>
                    {
                        gasto.map(gastoState => (
                            <Gasto key={gastoState.id} gasto={gastoState} closeModal={closeModal}
                                customStyles={customStyles}
                                animar={animar}
                                setGasto={setGasto}
                                setTotalGastado={setTotalGastado}
                                totalGastado={totalGastado}
                                presupuesto={presupuesto}
                                totalDisponible={totalDisponible}
                                openModal={openModal}
                                animarModal={animarModal}
                                setId={setId}
                                deleteGasto={deleteGasto}
                            />
                        ))
                    }

                </>
            )
            }


        </main>
    )
}

export default ListadoGastos
