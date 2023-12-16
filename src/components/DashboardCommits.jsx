import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import TextTarea from "./TextTarea";
import Commit from "./Commit";

import { createMicroTask } from "../data/microTasks";
import { createState } from "../features/microTasksShow/microTaskSlice";
import { getMacroTasks } from "../data/macroTasks";
import { createMacroTasksState } from "../features/macroTasks/macroTaskSlice";
import LoaderApp from "../pages/LoaderApp";

const Months = React.memo(({ month }) => {
  return (
    <span>{month}</span>
  )
})

const DashboardCommits = ({ yearForMicroTask, taskId }) => {

  const [listMicroTasks, setListMicroTasks] = useState([]);
  const [tracker, setTracker] = useState({ notes: '' });
  const { token } = useSelector(({ login }) => login);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [year, setYear] = useState(yearForMicroTask);
  const [isShowYear, setIsShowYear] = useState(false);
  const months = ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul', 'Ago.', 'Sep.', 'Oct.', 'Nov', 'Dic'];

  const stateMacroTasks = useSelector(({ macroTasks }) => macroTasks);
  const macroTaskAndTrackers = stateMacroTasks.find(({ habit }) => habit.id == taskId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(tracker.notes === '') return;

    setIsLoading(true);

    try {
      const trackerCreated = await createMicroTask(import.meta.env.VITE_API_URL + `habits/${taskId}/trackers`, tracker, token);
      const getNewStateForStateGlobal = await getMacroTasks(import.meta.env.VITE_API_URL + `habits`, token);
      dispatch(createMacroTasksState(getNewStateForStateGlobal));
      dispatch(createState({ taskId, microTasks: [...macroTaskAndTrackers.trackers, trackerCreated ] }));
      setTracker({ notes: '' });
    }
    catch (error) { console.log(error); }
    setIsLoading(false);
  }

  const changeTracker = (name, value) => {
    setTracker({ ...tracker, [name]: value });
  }

  const createAllDays = () => {

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

    return allDays;

  }

  useEffect(() => {
    // Ahora, allDays contendrá todas las fechas del año especificado
    setListMicroTasks(createAllDays());
  }, [year]);

  const changeYear = (newYear) => {
    if(newYear != year){
      setYear(Number(newYear));
    }
  }

  const showYear = (e) => {
    const newYear = (e.target.innerText);
    setIsShowYear(!isShowYear);
    changeYear(newYear);
  }

  return (
    <>

      { isLoading && <LoaderApp /> }
      
      <div className="viewTask__commits">

        <button className="viewTask__commits__title" onClick={showYear}>{year}</button>

        {
          isShowYear && 
          <div className="viewTask__commits__years">
            <span onClick={showYear}>{yearForMicroTask}</span>
            <span onClick={showYear}>{+(yearForMicroTask) + 1}</span>
            <span onClick={showYear}>{+(yearForMicroTask) + 2}</span>
          </div>
        }

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
    </>
  )
}
export default DashboardCommits