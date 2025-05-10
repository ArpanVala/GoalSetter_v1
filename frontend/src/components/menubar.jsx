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
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <div className="py-5 px-10 w-70 mx-auto">
      <Menubar>
  <MenubarMenu>
    <MenubarTrigger>Home</MenubarTrigger>
  </MenubarMenu>
  
  <MenubarMenu>
    <MenubarTrigger><Link to="/login" >Login</Link> </MenubarTrigger>
  </MenubarMenu>
  
  <MenubarMenu>
    <MenubarTrigger><Link to="/register" >Sign in</Link> </MenubarTrigger>
  </MenubarMenu>
</Menubar>

    </div>
  )
}

export default Navbar
