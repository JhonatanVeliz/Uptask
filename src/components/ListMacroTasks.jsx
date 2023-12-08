import React from 'react'
import { useSelector } from 'react-redux';

const MicroTask = ({ notes, created_at, index, taskId }) => {

  const date = created_at.slice(0, 10)

  return (
    <div className='microTasks__container'>

      <header>
        <ul className='microTasks__container__header'>
          <li className='microTasks__container__header__li'>{index}</li>
          <li className='microTasks__container__header__li'>{date}</li>
        </ul>
      </header>

      <p className='microTasks__container__note'>{notes}</p>


    </div>
  )

}

const ListMacroTasks = () => {

  const { taskId, microTasks } = useSelector(({ microTasksList }) => microTasksList);

  console.log(microTasks);

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
              />
            ))
            : null
        }

      </div>
    </>
  )
}

export default ListMacroTasks