# Alexa-Béisbol
Skill multimodal para seguir resultados de béisbol

Skill para preguntar a Alexa resultados de Grandes Ligas. Si el juego está en ejecución, mostrará en pantalla mucho más información del juego en vivo.

Skill disponible en en-US, es-US, es-ES, es-MX y en-CA. Se utiliza la librería
i18n para servir las frases en cada idioma.

DEMO: https://youtu.be/Xc6KIuumHl8

es-ES: Alexa, Abre resultados de Grandes Ligas
es-MX: Alexa, Abre resultados de Grandes Ligas
es-US: Alexa, abre Resultados de Béisbol
en-US: Alexa, open baseball scores
en-CA: Alexa, open baseball scores

Los resultados se obtienen desde una API propia que no está mostrada en este repositorio, sin embargo sirve de ejemplo para cualquier Skill deportiva.

Ejemplos de respuesta de la API:

{"frase":"On Tuesday May 7 2019, Angels 5, Tigers 2. The next game will be on Wednesday May 8 2019, when Angels will visit to Tigers","live":0,"inning":9,"arriba":"N","away":"Angels","home":"Tigers","away_score":"5","home_score":"2","bases":0,"outs":"3","es_fecha":"martes 7 mayo de 2019","en_fecha":"Tuesday May 7 2019"}
