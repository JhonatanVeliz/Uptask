import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createState } from '../features/microTasksShow/microTaskSlice';

const Commit = React.memo(({ dateTracker, taskId }) => {

  const dispatch = useDispatch();

  const [dataCommit, setDataCommit] = useState({ isShow: false, text: '' });
  const [fixedDivPosition, setFixedDivPosition] = useState({ x: 0, y: 0 });

  const { date } = dateTracker;
  const thisDate = new Date(date).toISOString().slice(0, 10);

  const stateMacroTasks = useSelector(({ macroTasks }) => macroTasks);
  const macroTaskAndTrackers = stateMacroTasks.find(({ habit }) => habit.id == taskId);
  const listOfTheTrackers = macroTaskAndTrackers.trackers;

  const searchTrackerCommit = listOfTheTrackers.filter(({ created_at }) => created_at.slice(0, 10) == thisDate);

  const theDate = new Date();
  const dateYear = theDate.getFullYear();
  const dateMonth = theDate.getMonth() +1;
  const dateDay = `0${theDate.getDate()}`;

  const dateComparation = `${dateYear}-${dateMonth}-${dateDay.slice(-2)}`

  const showTooltip = (e) => {
    const commit = e.target;
    const commitDate = commit.getAttribute('data-date');
    const commitInfo = commit.getAttribute('data-info');
    setDataCommit({isShow : true, text : `${commitInfo} tareas ${commitDate}`});
    
    const x = e.clientX;
    const y = e.clientY;

    setFixedDivPosition({x, y});
  }

  const hiddenTooltip = () => {
    setDataCommit({isShow : false, text : ''});
  }

  const showData = () => {
    dispatch(createState( {taskId, microTasks : searchTrackerCommit} ));
  }

  return (
    <>
      {
        dataCommit.isShow &&
        <div 
          className='viewTask__commits__tooltip'
          style={{
            position: 'fixed',
            left: fixedDivPosition.x + 10 + 'px',
            top: fixedDivPosition.y - 35 + 'px',
            backgroundColor: '#181817',
            zIndex: 99,
          }}
        >
          {dataCommit.text}
        </div>
      }

      <span
        className={
          `viewTask__commits__item 
          viewTask__commits__item--${searchTrackerCommit.length !== 0
            ? searchTrackerCommit.length == 3 
              ? 'active__level-2' : 
                searchTrackerCommit.length > 3 ? 'active__level-3' : 'active__level-1'
            : ''
          }
          viewTask__commits__item--${dateComparation === thisDate ? 'appear' : ''}`
        }
        title={`${searchTrackerCommit.length} tareas ${thisDate}`}
        data-date={thisDate || ''}
        data-info={searchTrackerCommit.length || 0 }
        onClick={showData}
        // onMouseEnter={showTooltip}
        // onMouseLeave={hiddenTooltip}
      >
      </span>
    </>
  )
})

export default Commit