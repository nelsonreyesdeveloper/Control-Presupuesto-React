import { useState, useEffect } from "react"
import Header from "./components/Header"
import NuevoGasto from "./components/NuevoGasto"
import OpenModal from "./components/OpenModal";
import { customStyles } from "./components/StylesModal"
import NuevoPresupuesto from "./components/NuevoPresupuesto";
import ControlPresupuesto from "./components/ControlPresupuesto";
import ListadoGastos from "./components/ListadoGastos";
import Filter from "./components/Filter";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValid, setIsValid] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [animar, setAnimar] = useState(false);
  const [gasto, setGasto] = useState(
    JSON.parse(localStorage.getItem('gastos')) ?? []
  );

  const [totalGastado, setTotalGastado] = useState(0)
  const [totalDisponible, setTotalDisponible] = useState(0)
  const [id, setId] = useState('')

  const [filtro, setFiltro] = useState('');
  const [gastoFiltro, setGastoFiltro] = useState([]);

  const advertencia = () => {
    MySwal.fire({
      title: 'Está seguro?',
      text: "No podrá revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      width: '500px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'mi-boton-confirmacion' // Aquí especificamos la clase personalizada
      }
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear()
        /* Reiniciar la pagina web */

        Swal.fire(
          'Borrado!',
          'El presupuesto ha sido borrado.',
          'success'
        )

        
        setTimeout(() => {
          window.location.reload()
        }, 1000);


      }
    })
  }

  useEffect(() => {

    setTotalDisponible(Number(presupuesto) - totalGastado)

  }, [totalGastado])

  useEffect(() => {
    setTotalGastado(gasto.reduce((total, gastoState) => gastoState.montoGasto + total, 0))
    localStorage.setItem('gastos', JSON.stringify(gasto) ?? []);
  }, [gasto])


  useEffect(() => {
    const presupuestoStorage = Number(localStorage.getItem('presupuesto'));
    if (presupuestoStorage > 0) {
      setIsValid(true)

      const presupuesto = JSON.parse(localStorage.getItem('gastos'))
      const fechaactualizada = presupuesto.map((gastoState) => {
        if (gastoState.fecha) {
          gastoState.fecha = new Date(gastoState.fecha)
        }
        return gastoState
      })

      setGasto(fechaactualizada ?? [])
    }
    else {
      setGasto([])
    }
  }, [])

  useEffect(() => {

    setGastoFiltro(gasto.filter(gastoState => gastoState.categoria === filtro))
  }, [filtro])

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setAnimar(false)
    setId('')

  }

  const deleteGasto = (id) => {
    setGasto(gasto.filter(gastoState => gastoState.id !== id))
  }

  const animarModal = () => {
    setTimeout(() => {
      setAnimar(true);
    }, 100)
  }


  return (
    <>
      <Header presupuesto={presupuesto} setPresupuesto={setPresupuesto} isValid={isValid} setIsValid={setIsValid}
        setTotalGastado={setTotalGastado} totalGastado={totalGastado}
        totalDisponible={totalDisponible} setTotalDisponible={setTotalDisponible}
        advertencia={advertencia}
      />

      {isValid &&

        (
          <>

            <ListadoGastos gasto={gasto} modalIsOpen={modalIsOpen}
              closeModal={closeModal}
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
              setFiltro={setFiltro}
              filtro={filtro}
              gastoFiltro={gastoFiltro}

            />

            <NuevoGasto openModal={openModal} animarModal={animarModal} />

          </>
        )

      }
      <OpenModal modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        customStyles={customStyles}
        animar={animar}
        setGasto={setGasto}
        gasto={gasto}
        setTotalGastado={setTotalGastado}
        totalGastado={totalGastado}
        presupuesto={presupuesto}
        totalDisponible={totalDisponible}
        id={id}

      />
    </>

  )
}

export default App
