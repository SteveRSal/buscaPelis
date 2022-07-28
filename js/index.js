// Javascript search API
// Inicio con un texto por default
const inicio = document.getElementById('renderizado-datos').innerHTML = `¿Que pelicula quieres ver?`

// Function OnClick
function getApiSearch() {

    //Obtengo el value del search input
    const valuesInput = document.getElementById('search-input').value;

    // URL de la API
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=1e6296feeb7565b54f1f8ea079f7e70e&language=es&query=${valuesInput}`;

    // Method
    const miInit = { method: 'GET'};

    // Realizo el Fetch para obtener datos    
    fetch(apiUrl, miInit)
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        // Obtengo data un array de las peliculas mas cercanas que encontro; filtro el primer array [0]
        let filtradoSearch = data.results[0]
        //console.log(filtradoSearch);

        // Valido si me viene undefinend si la pelicula no se encontro
        if ( filtradoSearch === undefined ) {

            document.getElementById("renderizado-datos")
            .innerHTML = `La pelicula no se encontro`;

        // Si encontro la pelicula renderizo datos
        } else {
            // destructuring
            const { poster_path, title, overview, vote_average, vote_count, release_date } = filtradoSearch;

            document.getElementById("renderizado-datos")
            .innerHTML = `
            <style>
            body::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                filter: opacity(.1) grayscale(100%) contrast(130%);
                background-size: cover;
                background-repeat: no-repeat;
                background-position: 50% 50%;
                background: url(https://image.tmdb.org/t/p/w500${poster_path});
            }
            </style>
            <div class="resultado-api">
                <div class="imagen-portada"><img src="https://image.tmdb.org/t/p/w500${poster_path}" /></div>
                <div class="datos-api"><h2>${title}</h2>
                <div class="datos-api2"><h1>${overview}</h1>
                      <span>
                      <div id="estrellas"></div>
                      Estrellas: ${vote_average}<br />
                      Año: ${release_date}<br />
                      Votos: ${vote_count}<br />
                      </span>
                </div>
                </div>
            </div>
            `;

        }

    // function para crear estrellas
    function starRanking() {
        // redondear el numero que me llega
        const star = Math.round(`${filtradoSearch.vote_average}`)
        var text = "";
        
        // loop
        for (i = 0; i < star; i++) {
            text += `<i class="fas fa-star"></i>`;
         }
        document.getElementById("estrellas").innerHTML = text;
    }
    starRanking();

    // prueba de otro fetch
    console.log(`test ${filtradoSearch.id}`)
    })
    .catch(error => console.error(error));

};

const fila = document.querySelector('.contenedor-carousel');
const peliculas = document.querySelectorAll('.pelicula');

const flechaIzquierda = document.getElementById('flecha-izquierda');
const flechaDerecha = document.getElementById('flecha-derecha');

// ? ----- ----- Event Listener para la flecha derecha. ----- -----
flechaDerecha.addEventListener('click', () => {
	fila.scrollLeft += fila.offsetWidth;

	const indicadorActivo = document.querySelector('.indicadores .activo');
	if(indicadorActivo.nextSibling){
		indicadorActivo.nextSibling.classList.add('activo');
		indicadorActivo.classList.remove('activo');
	}
});

// ? ----- ----- Event Listener para la flecha izquierda. ----- -----
flechaIzquierda.addEventListener('click', () => {
	fila.scrollLeft -= fila.offsetWidth;

	const indicadorActivo = document.querySelector('.indicadores .activo');
	if(indicadorActivo.previousSibling){
		indicadorActivo.previousSibling.classList.add('activo');
		indicadorActivo.classList.remove('activo');
	}
});

// ? ----- ----- Paginacion ----- -----
const numeroPaginas = Math.ceil(peliculas.length / 5);
for(let i = 0; i < numeroPaginas; i++){
	const indicador = document.createElement('button');

	if(i === 0){
		indicador.classList.add('activo');
	}

	document.querySelector('.indicadores').appendChild(indicador);
	indicador.addEventListener('click', (e) => {
		fila.scrollLeft = i * fila.offsetWidth;

		document.querySelector('.indicadores .activo').classList.remove('activo');
		e.target.classList.add('activo');
	});
}

// ? ----- ----- Hover ----- -----
peliculas.forEach((pelicula) => {
	pelicula.addEventListener('mouseenter', (e) => {
		const elemento = e.currentTarget;
		setTimeout(() => {
			peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
			elemento.classList.add('hover');
		}, 300);
	});
});

fila.addEventListener('mouseleave', () => {
	peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
});