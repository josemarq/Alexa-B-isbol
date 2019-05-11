const Alexa = require('ask-sdk');
const i18n = require('i18next');

const data_inicio = require('./data/inicio.json');
const template_inicio = require('./template/inicio.json');

const data = require('./data/juego.json');
const template = require('./template/juegos.json');


//Define variables por lenguaje
const languageStrings = {
    es:{
      translation: {
        BIENVENIDO_MSG: 'Resultados de Béisbol',
        AYUDA_MSG: 'Puedo darte resultados de Grandes Ligas. Dime el nombre del equipo que deseas consultar',
        SALUDO: 'Puedo decirte los resultados en vivo o de los últimos juegos de un equipo de Grandes Ligas. Dime el nombre de un equipo?',
        REFLECTOR_MSG: 'You’ve just activated {{intent}}',
        API_ERROR: 'En este momento no puedo saber esos datos, pregúntame más tarde. ',
        ANOTHER: 'Dime otro equipo para consultar su resultado, o dime salir?.',
        ANOTHER_REPROMT: 'Si deseas consultar otro resultado dime el nombre del equipo, sino dime salir. Qué deseas?',
        W_WANT: 'Dime que deseas?.',
        SKILL_NAME: 'Resultados de Béisbol',
        STOP: 'Muy bien, hasta la próxima. ',
        ERROR: 'Lo siento, ha ocurrido un error',
        UNHANDLED: 'No conozco ese equipo!. Dime el nombre de equipo de Grandes Ligas.',
        UNHANDLED_REPROMT: 'Dime el nombre de un equipo de Grandes Ligas.',
        NO_GAME_INFO: 'Lo siento, no se ha podido recuperar la información de este juego, por favor intenta más tarde.',
        INICIO_HINT: 'Dime el nombre de un equipo...',
        DOBLE: 'Esta ciudad tiene dos equipos, por favor dime uno de ellos. ',
        AYUDA_TEXT: 'Puedo darte resultados de Grandes Ligas. Dime un equipo?',
        DOBLE_CH: 'Cachorros o Medias Blancas?',
        DOBLE_NY: 'Mets o Yankees?',
        DOBLE_LA: 'Angels o Dodgers?',
      }
    },
     en:{
      translation: {
        BIENVENIDO_MSG: 'Baseball Scores',
        AYUDA_MSG: 'This Skill can give you live and past baseball scores. Please say the name of a MLB team',
        SALUDO: 'Hi, I can give you live and past baseball scores. Please say the name of a MLB team',
        REFLECTOR_MSG: 'You’ve just activated {{intent}}',
        API_ERROR: 'AT this moment there are a API error, please try againg later. ',
        ANOTHER: 'Say another team, or say exit.',
        ANOTHER_REPROMT: 'If you want another score, please say the team, otherwise say exit. What do you want?',
        W_WANT: 'What do you want?.',
        SKILL_NAME: 'Baseball Scores',
        STOP: 'Ok, Goodbye!. ',
        ERROR: 'I\'m sorry, we found an error',
        UNHANDLED: 'Sorry, I don\t know that team, please say the name of a MLB team.',
        UNHANDLED_REPROMT: 'Say a MLB team.',
        NO_GAME_INFO: 'I\'m sorry I can get the info for that team, please try again.',
        INICIO_HINT: 'Say the name of a team...',
        DOBLE: 'This city has two teams, please especific one. ',
        DOBLE_CH: 'Cubs or White Sox?',
        DOBLE_NY: 'Mets or Yankees?',
        DOBLE_LA: 'Angels or Dodgers?',
        AYUDA_TEXT: 'I can give you MLB scores. Say a team?',
      }
    }
}


const LaunchRequestHandler = {
  canHandle(handlerInput){
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
  },
handle(handlerInput){
        console.log("Béisbol MLB Running");
        global.lang = handlerInput.requestEnvelope.request.locale;
        
    if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
          
        
        data_inicio.jrTemplate1.textoPrincipal = handlerInput.t('INICIO_HINT') //Round
        data_inicio.jrTemplate1.hintText = handlerInput.t('INICIO_HINT') //Otros
        data_inicio.jrTemplate1.titulo = handlerInput.t('SKILL_NAME')
            

      let show = data_inicio;

      return handlerInput.responseBuilder
      .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                document: template_inicio,
                datasources: show
            })
      .speak(handlerInput.t('SALUDO'))
      .reprompt(handlerInput.t('SALUDO'))
      .getResponse();
   
    } else {
      
        return handlerInput.responseBuilder
            .speak(handlerInput.t('SALUDO'))
            .reprompt(handlerInput.t('SALUDO'))
            .getResponse();
  }
  
  }
}


