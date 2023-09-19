import React from 'react'

const Filter = ({setFiltro,filtro}) => {
    return (
        <div className='contenedor'>
            <div className='sombra'>

                <form className='formulario'>
                    <div className="campo">
                        <h2>Filtrar Gastos</h2>
                    </div>

                    <div className="campo">
                        <select  value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                            <option value="">-- Todas las categorias --</option>
                            <option value="ahorro">Ahorro</option>
                            <option value="comida">Comida</option>
                            <option value="casa">Casa</option>
                            <option value="gastos">Gastos Varios</option>
                            <option value="ocio">Ocio</option>
                            <option value="salud">Salud</option>
                            <option value="suscripciones">Suscripciones</option>
                        </select>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default Filter
