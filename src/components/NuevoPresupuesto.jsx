import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValid, setTotalDisponible }) => {
    const MySwal = withReactContent(Swal)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isNaN(presupuesto) || presupuesto <= 0) {
            setPresupuesto(0);
            const Toast = MySwal.mixin({
                toast: true,

                position: 'bottom',
                showConfirmButton: false,
                timer: 3000,
                showCloseButton: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: '<p class="font-title">Presupuesto no valido</p>',

            })
            return;
        }
        localStorage.setItem('presupuesto', JSON.stringify(Number(presupuesto)) ?? 0)
        
        setPresupuesto(presupuesto);
        setTotalDisponible(presupuesto);
        setIsValid(true);
    }



    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form onSubmit={handleSubmit} className='formulario' action="">

                <div className='campo'>
                    <label htmlFor="labelpresupuesto">Definir Presupuesto</label>
                    <input value={presupuesto} onChange={e => setPresupuesto((e.target.value))} className='nuevo-presupuesto' type="text" placeholder='Nuevo Presupuesto' />
                </div>

                <input type="submit" value="Añadir" />
            </form>
        </div>
    )
}

export default NuevoPresupuesto
