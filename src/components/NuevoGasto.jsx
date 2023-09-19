import React from 'react'

const NuevoGasto = ({openModal,animarModal}) => {

  return (
    <div className='nuevo-gasto'>

      <img onClick={() =>{
        openModal()
        animarModal()
      }} src="img/nuevo-gasto.svg" alt="" />

    </div>
  )
}

export default NuevoGasto
