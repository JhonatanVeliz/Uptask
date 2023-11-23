import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Nav from "../components/Nav";

const MicroTasks = () => {

  const { id } = useParams();

  const state = useSelector( state => state.projects );
  const project = state.find( projectItem => projectItem.id == id );

  return (
    <>
      <Nav />

      <div className="viewTask section">
          
          <h1 className="viewTask__title">{ project.project }</h1>

      </div>
    </>
  )
}

export default MicroTasks