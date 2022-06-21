import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
import { database } from './firebase';
import React from "react";
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Declaro la variable y una funciÃ³n que llamarÃ© para almacenar todas las tareas (Arrray).
  const [agenda, setTasks] = React.useState([]);
  let id;
  let nombre;
  let apellidos;
  let direccion;
  let ciudad;
  let codigoPostal;
  let nacimiento;

  React.useEffect(() => {
    const q = query(collection(database, "agenda")); // Preparo una consulta para recoger todas las tareas de la base de datos.

    const unsub = onSnapshot(q, (querySnapshot) => { // Ejecuto la query.
      let data = []; // En este array se almacenarÃ¡n todas las tareas recogidas de la base de datos.

      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      setTasks(data); // Almaceno todas las tareas en mi variable gracias al mÃ©todo.
    });

    return () => unsub();
  }, []);

  // MÃ©todo para actualizar cada una de las tareas.
  const updateTask = async () => {
    await updateDoc(doc(database, "agenda", id), { nombre: nombre, apellidos: apellidos, direccion: direccion, ciudad: ciudad, codigoPostal: codigoPostal, nacimiento: nacimiento });

    id = ""
    nombre = "";
    apellidos = "";
    direccion = "";
    ciudad = "";
    codigoPostal = "";
    nacimiento = "";

    document.getElementById("nombre").value = nombre;
    document.getElementById("apellidos").value = apellidos;
    document.getElementById("direccion").value = direccion;
    document.getElementById("ciudad").value = ciudad;
    document.getElementById("codigoPostal").value = codigoPostal;
    document.getElementById("nacimiento").value = nacimiento;
  };

  // MÃ©todo para eliminar cada una de las tareas.
  const deleteTask = async (e) => {
    await deleteDoc(doc(database, "agenda", e.target.value));
  };

  const nuevo = async (e) => {

    
    e.preventDefault(); // Detengo los eventos para que no se actualice directamente, antes compruebe la condición.   
    await addDoc(collection(database, "agenda"), { nombre: nombre, apellidos: apellidos, direccion: direccion, ciudad: ciudad, codigoPostal: codigoPostal, nacimiento: nacimiento });

    nombre = "";
    apellidos = "";
    direccion = "";
    ciudad = "";
    codigoPostal = "";
    nacimiento = "";

    //Setear los inputs
    document.getElementById("nombre").value = nombre;
    document.getElementById("apellidos").value = apellidos;
    document.getElementById("direccion").value = direccion;
    document.getElementById("ciudad").value = ciudad;
    document.getElementById("codigoPostal").value = codigoPostal;
    document.getElementById("nacimiento").value = nacimiento;
  }

  const mostrar = async (dato) => {
    id = dato.id;
    nombre = dato.nombre;
    apellidos = dato.apellidos;
    direccion = dato.direccion;
    ciudad = dato.ciudad;
    codigoPostal = dato.codigoPostal;
    nacimiento = dato.nacimiento;

    //Settear los inputs
    document.getElementById("nombre").value = nombre;
    document.getElementById("apellidos").value = apellidos;
    document.getElementById("direccion").value = direccion;
    document.getElementById("ciudad").value = ciudad;
    document.getElementById("codigoPostal").value = codigoPostal;
    document.getElementById("nacimiento").value = nacimiento;

  }

  const settear = async (e) => {
    switch (e.target.id) {
      case "nombre":
        nombre = e.target.value
        break;
      case "apellidos":
        apellidos = e.target.value
        break;
      case "direccion":
        direccion = e.target.value
        break;
      case "ciudad":
        ciudad = e.target.value
        break;
      case "codigoPostal":
        codigoPostal = e.target.value
        break;
      case "nacimiento":
        nacimiento = e.target.value
        break;
    }
  }






  return (
    <div className="App">
      <div className="container">


        <div className="row">
          <div className="col-8">
            <table className="table" >
              <thead>
                <tr >
                  <th >Nombre</th>
                  <th >Apellidos</th>
                  <th >Dirección</th>
                  <th >Ciudad</th>
                  <th >Código Postal</th>
                  <th >Fecha de nacimiento</th>
                  <th >Opciones</th>
                </tr>
              </thead>
              <tbody>
                {agenda.map(dato => (
                  <tr >
                    <td>{dato.nombre}</td>
                    <td >{dato.apellidos}</td>
                    <td >{dato.direccion}</td>
                    <td>{dato.ciudad}</td>
                    <td >{dato.codigoPostal}</td>
                    <td>{dato.nacimiento}</td>
                    <td><button value={dato.id} onClick={() => mostrar(dato)}>Editar</button>
                      <button value={dato.id} onClick={deleteTask}>Borrar</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        

          <div className="col-4">
          <table>
            <tbody>
              <tr>
                <td><strong>Nombre: </strong></td>
                <td><input type="text" id="nombre" value={nombre} onChange={settear}></input></td>
              </tr>
              <tr>
                <td><strong>Apellidos: </strong></td>
                <td><input type="text" id="apellidos" value={nombre} onChange={settear}></input></td>
              </tr>
              <tr>
                <td><strong>Dirección: </strong></td>
                <td><input type="text" id="direccion" value={direccion} onChange={settear}></input></td>
              </tr>
              <tr>
                <td><strong>Ciudad: </strong></td>
                <td><input type="text" id="ciudad" onChange={settear} value={ciudad}></input></td>
              </tr>
              <tr>
                <td><strong>Código Postal: </strong></td>
                <td> <input type="text" id="codigoPostal" onChange={settear} value={codigoPostal}></input></td>
              </tr>
              <tr>
                <td><strong>Fecha de nacimiento: </strong></td>
                <td><input type="text" id="nacimiento" onChange={settear} value={nacimiento}></input></td>
              </tr>
            </tbody>
          </table>

          <div className="row">
              <button class="btn btn-primary" type="button" onClick={updateTask}>
                Actualizar
              </button>
            </div>
            <div className="row">
              <button class="btn btn-danger" type="button" onClick={nuevo}>
                Añadir
              </button>
            </div>

        

           

            

          

            

           
              
            </div>
          
          </div>
        </div>
      </div>



  );
}

export default App;