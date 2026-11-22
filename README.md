# ScamSim

ScamSim es un proyecto académico de HCI for UX Design para practicar cómo responder ante un posible fraude digital. Cada práctica presenta un mensaje ficticio, tres posibles decisiones y una explicación que relaciona la respuesta con las señales del caso.

**[Abrir ScamSim en GitHub Pages](https://gd123f.github.io/scamsim/)**

## Probar una simulación

1. Selecciona **Comenzar entrenamiento** y elige una práctica del catálogo.
2. Abre **Ver detalle** para consultar el objetivo, la dificultad y la duración estimada.
3. Inicia la simulación, lee el mensaje, elige cómo actuarías y confirma tu decisión.
4. Revisa las señales y el consejo preventivo. Pulsa **Continuar** para ver el resultado. Puedes repetir el caso o abrir **Ver mi progreso**.

| Categoría | Situación que se practica |
| --- | --- |
| Phishing | Verificar un correo que amenaza con bloquear una cuenta bancaria. |
| Finanzas | Responder a una solicitud de código para liberar una transferencia. |
| Compras | Evaluar una tienda que presiona para pagar mediante transferencia directa. |
| Trabajo | Verificar una solicitud de datos que aparenta proceder de un superior. |

## Cómo se guarda el progreso

Cada intento terminado guarda el título, la fecha y la puntuación en el almacenamiento local del navegador. La demo asigna 100 puntos a la decisión segura y 40 a una decisión de riesgo. **Progreso** muestra los intentos, su promedio y el mejor resultado. **Reiniciar demo** borra el historial de ese navegador. Todos los datos del ejercicio son ficticios.

## Código y ejecución

| Archivo | Función |
| --- | --- |
| `index.html` | Contenido, navegación y estructura de las pantallas. |
| `styles.css` | Distribución adaptable para escritorio, tableta y móvil. |
| `app.js` | Cuatro escenarios, filtros, validación, retroalimentación e historial. |

Para ejecutar el proyecto en tu equipo, descarga el repositorio, extrae los archivos en una misma carpeta y abre `index.html` en tu navegador. GitHub Pages publica los archivos de la raíz de la rama `main`.



 
