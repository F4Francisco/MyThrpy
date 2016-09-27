var https = require('https');

exports.handler = function (event, context) {
    var say = "";
    var shouldEndSession = false;
    var sessionAttributes = {};


    if (event.session.attributes) {
        sessionAttributes = event.session.attributes;
    }

    if (event.request.type === "LaunchRequest") {
        say = "Hello, thank you for choosing to open Therapy, I know that your time is valuable, and I am here to support you today. How are you feeling today? Are you happy, sad, angry, fearful, or surprised ";
        context.succeed({ sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

    } else {
        var IntentName = event.request.intent.name;

        if (IntentName === "FeelingsIntent") {

            if (event.request.intent.slots.Feelings.value) {

                var feeling = event.request.intent.slots.Feelings.value;

                if (feeling == "happy") {
                    say = "Thanks great everything is going really well, heres a funny joke. "
                    +"Teacher: Last night I had a dream that I ate a huge marshmallow. Student: And what happened next? Teacher: I woke up in the morning and found my pillow gone!!! HAHAHAHA";
                }
                if (feeling == "sad") {
                    say = " Your mind is a powerful thing. When you fill it with positive thoughts, Your life will start to change. Was this helpful? ";


                }
                if (feeling == "angry") {
                    say = " Try to remain calm, Take a deep breath.<break time=\"2.0s\" /> Breath in. <break time=\"2.0s\" />Breath out. Rinse and Repeat. Do you feel more relaxed?";

                }
                if (feeling == "fearful") {
                    say = " Be passionate about your life. Learn to live without the fear of failing. Take a chance, you just might surprise yourself. ";

                }
                if (feeling == "surprised") {
                    say = "Did you know that surprise is a brief state as a result of an unexpected event?  Surprise could be both positive and negative.  The fight or flight response is common to these situations.";
                }
                context.succeed({ sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

            }
            else if (IntentName === "YesNoIntent") {

            if (event.request.intent.slots.YesNo.value) {

                var YesNo = event.request.intent.slots.YesNo.value;

                if (feeling == "yes") {
                    say = "Awesome, go out and do something.";
                }
                if (feeling == "no") {
                    say = "How about a song?";
                        "version": "1.0",
                "sessionAttributes": {},
                "response": {
                "outputSpeech": {},
                "card": {},
                "reprompt": {},
                "directives": [
                  {
                    "type": "AudioPlayer.Play",
                    "playBehavior": "string",
                    "audioItem": {
                      "stream": {
                        "token": "string",
                        "url": "http://www.noiseaddicts.com/free-samples-mp3/?id=275",
                        "offsetInMilliseconds": 0
                      }
                    }
                  }
                ],
                "shouldEndSession": true
                }

                }
                context.succeed({ sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

            }
        } else if (IntentName === "StopIntent" || IntentName === "CancelIntent") {
            say = "You asked for " + sessionAttributes.requestList.toString() + ". Thanks for playing!";
            shouldEndSession = true;
            context.succeed({ sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });


        } else if (IntentName === "ThankIntent") {
            say = "Okay you are welcome. You can come to me anytime."
            context.succeed({ sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

        }
    }
};

function buildSpeechletResponse(say, shouldEndSession) {
    return {
        outputSpeech: {
            type: "SSML",
            ssml: "<speak>" + say + "</speak>"
        },
        reprompt: {
            outputSpeech: {
                type: "SSML",
                ssml: "<speak>Please try again. " + say + "</speak>"
            }
        },
        card: {
            type: "Simple",
            title: "My Card Title",
            content: "My Card Content, displayed on the Alexa App or alexa.amazon.com"
        },
        shouldEndSession: shouldEndSession
    };
}
