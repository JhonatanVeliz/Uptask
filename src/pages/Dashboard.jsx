import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import Nav from "../components/Nav";
import CardsDashboard from "../components/CardsDashboard";
import Modal from "../components/Modal";
import MessageWelcome from "../components/MessageWelcome";

// SLICE
import { deleteProject } from "../features/projects/projectsSlice";
import ShowMessage from "../components/ShowMessage";

const Dashboard = () => {

  const userToken = useSelector(state => state.login.token);
  const stateProjects = useSelector(state => state.projects);
  const dispatch = useDispatch();

  const initialStateModal = false;
  const [showModal, setShowModal] = useState(initialStateModal);
  const userName = localStorage.getItem('userName') || 'user root';

  const removeModal = () => {
    setShowModal(initialStateModal);
    localStorage.setItem('warning', JSON.stringify('false'));
  }

  useEffect(() => {

    if (userToken !== 'root') return;

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

  setInterval(() => {
    fetch('https://upconstthebackendykm.onrender.com/login');
  }, 50000);

  return (
    <>

      <Nav />

      <MessageWelcome userName={userName} />

      <section className='section dashboard'>



        <h1>Dashboard</h1>

        <div className="dashboard__container">

          <div className="dashboard__container__btn">
            <NavLink to={`/new-project/${userToken}`} className='dashboard__container__btn__item'>
              Crear Nuevo Proyecto
            </NavLink>
          </div>

          {
            stateProjects.length !== 0
              ? stateProjects.map((project) => (
                <CardsDashboard
                  key={project.id}
                  routeTo={`/tasks/${project.id}`}
                  title={project.project}
                  description={project.description}
                  id={project.id}
                />
              ))
              : <ShowMessage message="listado de proyectos vacío" />
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
    </>
  )
}

export default Dashboard