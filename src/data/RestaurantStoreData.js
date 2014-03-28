Ext.namespace('BVApp','BVApp.data','BVApp.models');
var k = 0;
var Restauranter;

function GetData()
{
        if (window.XMLHttpRequest)
          {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
          }
        else
          {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
          }
        //xmlhttp.open("GET","https://maps.google.com/maps/ms?dg=feature&ie=UTF8&authuser=0&msa=0&output=kml&msid=215152610189487779904.00000112b9270a06dffd2",false);
        //xmlhttp.open("GET","https://maps.google.com/maps/ms?dg=feature&mid=1395050604&ie=UTF8&authuser=0&msa=0&output=kml&msid=215152610189487779904.00000112b9270a06dffd2",false);

        xmlhttp.open("GET","https://maps.google.com/maps/ms?hl=da&ie=UTF8&oe=UTF8&authuser=0&msa=0&output=kml&msid=207816819117242585728.0004f4cc8b4994b5be63c",false);
        xmlhttp.send();
        xmlDoc=xmlhttp.responseXML;

    Restauranter = new Array();
    x = xmlDoc.getElementsByTagName("Placemark");
    while(k < x.length)
    {

        node = x[k].getElementsByTagName("description")[0] ? x[k].getElementsByTagName("description")[0].childNodes[0].nodeValue : false
        if(node != false) //Hvis noden ikke er tom
        {
                var description = (x[k].getElementsByTagName("description")[0].childNodes[0].nodeValue);

           var hjemmeside = String(description.split("Hjemmeside:")[1]);
           hjemmeside = cleanUp(String(hjemmeside.split("E-mail:")[0]));

           var email = String(description.split("E-mail:")[1]);
           email = cleanUp(String(email.split("Åbningstider")[0]));

           var mandag = String(description.split("Mandag:")[1]);
           mandag = cleanUp(String(mandag.split("Tirsdag:")[0]));
           mandag = timeCheck(mandag);

           var tirsdag = String(description.split("Tirsdag:")[1]);
           tirsdag = cleanUp(String(tirsdag.split("Onsdag:")[0]));
           tirsdag = timeCheck(tirsdag);

           var onsdag = String(description.split("Onsdag:")[1]);
           onsdag = cleanUp(String(onsdag.split("Torsdag:")[0]));
           onsdag = timeCheck(onsdag);

           var torsdag = String(description.split("Torsdag:")[1]);
           torsdag = cleanUp(String(torsdag.split("Fredag:")[0]));
           torsdag = timeCheck(torsdag);

           var fredag = String(description.split("Fredag:")[1]);
           fredag = cleanUp(String(fredag.split("Lørdag:")[0]));
           fredag = timeCheck(fredag);

           var lørdag = String(description.split("Lørdag:")[1]);
           lørdag = cleanUp(String(lørdag.split("Søndag:")[0]));
           lørdag = timeCheck(lørdag);

           var søndag = String(description.split("Søndag:")[1]);
           søndag = cleanUp(String(søndag.split("Adresse")[0]));
           søndag = timeCheck(søndag);

           var vej = String(description.split("Vej:")[1]);
           vej = cleanUp(String(vej.split("Postnr:")[0]));

           var postNr = String(description.split("Postnr:")[1]);
           postNr = cleanUp(String(postNr.split("Tlf:")[0]));

           var telefon = String(description.split("Tlf:")[1]);
           telefon = cleanUp(String(telefon.split("Tilgængeligt for kørestole:")[0]));

           var kørestol = String(description.split("Tilgængeligt for kørestole:")[1]);
           kørestol = cleanUp(String(kørestol.split("Handicap toilet:")[0]));
           kørestol = filter(kørestol);

           var handicapToilet = String(description.split("Handicap toilet:")[1]);
           handicapToilet = cleanUp(String(handicapToilet.split("Catering:")[0]));
           handicapToilet = filter(handicapToilet);

           var catering = String(description.split("Catering:")[1]);
           catering = cleanUp(String(catering.split("Levering:")[0]));
           catering = filter(catering);

          var levering = String(description.split("Levering:")[1]);
          levering = cleanUp(String(levering.split("Økologisk:")[0]));
          levering = filter(levering);

          var økologisk = String(description.split("Økologisk:")[1]);
          økologisk = cleanUp(String(økologisk.split("Vegetarisk/Vegansk:")[0]));
          økologisk = filter(økologisk);

          var vegansk = String(description.split("Vegetarisk/Vegansk:")[1]);
          vegansk = cleanUp(String(vegansk.split("Spisestedstype:")[0]));
          vegansk = veganSelecter(vegansk);

          var spisestedsType = String(description.split("Spisestedstype:")[1]);
          spisestedsType = cleanUp(String(spisestedsType.split("Hunde tilladt:")[0]));
          spisestedsType = SpisestedsKategori(spisestedsType);

          /*
          var sæderIndenfor = String(description.split("Sæder indenfor:")[1]);
          sæderIndenfor = cleanUp(String(sæderIndenfor.split("Sæder udenfor:")[0]));

          var sæderUdenfor = String(description.split("Sæder udenfor:")[1]);
          sæderUdenfor = cleanUp(String(sæderUdenfor.split("Hunde tilladt:")[0]));
           */

           sæderIndenfor = "";
           sæderUdenfor = "";

          var hundeTilladt = String(description.split("Hunde tilladt:")[1]);
          hundeTilladt = cleanUp(String(hundeTilladt.split("Barnestol:")[0]));
          hundeTilladt = filter(hundeTilladt);

          var barneStol = String(description.split("Barnestol:")[1]);
          barneStol = cleanUp(String(barneStol.split("<br>")[0]));
          barneStol = filter(barneStol);
        }

        var name = (x[k].getElementsByTagName("name")[0].childNodes[0].nodeValue);
        var coordinates = (x[k].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue);
        var res = coordinates.split(",",2);
        var long = res[0];
        var lang = res[1];
        var nameID = name.replace(/\s/g, '');
        Restauranter[k] = [name,nameID,vej,postNr,"",lang,long,"",telefon,mandag,tirsdag,onsdag,torsdag,fredag,lørdag,søndag,"Special datoer",hjemmeside,email,vegansk,kørestol,handicapToilet,hundeTilladt,barneStol,catering,levering,økologisk,sæderIndenfor,sæderUdenfor,"",spisestedsType  ,"",""];
        k++;
    }
}


