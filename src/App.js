import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  // state de la app
  const [ busqueda, guardarBusqueda ] = useState('');
  const [imagenes, guardarImagenes] = useState([]);

  //Necesitamos dos piezas de state, 1 que nos dirá en que pagina nos encontramos
  // y el otro que va a estar atento o diciendonos cuantas paginas hay en total

  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(5);

  useEffect(() => {
    const consultarApi = async () => {
      if(busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = '18229180-e86ad6801a006875bede02cde';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      // calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits/ imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);


      console.log(resultado);

    }
    consultarApi();
  }, [busqueda]);

  // Definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    if (nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  // Definir la pagina siguiente

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if (nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual);

  }

  return (
   <div className="container">
     <div className="jumbotron">
       <p className="lead text-center">Buscador de Imágenes</p>
       <Formulario
          guardarBusqueda= {guardarBusqueda}
       />
     </div>
     <div className="row justify-content-center">
       <ListadoImagenes 
          imagenes={imagenes}
       />

       <button 
          type="button"
          className="btn btn-info mr-1"
          onClick={paginaAnterior}
          >&laquo; Anterior </button>

        <button 
          type="button"
          className="btn btn-info"
          onClick ={paginaSiguiente}
          >Siguiente &raquo;</button>

     </div>
   </div>
  );
}

export default App;
