import React, { Fragment, useState } from "react";
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //crear state de citas

    const [cita, actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''

    });

    //

    const [error, actualizarError] = useState(false)

    //funcion q se ejecuta cuando el usuario escribe en el input

    const actualizarState = e =>{ 
        actualizarCita({
            ...cita,
            [e.target.name]:e.target.value 
        });
    }

    // extraer los valores

    const {mascota, propietario, fecha, hora, sintomas } = cita;

    //cuando envia form

    const submitCita = e =>{
        e.preventDefault();

        console.log(mascota)
        //validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }

        //Eliminar mensaje previo de error

        actualizarError(false);

        //asignar idç
        cita.id= uuid();
        

        //crear cita 
        
        crearCita(cita);

        //reiniciar form

        actualizarCita({
            mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
        })
    }

    return ( 
        <Fragment>
        <h2>Create appointment</h2>   

        { error ? <p className="alerta-error"> All fields are mandatory</p> : null
        } 
        <form 
            onSubmit={submitCita}
        >
            <label>Pet name</label>
            <input 
                type="text"
                name="mascota"
                className="u-full-width"
                placeholder="Pet's name"
                onChange={actualizarState}
                value={ mascota }
            />
             <label>Owner's name</label>
             <input 
                type="text"
                name="propietario"
                className="u-full-width"
                placeholder="Owner's name"
                onChange={actualizarState}
                value={ propietario }
            />
              <label>Date</label>
              <input 
                type="date"
                name="fecha"
                className="u-full-width"
                onChange={actualizarState}
                value={ fecha }
                
            />
              <label>Time</label>
              <input 
                type="time"
                name="hora"
                className="u-full-width"
                onChange={actualizarState}
                value={ hora }
               
            />
              <label>Symptoms</label>
              <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={ sintomas }
              >
        
            </textarea>
            <button
                type="submit"
                className="u-full-width button-primary enviar"
            >
                add appointment
            </button>
        </form>
        </Fragment>
     );
}

//documento componente
 
Formulario.propTypes ={
    crearCita: PropTypes.func.isRequired
}
export default Formulario;