import Barchart from "@/components/Barchart";
import Layout from "@/components/Layout"
import Linechart from "@/components/Linechart";
import Piechart from "@/components/Piechart";
import { useSession } from 'next-auth/react';



export default function Home() {
  const {data: session} = useSession();

  return (
    <Layout>
      
      <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
       
       
       <div className="flex bg-gray-200 gap-1 to-blue-900 rounded-lg overflow-hidden ">

         <img src={session?.user?.image} alt="" className=" w-10 h-10"/>
         <span className="py-1 px-2">
         {session?.user?.email}
         </span>
         
         </div>   


         
      </div>

<div className="hidden md:block">
      <Linechart />

          <div className="flex ">
                <div className="w-1/2" >
                  <Piechart/>
                </div>
                <div className="w-1/2" >
                <Barchart/>
                </div>

          </div>

    </div>  
      
    </Layout>
  )
}

