import React from 'react'

const MoneyFormated = (money) => {

   const convertir = Number(money)

   return(convertir.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))
}

export default MoneyFormated