const DobleHandlerCH = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'dobleEquiposCH');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(handlerInput.t('DOBLE') + handlerInput.t('DOBLE_CH'))
      .reprompt(handlerInput.t('DOBLE') + handlerInput.t('DOBLE_CH'))
      .getResponse();
  },
};

const DobleHandlerNY = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'dobleEquiposNY');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(handlerInput.t('DOBLE') + handlerInput.t('DOBLE_NY'))
      .reprompt(handlerInput.t('DOBLE') + handlerInput.t('DOBLE_NY'))
      .getResponse();
  },
};

const DobleHandlerLA = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'dobleEquiposLA');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(handlerInput.t('DOBLE') + handlerInput.t('DOBLE_LA'))
      .reprompt(handlerInput.t('DOBLE') + handlerInput.t('DOBLE_LA'))
      .getResponse();
  },
};


function getSlotValue(handlerInput) {
  let slotValue;
  try {
    //slotValue = handlerInput.requestEnvelope.request.intent.slots.equipo.value;
  
    // Toma el Slot del definido y sus sinonimos
    slotValue = handlerInput.requestEnvelope.request.intent.slots.equipo.resolutions.resolutionsPerAuthority[0].values[0].value.name;

  } catch (error) {
    slotValue = "error";
  }
  return slotValue;
}


const ultimoResultadoIntent = {
  canHandle(handlerInput){
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'IntentRequest'
        && request.intent.name === 'ultimoResultadoIntent'
         || request.intent.name === 'AMAZON.YesIntent');
  },
  
  
  async handle(handlerInput) {
    let outputSpeech = 'This is the default message.';
    let equipo = getSlotValue(handlerInput);
    let cardText;
    let away_score, home_score, inning, date, date_en, home, away, live, arriba, bases, heb, outs;
    console.log("Consultando---->" + equipo);


    await getRemoteData('[URL TO MY REST API]?team=' + equipo+'&lang='+global.lang)
      .then((response) => {
        const data = JSON.parse(response);
        console.log (data);
        outputSpeech = `${data.frase}`+ "<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_neutral_response_01'/>";
        cardText = `${data.frase}`;
        
        away = `${data.away}`;
        home = `${data.home}`;
        away_score = `${data.away_score}`;
        home_score = `${data.home_score}`;
        arriba = `${data.arriba}`;
        inning = "Inning " + `${data.inning}`;
        date = `${data.es_fecha}`;
        date_en = `${data.en_fecha}`;
        live = `${data.live}`;
        arriba = `${data.arriba}`;
        bases = `${data.bases}`;
        outs = `${data.outs}`
        
         if (`${data.outs}` =='null') {
            outs="";
        } else {
            
            if (`${data.outs}` > 1) {
                outs = outs + " Outs"
            }
            
            if (`${data.outs}` < 2) {
                outs = outs + " Out"
            }
            
        }
        
        
        //Inicializa Bases
        if (bases == 'null') {
            bases = 0;
        }
        
        // Inning Arriba o Abajo
        if (`${data.inning}` !='null' && arriba =="Y") {
            inning=inning + "&#9650;";
        }
        
        if (`${data.inning}` !='null' && arriba =="N") {
            inning=inning + "&#9660;";
        }
        
        inning = inning +"<br>"+outs;
        
        if (`${data.inning}` =='null') {
            inning="";
        }
        
        
        //Juego en vivo o terminado
        if (live == 0 ) {
            inning = "Final";
        }
        
      
      })
      .catch((err) => {
        //set an optional error message here
        console.log("Error" + err);
        outputSpeech = handlerInput.t('API_ERROR');
      });
      
      if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
          
        if ((away!= 'null') || (home != 'null') || (away_score=! 'null') || (home_score != 'null')) {
         data.jrTemplate1.inning = inning;
         
         if (global.lang=="en-US" || global.lang=="en-CA") {
            data.jrTemplate1.textoPrincipal = date_en;
         } else {
             data.jrTemplate1.textoPrincipal = date;
         } 
         
         data.jrTemplate1.teamAway = away;
         data.jrTemplate1.teamHome = home;
         data.jrTemplate1.scoreAway = away_score;
         data.jrTemplate1.scoreHome = home_score;
         data.jrTemplate1.bases_img = heb;
         data.jrTemplate1.hintText = handlerInput.t('ANOTHER')
         data.jrTemplate1.titulo = handlerInput.t('SKILL_NAME')
            
            if (live == 1 ) {
                //Hombres en bases
                heb = "[URL TO MY IMAGE SERVER]/"+bases+".png"
                data.jrTemplate1.bases_img = heb;
            }
        
        }  else {
         data.jrTemplate1.textoPrincipal = handlerInput.t('NO_GAME_INFO')  
        }       
         

      let show = data;

      return handlerInput.responseBuilder
      .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                document: template,
                datasources: show
            })
      .speak(outputSpeech + handlerInput.t('ANOTHER'))
      .reprompt(handlerInput.t('ANOTHER_REPROMT'))
      .getResponse();
   
    } else {
      
    return handlerInput.responseBuilder
      .speak(outputSpeech + handlerInput.t('ANOTHER'))
      .withSimpleCard(handlerInput.t('SKILL_NAME'), cardText)
      .reprompt(handlerInput.t('ANOTHER_REPROMT'))
      .getResponse();
  }

  },
}

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
      if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
          
        
        data_inicio.jrTemplate1.hintText = handlerInput.t('INICIO_HINT')
        data_inicio.jrTemplate1.textoPrincipal = handlerInput.t('AYUDA_TEXT')
        data_inicio.jrTemplate1.titulo = handlerInput.t('SKILL_NAME')
            

      let show = data_inicio;

      return handlerInput.responseBuilder
      .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                document: template_inicio,
                datasources: show
            })
      .speak(handlerInput.t('SALUDO'))
      .reprompt(handlerInput.t('SALUDO'))
      .getResponse();
   
    } else {
      
        return handlerInput.responseBuilder
            .speak(handlerInput.t('AYUDA_MSG'))
            .reprompt(handlerInput.t('W_WANT'))
            .getResponse();
  }
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(handlerInput.t('STOP'))
      .withShouldEndSession(true)
      .getResponse();
  },
};

