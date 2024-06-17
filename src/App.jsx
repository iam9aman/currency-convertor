import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Currency from '../hook/hook'
import { v4 as uuidv4 } from 'uuid';
import county from './county'


function App() {
  let country = county()
  console.log(country)

  let [curr, setcurr] = useState('USD')
  let [otherCurr, setOtherCurr] = useState('INR')
  let [toInput, setToInput] = useState('')
  let [fromInput, setFromInput] = useState('')
  let [inside, setinside] = useState('')

  let handleFrom = (e) => {
    let newcurr = e.target.value
    setcurr(newcurr)
  }
  let handleTO = (e) => {
    let newcurr = e.target.value
    setOtherCurr(newcurr)
    console.log(newcurr)
  }
  let handleToInput = (e) => {
    let newcurr = e.target.value
    setToInput(newcurr)
    console.log(newcurr)
  }
  let handleFromInput = (e) => {
    let newcurr = e.target.value
    setFromInput(newcurr)
    console.log(newcurr)
  }


  let currencyData = Currency(curr)
  console.log(currencyData)
  let us = currencyData
  let handleSubmit = () => {
    let answer = parseInt(fromInput * currencyData[otherCurr.toLocaleLowerCase()])
    console.log(currencyData[otherCurr.toLocaleLowerCase()])
    let ans = answer.toFixed(2)
    setinside(ans)
  }
  if (us) {
    console.log(us)
    let me = Object.keys(country)
    return (
      <>
      <div className='relative'>
        <div className=" relative z-1 text-yellow-900  bg-[url('https://img.freepik.com/free-vector/digital-rupee-concept-technology-background_1017-36657.jpg?t=st=1718597324~exp=1718600924~hmac=2de83807064d2fbbc4618d60096d31632862cf2dc60f03e1841e3e43830ac261&w=1060')]  bg-no-repeat bg-cover h-screen w-100 flex justify-center items-center">
      <div className='bg-black/50 w-full border border-spacing-x-11 relative z-10 h-screen flex justify-center items-center backdrop-blur-sm' >
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-7 text-black flex justify-center mr-auto pl-5 backdrop-blur-lg bg-white/50">
          <div>
            <div className="from">From</div>
            <input type="number" className=' bg-transparent bg-white/20'  onChange={handleFromInput} />
            <select className=' bg-transparent bg-white/20'  onChange={handleFrom} name="" id="" value={curr}>
              {me.map((d) => (
                <option key={uuidv4()} value={d}>{d}</option>
              ))}
            </select>
            <div className="to" readOnly>TO</div>
            <input className=' bg-transparent bg-white/20'  type="number" onChange={handleToInput} value={inside} />
            <select className=' bg-transparent bg-white/20'  onChange={handleTO} name="" id="" value={otherCurr}>
              {me.map((d) => (

                <option className=' bg-transparent bg-white/20'  key={uuidv4()} value={d}>{d}</option>
              ))}
            </select>
            <div>
              <button className= ' w-full backdrop-blur-sm btnclassName=" mt-3 bg-black/40 hover:bg-black/20 text-white px-3 py-2 rounded-lg' onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </>
    )
  } else {
    console.log('loading...')
  }


  // let exchangeData=Object.keys(us)






}

export default App

