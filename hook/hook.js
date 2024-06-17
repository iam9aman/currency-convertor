import { useState,useEffect } from 'react';
import React  from 'react'
import axios from 'axios';

function Currency(currency) {
    let [data,setdata]=useState('')

    let CurrencyData=async()=>{
        console.log(currency.toLowerCase())
        let data= await axios(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency.toLowerCase()}.json`)
        let result=await data.data
        await setdata(result[currency.toLowerCase()])
        console.log(result)
    }

    useEffect(()=>{
        CurrencyData()
    },[currency])
    // Currency('inr')

  return (
  data
  )
}

export default Currency