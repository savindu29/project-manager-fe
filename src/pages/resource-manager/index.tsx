import { Link } from "react-router-dom";
import MiniDrawer from "../../layout";
import { ResourcesManagerPage } from "./resources-manager-page";

export function ManageResources(){
return(
    <div>
      <div className='flex '>
        <MiniDrawer />
        <div className=' py-2 w-full  '>
          <div className=' justify-end fixed z-10 bg-zinc-100  right-8 top-8'>
            <Link to="/projects">
              <div className="bg-black  text-semibold text-xs text-white px-4 py-2 rounded hover:cursor-pointer">
                Go Back
              </div>
            </Link>
          </div>
          <ResourcesManagerPage />
        </div>

      </div>
    </div>
);
}