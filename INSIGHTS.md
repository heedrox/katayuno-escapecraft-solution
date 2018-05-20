- ¿Cómo hemos comenzado el test? Yo de arriba a abajo, es decir, "leo un fichero..." Me daba miedo que al hacerlo al revés, lo implementara mal en base al tipo de elemento que me devuelve el fichero
- Al principio he empezado de integración, leyendo el fichero, pero luego he mockeado "fs".
- Luego he hecho espías para dejar el test de "leer fichero"
- luego he hecho el de eliminar X bytes, y he confirmado la respuesta
- En este momento, me quedo pensando que enfocarlo así es un error. ¿Debería confirmar a través de espías? Entonces me quedo muy a nivel de implementación. ¿Cómo lo hago?
El problema es cómo enfocar esto de forma iterativa e incremental...
Pienso entonces en el patrón de cadena de responsabilidades, y que quizás la solución va por añadir responsabilidades
a misión 1. Y testar de forma incremental las responsabilidades...