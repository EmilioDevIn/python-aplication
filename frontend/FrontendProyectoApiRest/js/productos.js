const { createApp } = Vue;

createApp({
    data() {
        return {
            productos: [],
            tipoproductos: [],
            url: 'http://127.0.0.1:5000/productos',
            urltipoproducto: 'http://127.0.0.1:5000/tipoproductos',
            error: false,
            cargando: true,
            /*alta*/
            id: 0,
            nombre: "",
            imagen: "",
            stock: 0,
            precio: 0,
            tipoproducto: 0
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    // esto es para botón modificar
                    if (Array.isArray(data)) {
                        this.id = data.length > 0 ? data[0].id : 0;
                        this.nombre = data.length > 0 ? data[0].nombre : '';
                        this.imagen = data.length > 0 ? data[0].imagen : '';
                        this.stock = data.length > 0 ? data[0].stock : 0;
                        this.precio = data.length > 0 ? data[0].precio : 0;
                        this.tipoproducto = data.length > 0 ? data[0].tipoproducto : 0;
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                });

            fetch(this.urltipoproducto)
                .then(response => response.json())
                .then(data => {
                    this.tipoproductos = data;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                });
        },
        eliminar(id) {
            const url = this.url + '/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    location.reload();
                })
                .catch(err => {
                    console.error(err);
                });
        },
        grabar() {
            let producto = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock,
                imagen: this.imagen,
                tipoproducto: this.tipoproducto
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(response => {
                    if (response.ok) {
                        alert("Registro grabado");
                        window.location.href = "./productos.html";
                    } else {
                        response.json().then(data => {
                            alert("Error al grabar: " + data.message);
                        });
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al grabar: " + err.message);
                });
        },
        modificar() {
            let producto = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock - 1, // Asumo que quieres reducir el stock en 1
                imagen: this.imagen,
                tipoproducto: this.tipoproducto
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url + "/" + location.search.substr(4), options)
                .then(() => {
                    alert("Registro modificado");
                    window.location.href = "./productos.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar: " + err.message);
                });
        },
        async comprar(id) {
            const url = this.url + '/' + id;           
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.id = data.id;
                    this.nombre = data.nombre;
                    this.imagen = data.imagen;
                    this.stock = data.stock;
                    this.precio = data.precio;
                    this.tipoproducto = data.tipoproducto;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                });

            let producto = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock - 1,
                imagen: this.imagen,
                tipoproducto: this.tipoproducto
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url + "/" + id, options)
                .then(() => {
                    //alert("Registro modificado")
                    window.location.href = "./index.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar: " + err.message);
                });
        }
    },
    created() {
        let url;
        if (location.search.substr(4) === "") // si no viene de la modificación
            url = this.url;
        else
            url = this.url + "/" + location.search.substr(4);  // para la modificación

        this.fetchData(url);
    },
}).mount('#app');
