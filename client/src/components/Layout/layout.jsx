
import React, { useEffect, useState } from "react";
import Menu from '../Menu/Menu'
import picture1 from '../images/1917.jpg';
import { Outlet } from "react-router-dom";
function layout(){
 return(
    <div>
        
        <div className=" relative h-[100vh] w-full ">
        <div className="absolute z-10 w-full">
            <Menu />
        </div>
        <Outlet/>
            
        </div>
        
    </div>
 )
}
export default layout;