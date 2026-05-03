import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import { SidebarProvider } from "../context/SidebarContext";

export default function MainLayout(){
    return(
        <SidebarProvider>
            <div className="min-h-screen bg-gray-100">
                <SideBar/>

                <div className="md:ml-56">
                    <Navbar/>
                    <div className="p-4">
                        <Outlet/>
                    </div>
                </div>

            </div>
        </SidebarProvider>

    )
}