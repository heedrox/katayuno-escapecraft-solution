# MISION 1

- ¿Cómo hemos comenzado el test? Yo de arriba a abajo, es decir, "leo un fichero..." Me daba miedo que al hacerlo al revés, lo implementara mal en base al tipo de elemento que me devuelve el fichero
- Al principio he empezado de integración, leyendo el fichero, pero luego he mockeado "fs".
- Luego he hecho espías para dejar el test de "leer fichero"
- luego he hecho el de eliminar X bytes, y he confirmado la respuesta
- En este momento, me quedo pensando que enfocarlo así es un error. ¿Debería confirmar a través de espías? Entonces me quedo muy a nivel de implementación. ¿Cómo lo hago?
El problema es cómo enfocar esto de forma iterativa e incremental...
Pienso entonces en el patrón de cadena de responsabilidades, y que quizás la solución va por añadir responsabilidades
a misión 1. Y testar de forma incremental las responsabilidades...
- He eliminado los primeros bytes, los últimos bytes... Pero me da miedo seguir, porque sé que tendré que refactorizar al final. Ya que el resultado debe ser escribir a fichero. Así que primero voy a asegurarme que hago y testeo bien que se escribe a fichero y luego sigo...

- Tras varias iteraciones ya tengo: eliminar X bytes primeros, eliminar Y bytes finales, eliminar cada X elementos, y reverse.

- Finalmente creo el "app-mision1.js" que hace todo. Este no está testado (ni hecho vía tdd)... ¿aportaría valor? Es curioso pero he tenido varios intentos y errores a la hora de hacerlo. 

# MISION 2 FACIL (2f)

- En teoría tan fácil como cambiar app-mision1.js, pero cambiando parámetros si lo hemos hecho "bien".

# MISION 2 AVANZADO (2a)

- Aquí refactorizo primero Mision1. Reflexiono: ¿Cuál es su responsabilidad? Ejecutar tasks sobre un fichero y guardarlo, así que lo refactorizo a TasksOverFileProcessor
- Y pienso en que tengo dos opciones: 
 + cambiar la interfaz de cada Task para tener un "getDiscardedBytes()"
 + o puedo crear nuevas tareas que hagan lo contrario y me obtengan los bytes, reusando todo. 
 La primera me fuerza a que los tasks sean conscientes de estado. La segunda es menos eficiente.
- En este caso, lo hago a través de la primera opción, porque creo que es algo más complejo y quiero ver si saco insights...

- Primero me obliga a añadir un FILE_DISCARDED como parámetro, y refactorizar el TaskOverFileProcessor
- 