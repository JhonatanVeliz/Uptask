import { useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import Nav from "../components/Nav";
import NavModifyTask from "../components/NavModifyTask";
import DashboardCommits from "../components/DashboardCommits";
import ShowTaskDescription from "./ShowTaskDescription";
import ViewTaskData from "../components/ViewTaskData";
import ListMacroTasks from "../components/ListMacroTasks";

const MicroTasks = () => {

  const { taskId } = useParams();

  const stateMacroTasks = useSelector( ({macroTasks}) => macroTasks );
  const macroTaskAndTrackers = stateMacroTasks.find( ({ habit }) => habit.id == taskId );
  const { name, created_at, user_id, description } = macroTaskAndTrackers.habit;

  const [showDescription, setShowDescription] = useState(false);
  const changeDescription = () => setShowDescription(!showDescription);

  const dateTask= new Date(created_at);
  const createdDate = (Intl.DateTimeFormat('en-GB').format(dateTask));

  const yearForMicroTask = createdDate.slice(6);

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
          taskId={ taskId }
        />

      </div>

      <DashboardCommits yearForMicroTask={ yearForMicroTask } taskId={taskId}/>

      <ListMacroTasks />
    </>
  )
}

export default MicroTasks