const catcherHandler = {
  canHandle(handlerInput){
    const request = handlerInput.requestEnvelope.request;
    return request.intent.name === 'catcherIntent'
  },
handle(handlerInput){
        console.log("CATCHER");

    return handlerInput.responseBuilder
      .speak(handlerInput.t('UNHANDLED'))
      .reprompt(handlerInput.t('UNHANDLED_REPROMT'))
      .getResponse();
  }
}

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak(handlerInput.t('ERROR'))
      .reprompt(handlerInput.t('ERROR'))
      .getResponse();
  },
};


const UnhandledHandler = {
  canHandle(handlerInput){
    return true;
  },
  handle(handlerInput){
    return handlerInput.responseBuilder
      .speak(handlerInput.t('ERROR'))
      //.speak(handlerInput.requestEnvelope.request.intent.name)
      .getResponse();
  }
}

// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
        console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the handlerInput.
const LocalisationRequestInterceptor = {
    process(handlerInput) {
        i18n.init({
            lng: handlerInput.requestEnvelope.request.locale,
            resources: languageStrings
        }).then((t) => {
            handlerInput.t = (...args) => t(...args);
        });
    }
};


const getRemoteData = function (url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('
    s') ? require('https') : require('http');
    const request = client.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed with status code: ' + response.statusCode));
      }
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
    });
    request.on('error', (err) => reject(err))
  })
};

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    DobleHandlerCH,
    DobleHandlerNY,
    DobleHandlerLA,
    ultimoResultadoIntent,
    HelpHandler,
    ExitHandler,
    catcherHandler,
    SessionEndedRequestHandler,
    UnhandledHandler
  )
  .addRequestInterceptors(
    LocalisationRequestInterceptor,
    LoggingRequestInterceptor)
   .addResponseInterceptors(
    LoggingResponseInterceptor)
  .addErrorHandlers(ErrorHandler)
  .lambda();
