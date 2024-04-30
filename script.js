//Este código  realiza una solicitud a la API de OpenWeatherMap para obtener datos climáticos de una ciudad ingresada por el usuario,
//luego actualiza la interfaz de usuario con esos datos.


// Selecciona el elemento HTML con la clase 'container' y lo almacena en la variable 'container'.
const container = document.querySelector('.container');

// Selecciona el botón dentro del elemento HTML con la clase 'search-box' y lo almacena en la variable 'search'.
const search = document.querySelector('.search-box button');

// Selecciona el elemento HTML con la clase 'weather-box' y lo almacena en la variable 'weatherBox'.
const weatherBox = document.querySelector('.weather-box');

// Selecciona el elemento HTML con la clase 'weather-details' y lo almacena en la variable 'weatherDetails'.
const weatherDetails = document.querySelector('.weather-details');

// Agrega un evento 'click' al botón de búsqueda.
search.addEventListener('click', () => {

  // Almacena la clave de la API de OpenWeatherMap en la variable 'APIKey'.
  const APIKey = 'bcdc211fe35c1f8a15c04502b3ceafd4';

  // Obtiene el valor del campo de entrada dentro del elemento con la clase 'search-box' y lo almacena en la variable 'city'.
  const city = document.querySelector('.search-box input').value;

  // Verifica si el campo de entrada está vacío y retorna si es así.
  if (city == '') return;

  // Crea la URL de la API de OpenWeatherMap con la clave API y la ciudad proporcionada.
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

  // Realiza una solicitud fetch a la API de OpenWeatherMap utilizando la URL creada anteriormente.
  fetch(apiUrl)
    .then(response => {
      // Verifica si la respuesta no es válida y arroja un error si no lo es.
      if (!response.ok) {
        throw new Error('Error al obtener los datos del clima');
      }
      // Convierte la respuesta en formato JSON y la retorna.
      return response.json();
    })
    .then(json => {
      // Verifica si los datos del clima no están completos y arroja un error si no lo están.
      if (!json.weather || !json.main || !json.wind) {
        throw new Error('Datos del clima incompletos');
      }

      // Selecciona los elementos HTML relevantes dentro de 'weather-box' y 'weather-details'.
      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      // Objeto que mapea los nombres de los tipos de clima a las rutas de las imágenes correspondientes.
      const weatherImages = {
        'Clear': 'images/clear.png',
        'Rain': 'images/rainn.png',
        'Snow': 'images/snow.png',
        'Clouds': 'images/clouds.png',
        'Mist': 'images/mistt.png',
        'default': 'images/suncloud.png'
      };

      // Asigna la ruta de la imagen correspondiente al clima actual.
      image.src = weatherImages[json.weather[0].main] || weatherImages['default'];

      // Actualiza los valores de temperatura, descripción, humedad y velocidad del viento con los datos obtenidos de la API.
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    })
    .catch(error => {
      // Maneja los errores imprimiendo un mensaje en la consola y mostrando una alerta al usuario.
      console.error('Error:', error);
      alert('Error al obtener los datos del clima');
    });
});
