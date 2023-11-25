import { useState, useEffect } from "react";


const DashboardCommits = () => {

  const [listMicroTasks, setListMicroTasks] = useState([]);

  const date = new Date();
  const year = date.getFullYear();

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

      <h3 className="viewTask__commits__title">{ year }</h3>


      <div className="viewTask__commits__dashboard">
        {
          listMicroTasks.map((day, i) => (
            <span className="viewTask__commits__item" key={i}></span>
          ))
        }
      </div>
      
    </div>
  )
}

export default DashboardCommits