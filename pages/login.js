import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem("myuser")) {
            router.push('/')
        }

    }, [])


    const handleChange = (e) => {
        if (e.target.name == "email") {
            setEmail(e.target.value)
        } else if (e.target.name == "password") {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = async () => {
        const data = { email, password }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        setEmail('')
        setPassword('')

        if (response.success) {
            localStorage.setItem("myuser", JSON.stringify({ token: response.token, email: response.email }))
            toast.success('You are successfully logged in your Account', {
                position: "top-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setTimeout(() => {
                router.push(process.env.NEXT_PUBLIC_HOST)
            }, 1000)

        }
        else {
            toast.error('Invalid Credentials', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }




    return (

        <div className='flex items-center justify-center bg-log h-screen' >
            <Head>
                <title>Login into Account !</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className='flex items-center justify-center drop-shadow-lg bg-slate-200'>
                <Image src={"/logiin.jpg"} className='w-[45vh] h-[60vh] mr-16 md:block hidden' width={300} height={600} />
                <div className='flex flex-col mr-10 pl-5'>
                    <h1 className='text-center text-4xl font-bold mt-3'>Oruphones</h1>
                    <label className='mt-10 text-xl font-semibold' htmlFor="email">Email address</label>
                    <input onChange={handleChange} value={email} className='rounded-lg mt-1 w-80 p-2 text-md  bg-white' type="email" placeholder='email' id='email' name='email' />
                    <label className='mt-5 text-xl font-semibold' htmlFor="password">Password</label>
                    <input onChange={handleChange} name='password' value={password} className='rounded-lg mt-1 border-x-2 w-80 p-2 text-md bg-white' type="password" id='password' placeholder='Password' />
                    <button onClick={handleSubmit} className='bg-blue-500 text-white text-xl mt-5 py-2 rounded-lg drop-shadow-md'>Log in</button>
                    <Link href={"/forgot"} className='text-blue-500 my-2 text-center'>Forgot password ?</Link>
                    <span className='text-lg mt-4 mb-5 text-center'>Do not have an Account ? <Link className='text-blue-500' href={"/signup"}>Sign up</Link></span>
                </div>
            </div>

        </div>

    )
}

export default Login
