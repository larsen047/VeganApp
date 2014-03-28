//Bruges ikke - Alt data hentes ind i 'RestaurantStoreData'



Ext.namespace('BVApp','BVApp.data','BVApp.models');
var Cafeer;
var k = 0;

function minFunction()
{
        if (window.XMLHttpRequest)
          {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
          }
        else
          {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
          }
        //xmlhttp.open("GET","http://www.freemaptools.com/download/19022014-g4yjiprh.kml",false);
        xmlhttp.open("GET","https://maps.google.com/maps/ms?dg=feature&ie=UTF8&authuser=0&msa=0&output=kml&msid=215152610189487779904.00000112b9270a06dffd2",false);
        xmlhttp.send();
        xmlDoc=xmlhttp.responseXML;

    Cafeer = new Array();
    root = xmlDoc.getElementsByTagName("Placemark");
    while(k < root.length)
    {
        x=xmlDoc.getElementsByTagName("Placemark");
        var name=(x[k].getElementsByTagName("name")[0].childNodes[0].nodeValue);
        //var description=(x[k].getElementsByTagName("description")[0].childNodes[0].nodeValue);
        var coordinates=(x[k].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue);
        var res = coordinates.split(",",2);
        var long = res[0];
        var lang = res[1];
        var nameID = name.replace(/\s/g, '');;
        //Cafeer[k] = [name, nameID,"Cafe","Addresse","5000",lang,long,"Telefon","19 - 21","9 - ","9 - ","9 - ","9 - ","9 - ","9 - ","","www.ankerklause.de","","","","","0"];
       //Cafeer[k] = [name,nameID,"Addresse","10999","Kreuzberg",lang,long,"U1 Görlitzer Bahnhof","(030) 616 27 409","11 - 24","11 - 24","11 - 24","11 - 24","11 - 24","11 - 24","11 - 24","","","","2","1","0","1","1","0","","","","","","","",""];
        k++;
    }
}

minFunction();

BVApp.data.CafeStoreData = Cafeer.slice(0);

/*
BVApp.data.CafeStoreData=[
["Ankerklause","cafe","Cafe","Kottbusser Damm 104","10967","52.49555","13.42101","030/6935649","16 - ","9 - ","9 - ","9 - ","9 - ","9 - ","9 - ","","www.ankerklause.de","","",""],
["back.art","cafe","Cafe, Backwaren","Dieffenbachstr. 12","10967","52.49288","13.41476","030/69532820","6 - 19","6 - 19","6 - 19","6 - 19","","","","","","","","sonntags auch vegane kuchen"],
["Balzac Coffee","cafe","Cafe","Karl-Liebknecht Straße 5  ","10178","52.51982","13.4034","","7:30 - 20:30","7:30 - 20:30","7:30 - 20:30","7:30 - 20:30","7:30 - 20:30","8 - 22","8 - 21:30","","www.balzaccoffee.com","","",""],
["Balzac Coffee","cafe","Cafe","Friedrichstraße 125  ","10117","52.52599","13.38687","","7:30 - 19","7:30 - 19","7:30 - 19","7:30 - 19","7:30 - 19","8:30 - 19","8:30 - 18:30","","www.balzaccoffee.com","","",""],
["Balzac Coffee","cafe","Cafe","Invalidenstraße 35  ","10115","52.53078","13.38307","","6:30 - 19","6:30 - 19","6:30 - 19","6:30 - 19","6:30 - 19","8 - 19","8 - 18:30","","www.balzaccoffee.com","","",""],
["Balzac Coffee","cafe","Cafe","Potsdamer Platz 10  ","10785","52.50832","13.37715","","6 - 23","6 - 23","6 - 23","6 - 23","6 - 23","7 - 24","7:30 - 22","","www.balzaccoffee.com","","",""],
["Balzac Coffee","cafe","Cafe","Schönhauser Allee 116  ","10439","52.54983","13.41323","","6:30 - 21:30","6:30 - 21:30","6:30 - 21:30","6:30 - 21:30","6:30 - 21:30","7:30 - 21:30","8 - 21:30","","www.balzaccoffee.com","","",""],
["Balzac Coffee","cafe","Cafe","Knesebeckstraße 1-2  ","10623","52.51065","13.32265","","6:30 - 20:30","6:30 - 20:30","6:30 - 20:30","6:30 - 20:30","6:30 - 20:30","7:30 - 20:30","8:30- 20","","www.balzaccoffee.com","","",""],
["Balzac Coffee","cafe","Cafe","Albrechtstr. 131","12165","52.45716","13.32213","","7 - 20","7 - 20","7 - 20","7 - 20","7 - 20","8:30 - 20","9 - 19:30","","www.balzaccoffee.com","","",""],
["Barcomi's Deli","cafe","Cafe","Sophienstr. 21","10178","52.52556","13.40113","030/28598363","9 - 21","9 - 21","9 - 21","9 - 21","9 - 21","9 - 21","10 - 21","","www.barcomis.de/","","",""],
["Ben-Uschi & der Pabst","cafe","Cafe","Marienburger str. 39","10405","52.53483","13.42492","030/41725465","10 - 19",""," 9 - 19"," 9 - 19"," 9 - 19","10 - 19","10 - 19","","www.ben-uschi.de","","",""],
["BIO DELI","cafe","Cafe ","Invalidenstraße 153","10115","52.5323","13.39575","030/280 98 100 ","7:30 - 20:30","7:30 - 20:30","7:30 - 20:30","7:30 - 20:30","7:30 - 20:30","8 - 20","","","www.bio-deli.de","","",""],
["Broschek","cafe","Cafe","Weichselstraße 6","12043","52.4841","13.4328","0170/9057492","8 - ","8 - ","8 - ","8 - ","8 - ","","","","www.broschek-berlin.de/","","",""],
["Brotgarten Vollkornbäckerei GmbH","cafe","Cafe","Seelingstraße","14059","52.51536","13.29117","030/3228838","","","","","","","","","www.brotgarten.info/lc…","","",""],
["Café Anna Blume","cafe","Cafe","Kollwitzstraße 83","10435","52.538","13.41945","030/44048641","8 - ","8 - ","8 - ","8 - ","8 - ","8 - ","8 - ","","www.cafe-anna-blume.de","","",""],
["Cafe Box 21","cafe","Cafe","Boxhagener Str 21","10245","52.51319","13.45622","","","","","","","","","","","","",""],
["Café Dritter Raum","cafe","Cafe","Hertzbergstr. 14","12055","52.47716","13.44806","030/54737666","","10 - 20","10 - 20","10 - 20","10 - 20","10 - 20","10 - 22","","www.cafe-dritter-raum.de","","",""],
["Café Nähr Reich","cafe","Cafe","Schönhauser Allee 65","10437","52.54627","13.41401","030/40521308","8 - 20","8 - 20","8 - 20","8 - 20","8 - 20","8 - 20","","","www.naehrreich.de/","","",""],
["Café November","cafe","Cafe","Husemannstr. 12","10435","52.5378","13.41796","030/4428425","10 - ","10 - ","10 - ","10 - ","10 - ","9 - ","9 - ","","http://www.cafe-november.de/","","0",""],
["Café ohne Namen ('Kaffeetasse')","cafe","Cafe","Rhinower Straße 1","10437","52.54781","13.41017","","","","","","","","","","","","",""]
];
*/