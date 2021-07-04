import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-contacto');

//Verificar si hay un contacto
if(btnEliminar) {
    btnEliminar.addEventListener('click', e => {
            const urlContacto = e.target.dataset.contactoUrl;

            //console.log(urlContacto);
            
            Swal.fire({
            title: '¿Deseas borrar este contacto?',
            text: "Una vez borrado no lo podras recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar'
          }).then((result) => {
            if (result.isConfirmed) {
                //Enviar la peticion de eliminar
                const url = `${location.origin}/contactos/${urlContacto}`;

              axios.delete(url, { params: {urlContacto}})
                .then(function(respuesta){
                  console.log(respuesta)
              });
              Swal.fire(
                '¡Eliminado!',
                'El contacto se ha borrado con exito',
                'success'
              );
    
              //Redireccionar a inicio
              setTimeout(() => {
                  window.location.href = '/'
              }, 3000);
            }
          })
          .catch(() => {
            Swal.fire({
              type:'error',
              title: 'Hubo un error',
              text: 'No se pudo eliminar el contacto'
            })
          })
    })
}

export default btnEliminar;