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

  const macroTasksSlice = useSelector( ({macroTasks}) => macroTasks );
  const stateOfStorage = JSON.parse(sessionStorage.getItem('macroTasks'));
  const stateMacroTasks = macroTasksSlice.length > 0 ? macroTasksSlice : stateOfStorage;
  
  const macroTaskAndTrackers = stateMacroTasks.find( ({ habit }) => habit.id == taskId );
  const { name, created_at, description } = macroTaskAndTrackers.habit;
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