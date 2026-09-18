document.addEventListener("DOMContentLoaded", () => {
    // --- 1. NAVEGACIÓN Y PESTAÑAS ---
    const navLinks = document.querySelectorAll(".main-nav ul li a");
    const tabContents = document.querySelectorAll(".tab-content");
    const btnExplorar = document.getElementById("btn-explorar");

    function switchTab(targetId) {
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === targetId) {
                link.classList.add("active");
            }
        });

        tabContents.forEach(content => content.classList.remove("active"));

        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.classList.add("active");
            window.scrollTo({ top: targetSection.offsetTop - 120, behavior: 'smooth' });
        }
    }

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            switchTab(targetId);
        });
    });

    if (btnExplorar) {
        btnExplorar.addEventListener("click", () => {
            const targetId = btnExplorar.getAttribute("data-target");
            switchTab(targetId);
        });
    }

    // --- 2. GESTIÓN DE GALERÍAS Y VISTAS ---
    const vistaCursos = document.getElementById("vista-cursos");
    const vistaGaleriaCompleta = document.getElementById("vista-galeria-completa");
    const tituloGaleria = document.getElementById("galeria-curso-title");
    const gridObras = document.getElementById("obras-estudiantes-grid");
    const btnVolver = document.getElementById("btn-volver-cursos");

    // Elementos del Modal
    const modal = document.getElementById("obra-modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitulo = document.getElementById("modal-titulo");
    const modalAutor = document.getElementById("modal-autor");
    const btnCerrarModal = document.getElementById("modal-close");

    // Abrir galería según el curso
    document.querySelectorAll(".curso-card").forEach(card => {
        const boton = card.querySelector(".btn-ver-galeria");
        if (boton) {
            boton.addEventListener("click", () => {
                const nombreCurso = card.querySelector("h3").innerText.trim();
                
                cargarGaleriaCurso(nombreCurso);
                
                if (vistaCursos && vistaGaleriaCompleta) {
                    vistaCursos.style.display = "none";
                    vistaGaleriaCompleta.style.display = "block";
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
    });

    // Volver a la selección de cursos
    if (btnVolver) {
        btnVolver.addEventListener("click", () => {
            if (vistaCursos && vistaGaleriaCompleta) {
                vistaGaleriaCompleta.style.display = "none";
                vistaCursos.style.display = "block";
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Renderizado dinámico de obras
    function cargarGaleriaCurso(curso) {
        if (tituloGaleria) tituloGaleria.innerText = "Galería: " + curso;
        if (gridObras) gridObras.innerHTML = "";

        const obras = datosDeGalerias[curso] || [];

        obras.forEach(item => {
            const card = document.createElement("div");
            card.className = "obra-card";
            card.style.cursor = "pointer";
        
            const precioObra = item.precio || 25; // Bs 25 por defecto para cada cuadro

            card.innerHTML = `
                <div class="obra-img-wrapper">
                    <img src="${item.foto}" alt="${item.obra}" class="obra-img">
                </div>
                <h4>"${item.obra}"</h4>
                <p>✍️ ${item.estudiante}</p>
                <p><small>🏫 ${item.curso}</small></p>
                <p class="obra-precio">💰 Bs ${precioObra.toFixed(2)}</p>
                <button type="button"
                        class="btn-comprar-obra"
                        data-obra="${item.obra}"
                        data-estudiante="${item.estudiante}"
                        data-curso="${item.curso}"
                        data-precio="${precioObra}">
                    🛒 Comprar
                </button>
            `;

            card.addEventListener("click", () => {
                if (modalImg) modalImg.src = item.foto;
                if (modalTitulo) modalTitulo.innerText = `"${item.obra}"`;
                if (modalAutor) modalAutor.innerText = `✍️ ${item.estudiante} (${item.curso})`;
                if (modal) modal.style.display = "flex";
            });

            if (gridObras) gridObras.appendChild(card);
        });
    }

    // Eventos para cerrar el modal
    if (btnCerrarModal) {
        btnCerrarModal.addEventListener("click", () => {
            if (modal) modal.style.display = "none";
        });
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }
});

// --- BASE DE DATOS DE OBRAS POR CURSO ---
const datosDeGalerias = {
    "CARBONCILLO": [
        { estudiante: "Karin Yamile Torrico", obra: "Jesus", curso: "5to A de Secundaria", foto: "img/carbon1.jpeg" },
        { estudiante: "Jesus Daniel Loza", obra: "Mario Bros", curso: "2do B de Secundaria", foto: "img/carbon2.jpeg" },
        { estudiante: "Mario Alexander Terceros", obra: "Sonic", curso: "6to A de Secundaria", foto: "img/carbon3.jpeg" },
        { estudiante: "Milena Flores Flores", obra: "Niño", curso: "4to A de Secundaria", foto: "img/carbon4.jpeg" },
        { estudiante: "Milena Flores Flores", obra: "Retrato", curso: "4to B de Secundaria", foto: "img/carbon5.jpeg" },
        { estudiante: "Jheins Edison Silva", obra: "Niño", curso: "4to A de Secundaria", foto: "img/carbon6.jpeg" },
        { estudiante: "Amelia Fuentes Lopez", obra: "Retrato", curso: "4to A de Secundaria", foto: "img/carbon7.jpeg" },
        { estudiante: "Ana Rodriguez Salguero", obra: "Niño", curso: "4to A de Secundaria", foto: "img/carbon8.jpeg" },
        { estudiante: "Javier Zambrano", obra: "Pato Bandido", curso: "2do C de Secundaria", foto: "img/carbon9.jpeg" },
        { estudiante: "Alvaro Pocota Saucedo", obra: "Ciervo", curso: "2do C de Secundaria", foto: "img/carbon10.jpeg" },
        { estudiante: "Yacely Ortega Tacaraya", obra: "Mario Bros", curso: "2do C de Secundaria", foto: "img/carbon11.jpeg" },
        { estudiante: "Isaias l", obra: "Pato Bandido", curso: "2do C de Secundaria", foto: "img/carbon12.jpeg" },
        { estudiante: "Neymar Carrasco Flores", obra: "Pato Bandido", curso: "2do C de Secundaria", foto: "img/carbon13.jpeg" },
        { estudiante: "Gabriel toledo Espinosa", obra: "Ciervo", curso: "2do C de Secundaria", foto: "img/carbon14.jpeg" },
        { estudiante: "Yesenia Mendoza", obra: "Chica", curso: "5to B de Secundaria", foto: "img/carbon15.jpeg" },
        { estudiante: "Vania Rupay", obra: "Chica Profunda", curso: "5to B de Secundaria", foto: "img/carbon16.jpeg" },
        { estudiante: "Ana Rosa Baltazar", obra: "Chica", curso: "5to B de Secundaria", foto: "img/carbon17.jpeg" },
        { estudiante: "Liz Magabi Condori", obra: "Pajarito", curso: "2do A de Secundaria", foto: "img/carbon18.jpeg" },
        { estudiante: "Aracely Caime Crespo", obra: "Posion", curso: "2do A de Secundaria", foto: "img/carbon19.jpeg" } ,
        { estudiante: "Neymar Fuentes", obra: "Mario Bros", curso: "2do A de Secundaria", foto: "img/carbon20.jpeg" },
        { estudiante: "Neymar Fuentes", obra: "Pajarito", curso: "2do A de Secundaria", foto: "img/carbon21.jpeg" },
        { estudiante: "Melany Escalera", obra: "Tortuga", curso: "2do B de Secundaria", foto: "img/carbon22.jpeg" },
        { estudiante: "Rolan Siancas", obra: "Tortuga", curso: "2do B de Secundaria", foto: "img/carbon23.jpeg" },
        { estudiante: "Bridgit Hilary", obra: "Ardilla", curso: "2do B de Secundaria", foto: "img/carbon24.jpeg" },
        { estudiante: "Wilber Sanchez", obra: "Ardilla", curso: "2do B de Secundaria", foto: "img/carbon25.jpeg" },
        { estudiante: "Nayra Lara Castellon", obra: "Conejo", curso: "2do B de Secundaria", foto: "img/carbon26.jpeg" },
        { estudiante: "Erlinda Aslla Becerra", obra: "Conejo", curso: "5to A de Secundaria", foto: "img/carbon27.jpeg" },
        { estudiante: "Bridgit Hilary", obra: "Mario Bros", curso: "5to A de Secundaria", foto: "img/carbon28.jpeg" } ,
        { estudiante: "Karin Yamile Torrico", obra: "Chica China", curso: "5to A de Secundaria", foto: "img/carbon29.jpeg" },
        { estudiante: "Mel Ariana", obra: "Ciervo", curso: "3ro A de Secundaria", foto: "img/carbon30.jpeg" },
        { estudiante: "Gadiel Reluz Zarate", obra: "Jarrones", curso: "1ro A de Secundaria", foto: "img/carbon31.jpeg" },
        { estudiante: "Randy Sunabi Mamani", obra: "Goku", curso: "3ro A de Secundaria", foto: "img/carbon32.jpeg" },
        { estudiante: "Kayli Tapia", obra: "Niña", curso: "4to B de Secundaria", foto: "img/carbon33.jpeg" },
        { estudiante: "Neyda Rivera", obra: "Niña", curso: "4to B de Secundaria", foto: "img/carbon34.jpeg" },
        { estudiante: "Liliana Ortiz", obra: "Merlina", curso: "4to B de Secundaria", foto: "img/carbon35.jpeg" },
        { estudiante: "Belinda Sorioco", obra: "Merlina", curso: "4to B de Secundaria", foto: "img/carbon36.jpeg" } ,
        { estudiante: "Maximiliano", obra: "Chica ", curso: "4to B de Secundaria", foto: "img/carbon37.jpeg" },
        { estudiante: "Alexander", obra: "Agente", curso: "4to B de Secundaria", foto: "img/carbon38.jpeg" },
        { estudiante: "Sara Carbajal Cayo", obra: "Chica", curso: "4to B de Secundaria", foto: "img/carbon39.jpeg" },
    ],
    "ACUARELA": [
        { estudiante: "Rolan Siancas", obra: "Pato donald", curso: "2do B de Secundaria", foto: "img/lapicero1.jpeg" },
        { estudiante: "Anahi Brisney Umiri", obra: "Pato donald", curso: "2do B de Secundaria", foto: "img/lapicero2.jpeg" },
        { estudiante: "Melany Escalera Oropeza", obra: "Pato donald", curso: "2do B de Secundaria", foto: "img/lapicero3.jpeg" },
        { estudiante: "Erlinda Aslla Becerra", obra: "Pato donald", curso: "2do B de Secundaria", foto: "img/lapicero4.jpeg" },
        { estudiante: "Nayra Lara Castellon", obra: "Pato donald", curso: "2do B de Secundaria", foto: "img/lapicero5.jpeg" },
        { estudiante: "Noelia Candia", obra: "Perro", curso: "3ro A de Secundaria", foto: "img/lapicero6.jpeg" },
        { estudiante: "Noelia Candia", obra: "Gallo", curso: "3ro A de Secundaria", foto: "img/lapicero7.jpeg" },
        { estudiante: "Liseth Bascope", obra: "Gallo", curso: "3ro A de Secundaria", foto: "img/lapicero8.jpeg" },
        { estudiante: "Luz Jazmin Llenes", obra: "Gato", curso: "3ro B de Secundaria", foto: "img/lapicero9.jpeg" },
        { estudiante: "Luis Barrientos", obra: "Gallo", curso: "3ro B de Secundaria", foto: "img/lapicero10.jpeg" },
    ],
    "PINTURA": [
        { estudiante: "Milena Flores Flores", obra: "Chica Luchadora", curso: "4to A de Secundaria", foto: "img/pincel1.jpeg" },
        { estudiante: "Crlos Rodrigo Panozo", obra: "Armadillo Cromático", curso: "6to A de Secundaria", foto: "img/pincel2.jpeg" },
        { estudiante: "Yhisel Santos Gutierrez", obra: "Champion", curso: "5to B de Secundaria", foto: "img/pincel3.jpeg" },
        { estudiante: "Brisa Damaris Chura", obra: "Paisaje", curso: "4to A de Secundaria", foto: "img/pincel4.jpeg" },
        { estudiante: "Amelia Fuentes", obra: "Naturaleza Viva", curso: "4to A de Secundaria", foto: "img/pincel5.jpeg" },
        { estudiante: "Amelia Lopez", obra: "Mujer de Pollera", curso: "4to A de Secundaria", foto: "img/pincel6.jpeg" },
        { estudiante: "Jhens Edison Silva", obra: "Chica Luchadora", curso: "4to A de Secundaria", foto: "img/pincel7.jpeg" },
        { estudiante: "Liliana Ortiz", obra: "Jarron", curso: "4to B de Secundaria", foto: "img/pincel8.jpeg" },
        { estudiante: "Yesenia Mendoza Gutierrez", obra: "Profesora", curso: "5to B de Secundaria", foto: "img/pincel9.jpeg" },
        { estudiante: "Luz Katerin Yanaje", obra: "Champion", curso: "5to B de Secundaria", foto: "img/pincel10.jpeg" },
        { estudiante: "Meliza Pozo Martinez", obra: "Personalidades", curso: "5to B de Secundaria", foto: "img/pincel11.jpeg" },
        { estudiante: "Liliana Ortiz", obra: "Pokemon", curso: "4to B de Secundaria", foto: "img/pincel12.jpeg" },
        { estudiante: "Magabi", obra: "Deportistas", curso: "5to A de Secundaria", foto: "img/pincel13.jpeg" },
        { estudiante: "Magabi", obra: "Varon", curso: "5to A de Secundaria", foto: "img/pincel14.jpeg" },
        { estudiante: "Sara Carbajal", obra: "Chola", curso: "4to B de Secundaria", foto: "img/pincel15.jpeg" },
        { estudiante: "Sara Carbajal", obra: "Pokemon", curso: "4to B de Secundaria", foto: "img/pincel16.jpeg" },
        { estudiante: "Jenevith Tola", obra: "Jarrones", curso: "4to B de Secundaria", foto: "img/pincel17.jpeg" },
        { estudiante: "Kayli Tapia", obra: "Paisaje", curso: "4to B de Secundaria", foto: "img/pincel18.jpeg" },
        { estudiante: "Dayra Chileno", obra: "Pokemon", curso: "4to B de Secundaria", foto: "img/pincel19.jpeg" },
        { estudiante: "Sara Carbajal", obra: "Jarrones", curso: "4to B de Secundaria", foto: "img/pincel20.jpeg" },
        { estudiante: "Brayan Flores", obra: "Campo", curso: "4to B de Secundaria", foto: "img/pincel21.jpeg" },
        { estudiante: "Belinda Sorioco", obra: "Pokemon", curso: "4to B de Secundaria", foto: "img/pincel22.jpeg" },
        { estudiante: "Shaimon Yusseth Perez", obra: "Tribu", curso: "6to B de Secundaria", foto: "img/pincel23.jpeg" },
        { estudiante: "Shaimon Yusseth Perez", obra: "Poncho Rojo", curso: "6to B de Secundaria", foto: "img/pincel24.jpeg" },
    ],
    "COLORES": [
        { estudiante: "Sebastian Hurtado Zambrana", obra: "Pescado Nemo", curso: "1ro B de Secundaria", foto: "img/colores1.jpeg" },
        { estudiante: "Ricardo Avendaño Miranda", obra: "Cosinero", curso: "3ro A de Secundaria", foto: "img/colores2.jpeg" },
        { estudiante: "Luz Jazmin Llenes", obra: "Cocina", curso: "3ro B de Secundaria", foto: "img/colores3.jpeg" },
        { estudiante: "Sebastian Hurtado Zambrana", obra: "Caballo", curso: "1ro B de Secundaria", foto: "img/colores4.jpeg" },
        { estudiante: "Ruth Sanchez Rodriguez", obra: "Caballo", curso: "1ro B de Secundaria", foto: "img/colores5.jpeg" },
        { estudiante: "Yhon Erick Condori", obra: "Frutas", curso: "1ro B de Secundaria", foto: "img/colores6.jpeg" },
        { estudiante: "Nicol Cruz Loza", obra: "Tomate", curso: "1ro A de Secundaria", foto: "img/colores7.jpeg" },
        { estudiante: "Gadiel Reluz", obra: "Zapallo", curso: "1ro A de Secundaria", foto: "img/colores8.jpeg" },
        { estudiante: "Gadiel Reluz", obra: "Pajaro Loco", curso: "1ro A de Secundaria", foto: "img/colores9.jpeg" },
        { estudiante: "Nicol Cruz Loza", obra: "Pajaro Loco", curso: "1ro A de Secundaria", foto: "img/colores10.jpeg" },
        { estudiante: "Luis Barrientos", obra: "Spider man", curso: "1ro A de Secundaria", foto: "img/colores11.jpeg" },
        { estudiante: "Raquel Mayta Vallejos", obra: "Frutas", curso: "3ro A de Secundaria", foto: "img/colores12.jpeg" },
        { estudiante: "Sara Gamba", obra: "Dragon", curso: "4to B de Secundaria", foto: "img/colores13.jpeg" },
        { estudiante: "Anahi Peñaranda Mamani", obra: "Tomate", curso: "1ro B de Secundaria", foto: "img/colores14.jpeg" },
        { estudiante: "Luis Albeira Baltazar", obra: "Manzana", curso: "1ro B de Secundaria", foto: "img/colores15.jpeg" }
    ]
};
// ==========================================
// MODULO DE COMPRA (Botón "Comprar" por cada cuadro/obra)
// ==========================================
// Al presionar "Comprar" en cualquier cuadro, se abre directamente WhatsApp
// con un mensaje ya redactado (obra, curso, estudiante y precio) para que el
// comprador hable directamente contigo. Tú te encargas personalmente del
// cobro y la verificación del pago; esta página no hace ninguna otra cosa.
document.addEventListener("DOMContentLoaded", () => {
    const TELEFONO_WHATSAPP = "59168783997"; // +591 68783997 sin signos

    function generarLinkWhatsapp(obraInfo) {
        const mensaje = `Hola, estoy interesado/a en comprar el cuadro "${obraInfo.obra}" (${obraInfo.curso}) de ${obraInfo.estudiante}, con un precio de Bs ${obraInfo.precio}. Es de la Galería de Arte Virtual Don Bosco.`;
        return `https://wa.me/${TELEFONO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    }

    // Delegación de eventos porque las tarjetas de obras se generan
    // dinámicamente al entrar a la galería de cada curso.
    document.addEventListener("click", (e) => {
        const boton = e.target.closest(".btn-comprar-obra");
        if (!boton) return;

        e.stopPropagation(); // Evita que también se abra el modal de "ver obra ampliada"

        const obraInfo = {
            obra: boton.getAttribute("data-obra") || "Obra",
            estudiante: boton.getAttribute("data-estudiante") || "",
            curso: boton.getAttribute("data-curso") || "",
            precio: parseFloat(boton.getAttribute("data-precio")) || 25
        };

        window.open(generarLinkWhatsapp(obraInfo), "_blank", "noopener");
    });
});

// ==========================================
// FORMULARIO DE CONTACTO (envío por FormSubmit)
// ==========================================
// Esta página es estática y no tiene servidor propio para enviar correos,
// así que se usa FormSubmit (https://formsubmit.co), un servicio gratuito
// que recibe los datos del formulario y los reenvía por correo a
// saimonzarateperez@gmail.com. No requiere registro ni clave: solo la
// PRIMERA vez que alguien envíe el formulario, FormSubmit mandará un correo
// de confirmación a esa casilla, y hay que hacer clic en "activar" ese
// formulario una sola vez para que los siguientes mensajes lleguen directo.
document.addEventListener("DOMContentLoaded", () => {
    const formContacto = document.getElementById("form-contacto");
    const btnEnviarContacto = document.getElementById("btn-enviar-contacto");
    const contactoEstado = document.getElementById("contacto-estado");

    if (!formContacto) return;

    formContacto.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (contactoEstado) {
            contactoEstado.style.display = "block";
            contactoEstado.className = "contacto-estado";
            contactoEstado.innerText = "Enviando tu mensaje...";
        }
        if (btnEnviarContacto) {
            btnEnviarContacto.disabled = true;
            btnEnviarContacto.innerText = "Enviando...";
        }

        try {
            const datosFormulario = new FormData(formContacto);
            const respuesta = await fetch(formContacto.action, {
                method: "POST",
                headers: { "Accept": "application/json" },
                body: datosFormulario
            });

            if (respuesta.ok) {
                if (contactoEstado) {
                    contactoEstado.className = "contacto-estado exito";
                    contactoEstado.innerText = "✅ ¡Mensaje enviado! Te responderemos pronto.";
                }
                formContacto.reset();
            } else {
                throw new Error("Respuesta no válida del servidor");
            }
        } catch (error) {
            if (contactoEstado) {
                contactoEstado.className = "contacto-estado error";
                contactoEstado.innerText = "⚠️ No se pudo enviar el mensaje. Intenta de nuevo o escríbenos directamente al correo saimonzarateperez@gmail.com.";
            }
        } finally {
            if (btnEnviarContacto) {
                btnEnviarContacto.disabled = false;
                btnEnviarContacto.innerText = "Enviar Mensaje";
            }
        }
    });
});
