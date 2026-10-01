// Capturar evento de agregar datos
    
    document.getElementById('form-agregar').addEventListener('submit', async (e) =&gt; {
         e.preventDefault();
         const nombre = document.getElementById('nombre').value;
         const email = document.getElementById('email').value;

         await fetch('/api/agregar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email })

        });

        document.getElementById('form-agregar').reset();
        cargarDatos();
    });

// Capturar evento de extraer / consultar datos

    document.getElementById('btn-cargar').addEventListener('click', cargarDatos);

    async function cargarDatos() {
        const res = await fetch('/api/datos');
        const datos = await res.json();

        const lista = document.getElementById('lista-datos');
        lista.innerHTML = '';

        datos.forEach(item =&gt; {
            const li = document.createElement('li');
            li.textContent = \`${item.id}: ${item.nombre} - ${item.email}\`;
            lista.appendChild(li);
        });
}