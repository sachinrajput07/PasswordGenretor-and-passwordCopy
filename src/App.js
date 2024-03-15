import { useCallback, useEffect, useRef, useState } from 'react';
import logo from './logo.svg';


function App() {
  const [Length, setLength] = useState(8)
  const [isNumber , setNumber] = useState(false)
  const [isCharacter , setCharacter] = useState(false)
  const [Password , setPassword] = useState("")

  let passwordGenrator = useCallback(()=>{
    let pass= ''
    let str ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (isNumber) str += '0123456789';
    if(isCharacter) str += '!@#$%^&*(){}[]';
    for(let i = 1; i <= Length; i++) {
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[Length,isNumber,isCharacter,setPassword])
useEffect(()=>{
  passwordGenrator()
},[Length,isNumber,isCharacter,passwordGenrator])

let copyRef = useRef(null)

let copymethod = useCallback(()=>{
  copyRef.current?.select();
  copyRef.current?.setSelectionRange(0,9)
  window.navigator.clipboard.writeText(Password)
})

  return (
    <div className=' w-[550px]  bg-gray-600 mx-auto mt-5 h-[200px]'>
      <h1 className=' text-2xl text-white text-center py-5'>Password genretor</h1>
        <div className=' flex bg-white w-[500px] mx-auto rounded-l-2xl rounded-r-2xl'>
          <input type='text' placeholder='Password' className=' w-[450px] h-[50px] outline-none pl-5 rounded-l-2xl text-2xl' ref={copyRef} value={Password} />
          <button className=' bg-blue-500 w-[100px] rounded-r-2xl border-none' onClick={copymethod}> Copy</button>
        </div>
        <div className='flex my-3 gap-x-3'>
         <input type='range' className=' ml-7  cursor-pointer' onChange={(e)=> setLength(e.target.value)} />
         <label className=' text-lg text-orange-500'>Length : {Length}</label>
         <input type='checkbox' className=' w-4' defaultValue={isNumber} onChange= {()=>{ setNumber((prev)=> !prev) }} />
         <label className='text-lg text-orange-500' >Number</label>
         <input type='checkbox' className=' w-4 ' defaultChecked={isCharacter} onChange={()=>{setCharacter((prev)=> !prev)}} />
         <label className='text-lg text-orange-500'>Characters</label>
        </div>
    </div>
      );
}

export default App;
