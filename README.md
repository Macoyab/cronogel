# CRONOGEL - GUÍA DE USUARIO
📅 Cronograma Anual Colaborativo

Sistema visual interactivo para la planificación, seguimiento y gestión de eventos, hitos y mini-hitos anuales. Diseñado para funcionar en ordenadores de escritorio, tablets y dispositivos móviles.

🛠️ 1. Modos de Funcionamiento (Nube / Local)

En la esquina superior derecha del encabezado se muestra el estado actual del almacenamiento:

Modo Nube (Firebase ☁️): Cuando el botón indica "Firebase Conectado" (en verde), todos los cambios realizados se sincronizan en tiempo real con el resto del equipo.

Modo Local (Offline 💾): Si estás en un equipo sin conexión o con restricciones de red corporativa, el sistema cambia a "Modo Local" (en amarillo). Los datos se guardan en el navegador de ese equipo.

Alternar modo: Puedes forzar el cambio entre el modo en la nube y el modo local haciendo clic sobre la etiqueta de estado.

🔄 2. Sincronización Manual y Copias de Seguridad

Para transferir información entre equipos de la red corporativa y dispositivos externos (iPad, móvil) sin depender de internet:

Exportar JSON (Descargar copia): Haz clic en Exportar (icono de descarga) en el encabezado. Se descargará un archivo .json con todos los eventos e hitos guardados hasta la fecha.

Importar JSON (Cargar copia): Haz clic en Importar (icono de subida) y selecciona el archivo .json. La línea temporal del equipo actual se actualizará al instante.

👁️ 3. Vistas de la Aplicación

Puedes alternar entre las 4 vistas principales usando las pestañas de navegación:

1. 📅 Calendario Anual (12 Meses)

Muestra la distribución del año mes a mes.

Cada día muestra franjas de color superiores según los eventos activos.

Muestra la abreviatura de 3 letras (INI, FIN o abreviatura personalizada).

Los días festivos nacionales y fines de semana aparecen destacados en color.

Clic en cualquier día: Abre el desglose completo del día y accesos directos para añadir registros en esa fecha.

2. 📈 Línea de Tiempo (Timeline Vertical)

Eje temporal continuo de los 365 días del año con desplazamiento horizontal.

Bloques verticales de 180px: Eventos e hitos representados con barras rectangulares de color y texto vertical.

Bifurcación automática: Si coinciden varios eventos o hitos en fechas cercanas, la línea se bifurca en ramas paralelas para evitar solapamientos.

Leyenda emergente (Tooltip): Al pasar el ratón (hover) o pulsar sobre un bloque en pantallas táctiles (touch), se despliega una tarjeta con la información completa.

Filtro por Trimestres (Q1 - Q4): En la parte inferior se puede seleccionar un trimestre para consultar su resumen ampliado.

3. 🗄️ Repositorio General

Listado completo de todos los eventos e hitos creados.

Incluye un buscador en tiempo real para filtrar por nombre o abreviatura.

Opciones rápidas para Editar o Eliminar registros.

4. 🚩 Hitos y Notas

Panel exclusivo para revisar hitos principales (🚩) y mini-hitos asociados a eventos (📌).

➕ 4. Creación y Edición de Registros

🔹 Crear un Evento (＋ Evento)

Título: Nombre completo de la tarea o proyecto.

Abreviatura (3 caracteres): Código corto (ej: ALF, CTR) que se mostrará en las barras del calendario y la línea de tiempo.

Fechas: Rango de inicio y fin.

Color: Selección del color distintivo visual.

Categoría y Descripción: Información adicional de servicio.

Mini Hitos (Sub-hitos): Permite añadir fechas clave intermedias dentro del evento con su propia casilla de verificación.

🔹 Crear un Hito Puntual (🚩 Hito)

Para fechas clave de un solo día (entregas, inspecciones, reuniones).

Requiere Título, Abreviatura de 3 letras, Fecha y Comentario/Nota.

📱 5. Dispositivos Táctiles y Móviles

La interfaz es adaptativa. Desplázate horizontalmente por la línea de tiempo arrastrando con el dedo.

Pulsa una sola vez sobre cualquier bloque vertical para abrir o cerrar la leyenda emergente.