function cleanUp(element)
{
    //element = element.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    element = element.replace(/&nbsp;/g, ' ').replace(/<b>/gi, "").replace("</b>", "").replace(/<br>/gi, "").replace("</br>", "").replace(/ +/g, ' ');
    element = element.trim();
    return element;
}

function filter(element)
{
element = element.toLowerCase();
  switch (element)
  {
  case "ja":
     return element = "1";
     break;
  case "nej":
     return element = "0";
     break;
  default: return element = "";
  }
}

function timeCheck(element)
{
switch (element)
  {
  case "Lukket":
     return element = "";
     break;
  case "lukket":
     return element = "";
     break;
  default: return element;
  }
}

function veganSelecter(element)
{
element = element.toLowerCase();
switch (element)
  {
  case "nej/nej":
     return element = "1";
     break;
  case "nej/ja":
     return element = "2";
     break;
  case "ja/nej":
     return element = "3";
     break;
  case "ja/ja":
     return element = "4";
     break;
  case "100% vegansk":
     return element = "5";
     break;
  default: return element = "1";
  }
}

function SpisestedsKategori(element)
{
var spiseSteder = "";
element = element.toLowerCase();
element = element.replace(" ", "");
element = element.split(",");
for(var i=0;i<element.length;i++)
    {
        if(element[i].charAt(0) == "r")
        {
          var res = String("Restaurant" + ", ");
          spiseSteder = spiseSteder + res;
        }
        else if(element[i].charAt(0) == "c")
        {
          var res = String("Cafe" + ", ");
          spiseSteder = spiseSteder + res;
        }
        else if(element[i].charAt(0) == "i")
        {
            var res = "Eiscafe" + ", ";
            spiseSteder = spiseSteder + res;

        }
        else if(element[i].charAt(0) == "s")
        {
             var res = "Imbiss" + ", ";
             spiseSteder = spiseSteder + res;
        }
        else
        {
         var res = "Restaurant" + ", "; //Default er 'Restaurant'
         spiseSteder = spiseSteder + res;
        }
    }
return spiseSteder;
}


GetData();
BVApp.data.RestaurantStoreData = Restauranter.slice(0);

