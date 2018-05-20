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
- En este caso, lo hago a través de la segunda opción, porque ya he ejecutado la primera opción, y he preferido volver a atrás en el tiempo:;

## Misión 2 avanzado - primera opción

- Primero me obliga a añadir un FILE_DISCARDED como parámetro, y refactorizar el TaskOverFileProcessor
- Agrupo los teses en file - remove elements - get discarded bytes. Allí me doy cuenta del caso REVERSE, no es un task que elimina elementos!!! (puedo hacer que getDiscardedBytes me devuelva nulo, pero sería "mentira")
- Hago los teses para confirmar que escribo en el fichero de descarte. Pero ¿cómo lo testeo si no sé cómo obtener los bytes? Voy a tener que acoplarlo al menos a una tarea... 
- Y luego hay otro problema: el orden de los bytes descartados no coincide con el orden de ejecución de las tareas... Debería enviar al TaskOverFileProcessor un número para el orden de los bytes descartados, lo que complejiza el mantenimiento futuro.

Reculo, y vuelvo para atrás :)

## Misión 2 avanzado - segunda opción

- ejecuto las 3 tareas: y son muy muy muy similares a las anteriores (remove-each y get-each por ejemplo!)
- también reflexiono que las remove y get (no el reverse) podrían abstraerse finalmente a una función que diga si descarto o me quedo ese byte... Pero no matchea con el concepto de reverse.
- me doy cuenta que necesito un TasksOverFileAccumulator, que añada el resultado de las tareas, en vez de procesarla una tras otra e ir filtrando.
- creo un test para eso, y en él pongo las responsabilidades del "get"; aunque en realidad sus responsabilidades son las de acumular resultados de tareas.
- Aquí me doy cuenta que realmente tengo que hacer un híbrido entre la primera opción y la segunda, porque no es que haga las tareas de get y luego las de reduce, sino que debo hacer una mientras la otra...
- Por eso vuelvo a cambiar las responsabilidades del get al Processor, y las del Accumulator es la de devolver solo lo que se va descartando (y es que el resultado del primer fichero original me da igual, porque no sirve para nada... )
- Necesito que se ejecuten las tareas de reduce, mientras voy haciendo las de acumulación, por lo que realmente este tiene dos parámetros: tasksReduce and tasksAccumulator.
- Finalmente tengo que concatenar los buffers finales en base a un orden diferente al de ejecución, por lo que añado un parámetro "order"


¡FIN!



