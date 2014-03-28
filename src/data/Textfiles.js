Ext.namespace('BVApp','BVApp.data','BVApp.models');

var k = 0;
BVApp.models.Data= [];

function minFunction()
{
        if (window.XMLHttpRequest)
          {
            xmlhttp = new XMLHttpRequest();
          }
        else
          {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
          }
            //xmlhttp.open("GET","https://maps.google.com/maps/ms?dg=feature&ie=UTF8&authuser=0&msa=0&output=kml&msid=215152610189487779904.00000112b9270a06dffd2",false);
            xmlhttp.open("GET","https://maps.google.com/maps/ms?hl=da&ie=UTF8&oe=UTF8&authuser=0&msa=0&output=kml&msid=207816819117242585728.0004f4cc8b4994b5be63c",false);
            xmlhttp.send();
            xmlDoc = xmlhttp.responseXML;

    x=xmlDoc.getElementsByTagName("Placemark");
    while(k < x.length)
    {
        node = x[k].getElementsByTagName("description")[0] ? x[k].getElementsByTagName("description")[0].childNodes[0].nodeValue : false
        if(node != false)
        {
                    var name = (x[k].getElementsByTagName("name")[0].childNodes[0].nodeValue);
                    var description = (x[k].getElementsByTagName("description")[0].childNodes[0].nodeValue);
                    description = String(description.split("Åbningstider")[0]);
                    var nameID = name.replace(/\s/g, '');
                    BVApp.models.Data["reviews/dk/" + nameID + ".html"] = description;
                    k++;
        }
        else
        {
                               var name = (x[k].getElementsByTagName("name")[0].childNodes[0].nodeValue);
                               var nameID = name.replace(/\s/g, '');
                               BVApp.models.Data["reviews/dk/" + nameID + ".html"] = "";
                               k++;
        }
        BVApp.models.Data["about_dk.html"] ="Udviklet af:";
        BVApp.models.Data["about_de.html"] ="<div class=\"about\"><h1>Konzept &amp; Programmierung</h1>    <ul><li>        Sandy Meier    </li></ul>    <h1>Design</h1>    <ul>        <li>Simona Vinati</li>    </ul>    <h1>Datenrecherche</h1>    <ul>        <li>Andrea Hayn</li>        <li>Meike Koschalka</li>        <li>Christiane Ortlepp</li>        <li>Franziska Probst</li>        <li>Christiane Thiede</li>        <li>und weitere</li>    </ul>    <h1>Texte</h1>    <ul>        <li>Jöran Fliege</li>        <li>Stephanie Johanna Goldbach</li>        <li>Simon Grünwald</li>        <li>Björn Moschinski</li>        <li>Sven Nyga</li>        <li>Falko Richter</li>        <li>Andreas Schneider</li>        <li>und weitere</li>    </ul>    <h1>Übersetzungen</h1><ul>        <li>Caroline Bordier</li>        <li>Lone Krause</li>        <li>Doreen Rothe</li>        <li>Simona Vinati</li>    </ul>    <h1>Lizenzen</h1><ul>        <li>Programm: GPL v2</li>        <li>Design/Texte: CC BY-NC-SA 2.0</li>        <li>Vegan Passport: © Vegan Society (mit freundlicher Genehmigung)</li>        <li> “Shopping Cart” symbol from The Noun Project (http://thenounproject.com) collection.</li>    </ul><br/>    <center>Copyright © 2011-2012 Berlin Vegan</center></div>";
        BVApp.models.Data["about_en.html"] ="<div class=\"about\"><h1>Idea &amp; programming by</h1>    <ul><li>        Sandy Meier    </li></ul>    <h1>Design by</h1>    <ul>        <li>Simona Vinati</li>    </ul>    <h1>Research by</h1>    <ul>       <li>Andrea Hayn</li>        <li>Meike Koschalka</li>        <li>Christiane Ortlepp</li>        <li>Franziska Probst</li>        <li>Christiane Thiede</li>        <li>and others</li>    </ul>    <h1>Texts by</h1>    <ul>        <li>Jöran Fliege</li>        <li>Stephanie Johanna Goldbach</li>        <li>Simon Grünwald</li>        <li>Björn Moschinski</li>        <li>Sven Nyga</li>        <li>Falko Richter</li>        <li>Andreas Schneider</li>        <li>and others</li>    </ul>    <h1>Translated by</h1><ul>        <li>Caroline Bordier</li>        <li>Lone Krause</li>        <li>Doreen Rothe</li>        <li>Simona Vinati</li>    </ul>    <h1>Licences</h1><ul>        <li>Programm: GPL v2</li>        <li>Design/Texte: CC BY-NC-SA 2.0</li>        <li>Vegan Passport: © Vegan Society (by kind permission)</li>        <li> “Shopping Cart” symbol from The Noun Project (http://thenounproject.com) collection.</li>    </ul><br/>    <center>Copyright © 2011-2012 Berlin Vegan</center></div>";
        BVApp.models.Data["passport.html"] ="<div class=\"description\">Hej! <br/><br/>Jeg er veganer!<br/> Dvs. jeg spiser ikke noget, der kommer fra dyr - til gavn for mennesker, dyr og vores miljø. <br/><br/> <b>Så jeg spiser ikke:</b><br/>Kød (hverken hakket, tørret, i sovser osv), fjerkræ, fisk, skaldyr eller ting der kommer fra dyr eller bliver produceret af dyr såsom honning, æg, mælk, smør, ost osv.<br/><br/><b>Jeg spiser dog:</b><br/>Kartofler, ris, pasta(uden æg), bønner, grøntsager, tomater, frugt, nødder, svampe, brød(uden animalske produkter), korn osv.<br/><br/>Mange tak for din forståelse! </div>";

    }
}

minFunction();

