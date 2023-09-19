import React from 'react'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import DateFormated from '../helpers/DateFormated'
import MoneyFormated from '../helpers/MoneyFormated'
import OpenModal from './OpenModal';



const Gasto = ({ gasto, modalIsOpen, closeModal, customStyles, animar, setGasto, setTotalGastado, totalGastado, presupuesto, totalDisponible, openModal, animarModal, setId, deleteGasto }) => {
    const { id, nombreGasto, montoGasto, categoria, fecha } = gasto
    const leadingActions = () => (

        <LeadingActions>
            <SwipeAction onClick={async () => {
                setId(id)
                await openModal();
                await animarModal();


                < OpenModal modalIsOpen={modalIsOpen}
                    closeModal={closeModal}
                    customStyles={customStyles}
                    animar={animar}
                    setGasto={setGasto}
                    gasto={gasto}
                    setTotalGastado={setTotalGastado}
                    totalGastado={totalGastado}
                    presupuesto={presupuesto}
                    totalDisponible={totalDisponible} />
            }}>Editar</SwipeAction>
        </LeadingActions>
    )
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => {
                deleteGasto(id)
            }}>Borrar</SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >


                <div className='gasto sombra'>

                    <div className='contenido-gasto'>
                        <img src={`/src/assets/img/icono_${categoria}.svg`} alt="" />
                        <div className='descripcion-gasto'>
                            <input type="hidden" value={id} />
                            <p className='categoria'>  {categoria}</p>
                            <p className='nombre-gasto'> {nombreGasto} </p>
                            <p className='fecha-gasto'>Fecha Gasto: <span>{DateFormated(fecha)}</span> </p>
                        </div>
                    </div>
                    <p className='cantidad-gasto'>{MoneyFormated(montoGasto)}</p>

                </div>

            </SwipeableListItem>
        </SwipeableList>
    )

}

export default Gasto
