import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import TextTarea from "./TextTarea";
import { createMicroTask } from "../data/microTasks";
import Commit from "./Commit";

import { getMacroTasks } from "../data/macroTasks";
import { createMacroTasksState } from "../features/macroTasks/macroTaskSlice";

const DashboardCommits = ({ yearForMicroTask, taskId }) => {

  const [listMicroTasks, setListMicroTasks] = useState([]);
  const [tracker, setTracker] = useState({ notes: '' });
  const { token } = useSelector(({ login }) => login);
  const dispatch = useDispatch();

  const year = yearForMicroTask;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const trackerCreated = await createMicroTask(import.meta.env.VITE_API_URL + `habits/${taskId}/trackers`, tracker, token);
      const getNewStateForStateGlobal = await getMacroTasks(import.meta.env.VITE_API_URL + `habits`, token);
      dispatch(createMacroTasksState(getNewStateForStateGlobal));
      setTracker( { notes : '' } );
    }
    catch (error) { console.log(error); }
  }

  const changeTracker = (name, value) => {
    setTracker({ ...tracker, [name]: value });
  }

  useEffect(() => {

    // Crear un array para almacenar todos los días del año
    const todosLosDias = [];

    // Recorrer cada mes del año
    for (let mes = 0; mes < 12; mes++) {
      // Obtener el último día del mes actual
      const ultimoDiaDelMes = new Date(year, mes + 1, 0).getDate();

      // Generar y agregar todos los días del mes al array
      for (let dia = 1; dia <= ultimoDiaDelMes; dia++) {
        const fecha = new Date(year, mes, dia);
        todosLosDias.push({ date: fecha });
      }

    }

    // Ahora, todosLosDias contendrá todas las fechas del año especificado
    setListMicroTasks(todosLosDias);

  }, []);


  return (
    <div className="viewTask__commits">

      <h3 className="viewTask__commits__title">{year}</h3>

      <div className="viewTask__commits__dashboard">
        {
          listMicroTasks.map(( date, id) => <Commit id={ id * 2 } dateTracker={ date } taskId={ taskId } />)
        }
      </div>

      <form onSubmit={handleSubmit} className="viewTask__commits__create">

        <TextTarea
          htmlId="tracker"
          name="notes"
          changeNote={changeTracker}
          value={tracker.notes}
        />

        <button type="submit" className="viewTask__commits__create__btn">Crear</button>

      </form>

    </div>
  )
}

// (
//   <span className="viewTask__commits__item" key={i} data-date={ day || 'no hay' }></span>
// )

export default DashboardCommits