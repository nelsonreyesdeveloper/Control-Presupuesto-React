import { React, useState, useEffect } from 'react'
import Modal from 'react-modal'

import { Toast } from './Toast';
import { uid } from 'uid';


const container = document.getElementById('root');
Modal.setAppElement(container);
let nuevoTotal;
const OpenModal = ({ modalIsOpen, closeModal, customStyles, animar, setGasto, gasto, setTotalGastado, totalGastado, presupuesto, totalDisponible, id }) => {

    const [nombreGasto, setNombreGasto] = useState('')
    const [montoGasto, setMontoGasto] = useState(0)
    const [categoria, setCategoria] = useState('')


    const limpiarFormulario = () => {
        setNombreGasto('')
        setMontoGasto('')
        setCategoria('')
    }

    useEffect(() => {

        if (id) {
            const id2 = gasto.filter(gastoState => gastoState.id === id)
            setNombreGasto(id2[0].nombreGasto)
            setMontoGasto(id2[0].montoGasto)
            setCategoria(id2[0].categoria)
        }
        else {
            limpiarFormulario()
        }

    }, [id])

    useEffect(() => {
        limpiarFormulario()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (id) {
            const copiaArray = structuredClone(gasto)

            const arrayActualizado = copiaArray.map(gastoState => {
                if (gastoState.id === id) {
                    gastoState.nombreGasto = nombreGasto
                    gastoState.montoGasto = Number(montoGasto)
                    gastoState.categoria = categoria
                }
                return gastoState
            })

            nuevoTotal = arrayActualizado.reduce((total, gastoState) => gastoState.montoGasto + total, 0)

        } else {
            nuevoTotal = totalGastado + montoGasto
        }


        if (nombreGasto.trim() === '' || montoGasto <= 0 || categoria.trim() === '') {
            setNombreGasto(nombreGasto)
            setMontoGasto(montoGasto)
            setCategoria(categoria)

            Toast.fire({
                icon: 'error',
                title: '<p class="font-title">Todos los campos son obligatorios</p>',

            })
            return;
        }


        if (montoGasto > Number(presupuesto)) {

            Toast.fire({
                icon: 'warning',
                title: '<p class="font-title">Superaste el limite de gastos</p>',

            })

            return
        }

        if (nuevoTotal > Number(presupuesto)) {

            Toast.fire({
                icon: 'warning',
                title: '<p class="font-title">Superaste el limite de gastos</p>',
            })
            return
        }
     
        if (id) {
            const actualizarGasto = gasto.map(gastoState => gastoState.id === id ? { ...gastoState, nombreGasto, montoGasto, categoria, fecha: new Date() } : gastoState)
          
            setGasto(actualizarGasto)
            closeModal()

        } else {
            const nuevoGasto = {
                id: uid(),
                fecha: new Date(),
                nombreGasto,
                montoGasto,
                categoria
            }
            setGasto([...gasto, nuevoGasto])
            closeModal()
            limpiarFormulario()
        }

        Toast.fire({
            icon: 'success',
            title: '<p class="font-title">Gasto agregado</p>',

        })

    }
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            animar={animar}
        >

            <div className="modal">

                <form onSubmit={handleSubmit} className={`formulario ${animar && 'animar'}`}>

                    <div className='relative'>
                        <img onClick={closeModal} className='cerrar-modal' src="src/assets/img/cerrar.svg" alt="" />
                    </div>
                    <legend>Nuevo Gasto</legend>
                    <div className="campo">
                        <label htmlFor="nombre">Añade El Nombre Del Gasto</label>
                        <input id='nombre' value={nombreGasto} onChange={(e) => setNombreGasto(e.target.value)} type="text" placeholder='Ej. Transporte' />
                    </div>

                    <div className="campo">
                        <label htmlFor="monto">Añade El Monto Del Gasto</label>
                        <input id='monto' value={montoGasto} onChange={(e) => setMontoGasto(Number(e.target.value))} type="number" placeholder='Ej. 300' />
                    </div>

                    <div className="campo">
                        <label htmlFor="categoria">Categoria</label>
                        <select id='categoria' value={categoria} onChange={(e) => setCategoria(e.target.value)} name="categoria" >
                            <option disabled value="">-- Seleccione --</option>
                            <option value="ahorro">Ahorro</option>
                            <option value="comida">Comida</option>
                            <option value="casa">Casa</option>
                            <option value="gastos">Gastos Varios</option>
                            <option value="ocio">Ocio</option>
                            <option value="salud">Salud</option>
                            <option value="suscripciones">Suscripciones</option>
                        </select>
                    </div>

                    <div>
                        <input type="submit" value={id ? 'Editar Gasto' : 'Agregar Gasto'} />
                    </div>
                </form>
            </div>

        </Modal>
    )
}

export default OpenModal
