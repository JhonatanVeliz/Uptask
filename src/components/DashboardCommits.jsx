import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import TextTarea from "./TextTarea";
import Commit from "./Commit";

import { createMicroTask } from "../data/microTasks";
import { createState } from "../features/microTasksShow/microTaskSlice";
import { getMacroTasks } from "../data/macroTasks";
import { createMacroTasksState } from "../features/macroTasks/macroTaskSlice";

const Months = ({ month }) => {
  return (
    <span>{month}</span>
  )
}

const DashboardCommits = ({ yearForMicroTask, taskId }) => {

  const [listMicroTasks, setListMicroTasks] = useState([]);
  const [tracker, setTracker] = useState({ notes: '' });
  const { token } = useSelector(({ login }) => login);
  const dispatch = useDispatch();

  const year = yearForMicroTask;
  const months = ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul', 'Ago.', 'Sep.', 'Oct.', 'Nov', 'Dic'];

  const stateMacroTasks = useSelector(({ macroTasks }) => macroTasks);
  const macroTaskAndTrackers = stateMacroTasks.find(({ habit }) => habit.id == taskId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const trackerCreated = await createMicroTask(import.meta.env.VITE_API_URL + `habits/${taskId}/trackers`, tracker, token);
      const getNewStateForStateGlobal = await getMacroTasks(import.meta.env.VITE_API_URL + `habits`, token);
      dispatch(createMacroTasksState(getNewStateForStateGlobal));
      dispatch(createState({ taskId, microTasks : macroTaskAndTrackers.trackers }));
      setTracker({ notes: '' });
    }
    catch (error) { console.log(error); }
  }

  const changeTracker = (name, value) => {
    setTracker({ ...tracker, [name]: value });
  }

  useEffect(() => {

    // Crear un array para almacenar todos los días del año
    const allDays = [];

    // Recorrer cada month del año
    for (let month = 0; month < 12; month++) {
      // Obtener el último día del month actual
      const lastDayOfTheMonth = new Date(year, month + 1, 0).getDate();

      // Generar y agregar todos los días del month al array
      for (let day = 1; day <= lastDayOfTheMonth; day++) {
        const fecha = new Date(year, month, day);
        allDays.push({ date: fecha });
      }

    }

    // Ahora, allDays contendrá todas las fechas del año especificado
    setListMicroTasks(allDays);
  }, []);


  return (
    <div className="viewTask__commits">

      <h3 className="viewTask__commits__title">{year}</h3>

      <div className="viewTask__commits__dashboard">
        <div className="viewTask__commits__months">
          {
            months.map((month, i) => <Months key={i * 12} month={month} />)
          }
        </div>
        {
          listMicroTasks.map((date, id) => <Commit key={id * 2} dateTracker={date} taskId={taskId} />)
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
export default DashboardCommits