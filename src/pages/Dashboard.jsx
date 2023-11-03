import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import CardsDashboard from "../components/CardsDashboard";
import Modal from "../components/Modal";

// SLICE
import { deleteProject } from "../features/projects/projectsSlice";

const Dashboard = () => {

  const user = useSelector(state => state.login.user);
  const stateProjects = useSelector( state => state.projects );
  const dispatch = useDispatch();

  const initialStateModal = false;
  const [showModal, setShowModal] = useState(initialStateModal);

  const removeModal = () => {
    setShowModal(initialStateModal);
    localStorage.setItem('warning', JSON.stringify('false'));
  }

  useEffect(() => {

    if(user !== 'root') return;

    const hasSeenWarning = localStorage.getItem('warning');

    if (!hasSeenWarning) {
      setShowModal(true);
    }

    // Agregar un event listener para que al salir el usuario se elimine su registro
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };

  }, []);

  const handleBeforeUnload = () => {
    localStorage.removeItem('warning');
  }

  const removeProject = projectId => {
    dispatch(deleteProject(projectId));
  }

  return (
    <section className='section dashboard'>

      <h1>Dashboard</h1>

      <div className="dashboard__container">

        <div className="dashboard__container__btn">
          <NavLink to={`/new-project/${user}`} className='dashboard__container__btn__item'>
            Crear Nuevo Proyecto
          </NavLink>
        </div>

        {
          stateProjects.map( ( project ) => (
            <CardsDashboard 
              key={project.id} 
              routeTo={`/tasks/${project.id}`} 
              title={project.project}
              description={project.description}
              id={ project.id }
            />
          ))
        }
      </div>

      {
        showModal
          ? <Modal title="Advertencia" text="Hola, por ahora estas de visita eso significa que cuando salgas no podremos guardar tus cambios y tareas. Pero puedes crear una cuenta totalmente gratuita para que podamos llevar un seguimiento de tus tareas. ¡ Espero que la aplicación sea de tu agrado !"
            removeModal={removeModal}
          />
          : null
      }

    </section>
  )
}

export default Dashboard