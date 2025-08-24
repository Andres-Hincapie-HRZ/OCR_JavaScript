const inputArchivo = document.getElementById('cargarImagen');
const zonaPegado = document.getElementById('zonaPegado');
const vistaPrevia = document.getElementById('vistaPrevia');
const resultado = document.getElementById('resultado');

let imagenActual = null;

// Subir imagen
inputArchivo.addEventListener('change', (e) => {
    const archivo = e.target.files[0];
    if(archivo){
        const lector = new FileReader();
        lector.onload = (ev) => {
            vistaPrevia.src = ev.target.result;
            vistaPrevia.style.display = 'block';
            imagenActual = ev.target.result;
        };
        lector.readAsDataURL(archivo);
    }
});

// Zona pegado
zonaPegado.addEventListener('paste', (e) => {
    const items = e.clipboardData.items;
    for(let item of items){
        if(item.type.indexOf('image') !== -1){
            const archivo = item.getAsFile();
            const lector = new FileReader();
            lector.onload = (ev) => {
                vistaPrevia.src = ev.target.result;
                vistaPrevia.style.display = 'block';
                imagenActual = ev.target.result;

                // Borrar contenido del div
                zonaPegado.textContent = "";
            };
            lector.readAsDataURL(archivo);
        }
    }
    e.preventDefault();
});

// Extraer texto
document.getElementById('extraerTexto').addEventListener('click', () => {
    if(!imagenActual){
        alert('No hay imagen seleccionada');
        return;
    }
    resultado.textContent = 'Extrayendo texto...';
    Tesseract.recognize(imagenActual, 'spa')
        .then(({data: {text}}) => {
            resultado.textContent = text.trim() || "No se detecto texto";
        })
        .catch((err) => {
            resultado.textContent = "Error al extraer texto" + err.message;
        });
});













