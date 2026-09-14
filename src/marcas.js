const formulario = document.getElementById("formMarca");
      const listaMarcas = document.getElementById("listaMarcas");
      let marcas = [];

      // Recuperar las marcas guardadas.
      try {
        const guardadas = JSON.parse(
          localStorage.getItem("marcasCursoGithub") || "[]",
        );

        if (Array.isArray(guardadas)) {
          marcas = guardadas;
        }
      } catch {
        alert("No se pudieron recuperar las marcas guardadas.");
      }

      // Mostrar las marcas en la tabla.
      function mostrarMarcas() {
        listaMarcas.replaceChildren();

        marcas.forEach(function (marca, indice) {
          const fila = listaMarcas.insertRow();

          fila.insertCell().textContent = indice + 1;
          fila.insertCell().textContent = marca.nombre;
          fila.insertCell().textContent = marca.descripcion;
          fila.insertCell().textContent = marca.estado;
        });
      }

      formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const campoNombre = document.getElementById("nombre");
        const nombre = campoNombre.value.trim();
        const descripcion = document.getElementById("descripcion").value.trim();
        const estado = document.getElementById("estado").value;

        if (nombre === "") {
          alert("Ingresa el nombre de la marca.");
          campoNombre.focus();
          return;
        }

        marcas.push({ nombre, descripcion, estado });

        // Guardar la lista en el navegador.
        try {
          localStorage.setItem("marcasCursoGithub", JSON.stringify(marcas));
        } catch {
          marcas.pop();
          alert("No se pudo guardar la marca en este navegador.");
          return;
        }

        mostrarMarcas();
        formulario.reset();
        campoNombre.focus();
      });

      mostrarMarcas();

      const marcaExiste = marcas.some(function (marca) {
        return marca.nombre.toLowerCase() === nombre.toLowerCase();
      });

      if (marcaExiste) {
        alert("Esta marca ya está registrada.");
        campoNombre.focus();
        return;
      }