import React from 'react';
import { useSelector } from 'react-redux';

const Commit = React.memo(({ id, dateTracker, taskId }) => {

  const { date } = dateTracker;
  const thisDate = new Date(date).toISOString().slice(0, 10);

  const stateMacroTasks = useSelector( ({macroTasks}) => macroTasks );
  const macroTaskAndTrackers = stateMacroTasks.find( ({ habit }) => habit.id == taskId );
  const listOfTheTrackers = macroTaskAndTrackers.trackers;

  const searchTrackerCommit = listOfTheTrackers.filter( ({ created_at }) => created_at.slice(0, 10) == thisDate);
  searchTrackerCommit.length !== 0 ? console.log(searchTrackerCommit) : ''

  return (
    <span 
      className={ 
        `viewTask__commits__item 
        ${ searchTrackerCommit.length !== 0 
          ? 'viewTask__commits__item--active' 
          : '' 
        }` 
      } 
      key={ id } 
      data-date={ thisDate || '' }
    >
    </span>
  )
})

export default Commit