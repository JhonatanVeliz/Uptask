import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { generatorId } from "../helpers";

const Day = ({ day, trackers, todayIndex }) => {

  let dayOfTheWeek = null;
  let valueColoration = 0;

  if(trackers){

    const search = trackers.some( ( {created_at} ) => {
      const date = new Date(created_at).getDay();
      valueColoration++;
      return date -1 == todayIndex
    });

    dayOfTheWeek = search;
  }

  return (
    <li className="dashboard__container__card__commits__li">
      <span 
        className={
          `dashboard__container__card__commits__date 
           dashboard__container__card__commits__date${dayOfTheWeek 
            ? valueColoration == 1 ? '__active' : valueColoration === 3 ? '__active-level-2' : '__active-level-3'
            : ''}`
        }
      >
      </span>

      <span className="dashboard__container__card__commits__title">{ day }</span>
    </li>
  )
}

const CardsDashboard = ({ routeTo = '/dashboard', name = '', description = '', taskId = '' }) => {

  const daysOfTheWeek = [
    { id : generatorId(), day : 'D' }, 
    { id : generatorId(), day : 'L' }, 
    { id : generatorId(), day : 'M' }, 
    { id : generatorId(), day : 'M' },
    { id : generatorId(), day : 'J' },
    { id : generatorId(), day : 'V' },
    { id : generatorId(), day : 'S' }
  ];

  const stateMacroTasks = useSelector(({ macroTasks }) => macroTasks);
  const macroTaskAndTrackers = stateMacroTasks.find(({ habit }) => habit.id == taskId);

  return (
    <NavLink to={routeTo} className="dashboard__container__card">

      <h3>{ name }</h3>

      <ul className="dashboard__container__card__commits">
        {
          daysOfTheWeek.map( ({ id, day }, index) => (
            <Day 
              key={id} 
              day={day} 
              trackers={macroTaskAndTrackers.trackers}
              todayIndex={index}
            />
          ))
        }
      </ul>

      <p data-task={description }>descripción de la tarea</p>

    </NavLink>
  )
}

export default CardsDashboard