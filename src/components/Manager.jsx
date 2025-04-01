import React, { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])
  const passwordRef = useRef()

  const getPasswords = async()=>{
    let req = await fetch('http://localhost:3000/')
    let passwords = await req.json()
    setpasswordArray(passwords)
    console.log(passwords)

  }

  useEffect(() => {
    getPasswords()
  }, [])

  const showPassword = () => {

    if (passwordRef.current.type === "text") {
      passwordRef.current.type = "password"
    } else {
      passwordRef.current.type = "text"
    }
  }
  const savePassword = async() => {

    if( form.site.length > 0 && form.username.length > 0 && form.password.length > 0){
      // if id exist delete it 
      if(form.id){
        await fetch('http://localhost:3000/', {
          method: 'DELETE',
          headers:{
            'Content-type': 'application/json',
  
          },
          body: JSON.stringify({ id:form.id})
        })
      }
      const newId = uuidv4();
      setpasswordArray([...passwordArray, { ...form, id: newId }])
      await fetch('http://localhost:3000/', {
        method: 'POST',
        headers:{
          'Content-type': 'application/json',

        },
        body: JSON.stringify({...form, id: newId})
      })
    
    console.log([...passwordArray, form])
    alert("Password Saved!")

    
    }else{
      alert("Please fill all the fields")
    }
    
  }

  const deletePassword = async (id) => {
    console.log("deleting password with id: ", id)

    let c = confirm("Are you sure you want to Delete this Password?")
    if (c) {
      setpasswordArray(passwordArray.filter(item => item.id != id))
      
      let res = await fetch('http://localhost:3000/', {
        method: 'DELETE',
        headers:{
          'Content-type': 'application/json',

        },
        body: JSON.stringify({ id})
      })

      alert("Password Deleted!")

      
    }
    

  }

  const editPassword = (id) => {
      console.log("Editing password with id:", id)
      setform({...passwordArray.filter(i => i.id === id)[0], id:id})
      setpasswordArray(passwordArray.filter(item => item.id != id))
    


  }




  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const copyText = (text) => {
    alert("Text Copied!")
    navigator.clipboard.writeText(text);
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition='Bounce'
      />

      <div className=" p-2 md:p-0 md:mycontainer min-h-[88vh] bg-green-50 text-white">
        <h1 className='text-4xl font-bold text-center text-black'>
          <span className='text-green-700'> &lt;</span>Pass<span className='text-green-700'>PRO/&gt;</span>
        </h1>
        <p className='text-green-800 text-center'>Your own password manager</p>
        <div className='flex flex-col p-4 text-black gap-8 items-center'>
          <input value={form.site} onChange={handleChange} className='bg-white w-full rounded-full border border-green-700 p-4 py-1' type="text" name='site' placeholder='Enter website URL' />
          <div className="flex flex-col md:flex-row text-black w-full justify-between gap-5 ">
            <input value={form.username} onChange={handleChange} className='bg-white w-full rounded-full border border-green-700 p-4 py-1' type="text" name='username' placeholder='Enter Username' />

            <div className='relative'>
              <input value={form.password} onChange={handleChange} className='bg-white w-full rounded-full border border-green-700 p-4 py-1' type="password" ref={passwordRef} name='password' placeholder='Enter Password ' />
              <span onClick={showPassword} className='absolute right-[3px] top-[1px] cursor-pointer'>
                <lord-icon
                  src="https://cdn.lordicon.com/dicvhxpz.json"
                  trigger="hover"
                  stroke="bold"
                  colors="primary:#121331,secondary:#000000"
                  style={{ width: '25px', height: '25px', paddingTop: '3px', marginRight: '3px' }}
                >
                </lord-icon>
              </span>
            </div>

          </div>
          <div>
            <button className='flex justify-center items-center hover:bg-green-400 cursor-pointer bg-green-500 rounded-full px-3 py-2 w-fit gap-2 border-black border-2' onClick={savePassword}>
              <lord-icon
                src="https://cdn.lordicon.com/sbnjyzil.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#000000,secondary:#000000"
              >
              </lord-icon>
              Save </button>
          </div>

        </div>
        <div className="passwords text-black">
          <h2 className='font-bold text-2xl py-4 ml-2'>Your Passwords</h2>
          {passwordArray.length === 0 && <div className='ml-2'> No passwords to show </div>}
          {passwordArray.length != 0 &&
            <table className="mb-10 table-auto w-full rounded-md overflow-hidden">
              <thead className='bg-green-800 text-white'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-green-100'>
                {passwordArray.map((item, index) => {

                  return <tr key={index}>
                    <td className='text-center text-black py-2 border-1 border-white '>
                      <div className='flex justify-center items-center'>
                        <a href={item.site} target='_blank'>{item.site}</a>
                        <div className='size-7 cursor-pointer lordiconcopy' onClick={() => copyText(item.site)}>
                          <lord-icon
                            style={{ width: '20px', height: '20px', 'paddingTop': '3px', 'paddingLeft': '5px' }}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          >
                          </lord-icon>
                        </div>
                      </div>

                    </td>
                    <td className=' text-center py-2 border-1 border-white'>
                      <div className='flex justify-center items-center'>
                        <span>{item.username}</span>
                        <div className='size-7 cursor-pointer lordiconcopy' onClick={() => copyText(item.username)}>
                          <lord-icon
                            style={{ width: '20px', height: '20px', 'paddingTop': '3px', 'paddingLeft': '5px' }}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          >
                          </lord-icon>
                        </div>
                      </div>

                    </td>
                    <td className=' text-center py-2 border-1 border-white'>
                      <div className="flex justify-center items-center">
                        <span>{"*".repeat(item.password.length)}</span>
                        <div className='size-7 cursor-pointer lordiconcopy' onClick={() => copyText(item.password)}>
                          <lord-icon
                            style={{ width: '20px', height: '20px', 'paddingTop': '3px', 'paddingLeft': '5px' }}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          >
                          </lord-icon>
                        </div>
                      </div>

                    </td>
                    <td className=' text-center py-2 border-1 border-white'>
                      <span className='cursor-pointer mx-2' onClick={() => editPassword(item.id)}>
                        <lord-icon
                          src="https://cdn.lordicon.com/exymduqj.json"
                          trigger="hover"
                          stroke="bold"
                          state="hover-line"
                          colors="primary:#121331,secondary:#000000"
                          style={{ width: '27px', height: '27px' }}
                        >
                        </lord-icon>
                      </span>
                      <span className='cursor-pointer mx-2' onClick={() => deletePassword(item.id)}>
                        <lord-icon
                          src="https://cdn.lordicon.com/hwjcdycb.json"
                          trigger="hover"
                          stroke="bold"
                          state="hover-line"
                          colors="primary:#121331,secondary:#000000"
                          style={{ width: '27px', height: '27px' }}
                        >
                        </lord-icon>
                      </span>


                    </td>
                  </tr>
                })}


              </tbody>
            </table>}
        </div>
      </div>
    </>
  )
}

export default Manager
