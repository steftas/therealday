# Vue.js task


Ideja je da se naprave 2 jednostavne strane koristeci postojeci api. dizajn je naravno potpuno nebitan, nema potrebe da trosis vreme na to, moze da se koristi bootstrap/bulma… 

Strane su:

## Login 

Treba da sadrzi 2 input polja, gde se unose email i password, koji se salju na `POST /auth/login`

* endpoint: `https://dvapi.tempest.app/api/v1/auth/login`
* email: `admin@chord.agency`
* password: `password`

u odgovoru se dobija JWT, koji se salje zajedno sa svakim sledecim requestom u `Authorization` headeru kao `Bearer <token>` (basic auth)

## Jobs 

Stranica treba da sadrzi tabelu sa listom poslova koji stizu sa API-ja.

Polja koja treba prikazati su:

* user name
* job name
* client name
* start time
* end time

Endpoint sa koga treba dovuci podatke: `https://dvapi.tempest.app/api/v1/jobs`

Parametri koje treba poslati uz GET zahtev su:

* order_by - start_time
* include - client.jobRequest,jobRequest.jobType,user

### Paginacija

Prethodni endpoint podrzava paginaciju.

Paging parametri se salju u sklopu GET zahteva:

* page - br. strane
* per_page - br. itema po strani paginacije, opciono - default 20

O dogovoru se dobiaju  podaci vezani za paginaciju, u `meta` polju reponse body-ja.

Paginacija treba da bude prikazana ispod tabele i da sadrzi:

* broj aktivne strane
* link ka sledecoj strani (ako postoji)
* link ka predhodnoj strani (ako postoji)

## Stack

Sve treba da bude implementirano kao singe page applikacija, koristeci sledece tehnologije:

1. npm - package management, pokretanje projekta
2. VUE js - framework za razvoj aplikacije
3. Vuex - za state management aplikacije

Koriscenje plugina/biblioteka je dozvoljeno, po sopstvenom nahodjenju :) 




