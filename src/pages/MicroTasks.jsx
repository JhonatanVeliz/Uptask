import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Nav from "../components/Nav";
import DashboardCommits from "../components/DashboardCommits";

const MicroTasks = () => {

  const { id } = useParams();

  const stateMacroTasks = useSelector( ({macroTasks}) => macroTasks );
  const { name, created_at, updated_at, user_id } = stateMacroTasks.find( macroTask => macroTask.id == id );
  console.log(name, created_at, updated_at, user_id);

  const createdDate = created_at.slice(0, 10);

  return (
    <>
      <Nav />

      <div className="viewTask section">
          
          <h1 className="viewTask__title">{ name }</h1>
          <p className="viewTask__text">
            { 'Macro Tarea creada :'}
            <span>{ createdDate }</span>
          </p>

      </div>

      <DashboardCommits />
    </>
  )
}

export default MicroTasks