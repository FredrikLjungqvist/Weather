# VäderApp
*A React app showing weather in a user friendly UI.*
By: Fredrik Ljungqvist, Robin Holgersson, Ryan-Phillips Cornelio 
Git Repo: https://github.com/FredrikLjungqvist/Weather/
Before start, run npm i
To start, run npm start
## Beskrivning
En väderapp som hämtar datat från SMHI och visar väder på en av användaren vald plats. Appen anväder sig även av geolocation api för att hämta platsdata om användren så önskar. Appen anropar totalt 3 olika APIer för att hämta plats och väderdata.
## Apier
Vi andvänder oss av Here geolocation API för att få koordinater för den plats där användaren vill veta vädret. Vi hanterar fel med hjälp av try/catch.

För att hämta väderdata använder vi SMHIs API. Vi felhanterar även detta med både try/catch och Error Boundery.

Som nämnt ovan hämtas även platsdata vi Geolocation API.

## Context
Vi använder två olika context (location-context och weather-context) för att kunna skicka data till de komponenter som använder fetchad data.

## Routing
Url:en styr den data som hämtas. Det går alltså att skriva in en adress enligt följande syntax /stad/"namn på stad"/datum/"yyyy-mm-dd". Om en felkatig adress skrivs in hanteras detta med Error Boundery, eller Not Found om url:en är helt tokig.
## Arbetsflöde
Mycket av arbetet har skett via parprogammering. Detta har gjort att vi inte haft några konfilkter på github då vi gjort de flest commits gemensamt.

Vi började projektet med en enkel mockup för att få en riktning. Under arbetets gång har designen och strukturen av appen förändrats ju mer vi lärt oss om flödet i React.
## Apinycklar
Om anropet till Here inte fungerar är det bara att skapa en ny nyckel på here.com och lägga in värdet på denna som "string" på rad 24 i location-context.tsx.



