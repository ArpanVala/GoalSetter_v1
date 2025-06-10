import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import  {useEffect} from 'react'
import { toast } from 'react-toastify'


const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector((state)=>state.auth) 
   
    useEffect(() => {
        if (!user) {
            toast.error('Please login or register')
            navigate('/login')
        }
    }, [user, navigate])
  return (
    <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome {user.name}</p>
    </div>
  )
}

export default Dashboard
