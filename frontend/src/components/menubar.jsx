import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import React from 'react'
//main
import {Link,useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {logout, reset} from '../features/auth/authSlice'

const Navbar = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const {user} = useSelector((state) => state.auth)
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  return (
    <div className="py-5 px-10 w-70 mx-auto">
      <Menubar>
  <MenubarMenu>
    <MenubarTrigger>Home</MenubarTrigger>
  </MenubarMenu>
  
  

 
    {user?( <MenubarMenu>
      <MenubarTrigger><Link to="/register" onClick={onLogout}>Logout</Link> </MenubarTrigger></MenubarMenu>)
        :
        (<>
          <MenubarMenu>
            <MenubarTrigger><Link to="/login" >Login</Link> </MenubarTrigger>
          </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger><Link to="/register" >Sign in</Link> </MenubarTrigger>
      </MenubarMenu>
    </>) }

</Menubar>
    </div>
  )
}

export default Navbar
