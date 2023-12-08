import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { deleteMicroTask } from '../data/microTasks';
import { deleteMicroTaskState } from '../features/microTasksShow/microTaskSlice';

import imgDelete from '../assets/icons/delete.svg'

const MicroTask = React.memo(({ notes, created_at, index, taskId, microTaskId, token }) => {

  const date = created_at.slice(0, 10);
  const dispathc = useDispatch();

  const deleteTracker = async () => {

    try {
      const microTaskDeleted = 
        await deleteMicroTask( import.meta.env.VITE_API_URL + `habits/${taskId}/trackers/${microTaskId}`, token );
        dispathc(deleteMicroTaskState(index -1));
    } 
    catch (error) {console.log(error);}
  }

  return (
    <div className='microTasks__container'>

      <header>
        <ul className='microTasks__container__header'>
          <li className='microTasks__container__header__li'>{index}</li>
          <li className='microTasks__container__header__li'>{date}</li>
        </ul>
      </header>

      <ul className='microTasks__container__body' >
        <li className='microTasks__container__body__li'>
          <p className='microTasks__container__body__note'>{notes}</p>
        </li>

        <li className='microTasks__container__body__li'>
          <button className='microTasks__container__body__btn btn' onClick={deleteTracker}>
            <img src={imgDelete} alt=" eliminar tarea " />
          </button>
        </li>
      </ul>

    </div>
  )

})

const ListMacroTasks = () => {

  const { taskId, microTasks } = useSelector(({ microTasksList }) => microTasksList);
  const { token } = useSelector( ({ login }) => login);

  return (
    <>
      <div className={`${microTasks.length !== 0 ? 'microTasks microTasks--show' : 'microTasks microTasks--hidden'}`}>

        <h1>Hitos</h1>

        {
          microTasks.length !== 0
            ? microTasks.map(({ id, notes, created_at }, index) => (
              <MicroTask
                key={id}
                notes={notes}
                created_at={created_at}
                index={index + 1}
                taskId={taskId}
                microTaskId={id}
                token={token}
              />
            ))
            : null
        }

      </div>
    </>
  )
}

export default ListMacroTasks