import { useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import Nav from "../components/Nav";
import NavModifyTask from "../components/NavModifyTask";
import DashboardCommits from "../components/DashboardCommits";
import ShowTaskDescription from "./ShowTaskDescription";
import ViewTaskData from "../components/ViewTaskData";

const MicroTasks = () => {

  const { id } = useParams();

  const stateMacroTasks = useSelector( ({macroTasks}) => macroTasks );
  const { name, created_at, updated_at, user_id, description } = stateMacroTasks.find( macroTask => macroTask.id == id );

  const [showDescription, setShowDescription] = useState(false);
  const changeDescription = () => setShowDescription(!showDescription);
  
  const createdDate = created_at.slice(0, 10);

  return (
    <>
      <Nav />

      <div className="viewTask section">
          
        <ViewTaskData taskName={ name } createdDate={ createdDate } />

        { showDescription && <ShowTaskDescription description={ description } /> }

        <NavModifyTask 
          changeDescription={changeDescription}
          showDescription={ showDescription }
          nameTask={ name }
          taskId={ id }
        />

      </div>

      <DashboardCommits />
    </>
  )
}

export default MicroTasks