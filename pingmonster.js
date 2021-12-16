const myVersion = "0.4.0", myProductName = "pingmonster";

const fs = require ("fs");
const utils = require ("daveutils");
const opml = require ("opml"); 
const daveappserver = require ("daveappserver"); 

var ct = 0;
var whenstart = new Date ();

function pingThatMonster () {
	var now = new Date ();
	var theOutline = {
		opml: {
			head: {
				title: "Pingmonster outline",
				dateCreated: "Thu, 16 Dec 2021 17:43:32 GMT",
				dateModified: now.toUTCString (),
				urlPublic: "http://pingmonster.scripting.com/cluelessnewbie/pingmonster.opml",
				flPublic: "true",
				expansionState: "1",
				"urlUpdateSocket": "ws://pingmonster.scripting.com:1421/"
				},
			body: {
				subs: [
					{
						text: utils.getRandomSnarkySlogan (),
						created: now.toUTCString (),
						subs: [
							{
								text: "Server started " + utils.secondsSince (whenstart) + " seconds ago."
								},
							{
								text: "This outline has been updated " + ++ct + " times since the server started."
								}
							]
						}
					]
				}
			}
		}
	var opmltext = opml.stringify (theOutline);
	var relpath = "pingmonster.opml";
	var type = "text/xml";
	var flprivate = false;
	daveappserver.publishFile ("cluelessnewbie", relpath, type, flprivate, opmltext, function (err, data) {
		});
	}
function everySecond () {
	if ((new Date ().getSeconds () % 10) == 0) {
		pingThatMonster ();
		}
	}

var options = {
	everySecond
	}
daveappserver.start (options, function (appConfig) {
	});
