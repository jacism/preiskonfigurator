//Set up an associative array
 //The keys represent the size of the cake
 //The values represent the cost of the cake i.e A 10" cake cost's $35
 var cake_prices = new Array();
 cake_prices["Round6"]=39;
 cake_prices["Round8"]=89;


 //Set up an associative array
 //The keys represent the filling type
 //The value represents the cost of the filling i.e. Lemon filling is $5,Dobash filling is $9
 //We use this this array when the user selects a filling from the form

 var filling_prices= new Array();
 filling_prices["None"]=0;
 filling_prices["bis3"]=300;
 filling_prices["bis5"]=500;
 filling_prices["bis10"]=1000;
 filling_prices["bis15"]=1500;

var texte_prices= new Array();
 texte_prices["None"]=0;
 texte_prices["tbis250"]=4,90;
 texte_prices["tbis350"]=8,90;
 texte_prices["tbis650"]=9,90;
 texte_prices["tbis900"]=13,90;

var galerie_prices= new Array();
 galerie_prices["None"]=0;
 galerie_prices["fbis10"]=8,90;
 galerie_prices["fbis30"]=18,90;
 galerie_prices["fbismax"]=29,00;




// getCakeSizePrice() finds the price based on the size of the cake.
// Here, we need to take user's the selection from radio button selection
function getCakeSizePrice()
{
    var cakeSizePrice=0;
    //Get a reference to the form id="cakeform"
    var theForm = document.forms["cakeform"];
    //Get a reference to the cake the user Chooses name=selectedCake":
    var selectedCake = theForm.elements["selectedcake"];
    //Here since there are 4 radio buttons selectedCake.length = 4
    //We loop through each radio buttons
    for(var i = 0; i < selectedCake.length; i++)
    {
        //if the radio button is checked
        if(selectedCake[i].checked)
        {
            //we set cakeSizePrice to the value of the selected radio button
            //i.e. if the user choose the 8" cake we set it to 25
            //by using the cake_prices array
            //We get the selected Items value
            //For example cake_prices["Round8".value]"
            cakeSizePrice = cake_prices[selectedCake[i].value];
            //If we get a match then we break out of this loop
            //No reason to continue if we get a match
            break;
        }
    }
    //We return the cakeSizePrice
    return cakeSizePrice;
}

//This function finds the filling price based on the
//drop down selection
function getFillingPrice()
{
    var cakeFillingPrice=0;
    //Get a reference to the form id="cakeform"
    var theForm = document.forms["cakeform"];
    //Get a reference to the select id="filling"
     var selectedFilling = theForm.elements["filling"];

    //set cakeFilling Price equal to value user chose
    //For example filling_prices["Lemon".value] would be equal to 5
    cakeFillingPrice = filling_prices[selectedFilling.value];

    //finally we return cakeFillingPrice
    return cakeFillingPrice;
}


function protextePrice()
{
    var textingPrice=0;
    //Get a reference to the form id="cakeform"
    var theForm = document.forms["cakeform"];
    //Get a reference to the select id="filling"
     var selectedFilling = theForm.elements["textfilling"];

    //set cakeFilling Price equal to value user chose
    //For example filling_prices["Lemon".value] would be equal to 5
    textingPrice = texte_prices[selectedFilling.value];

    //finally we return textingPrice
    return textingPrice;
}


function galeriemainPrice()
{
    var galmainPrice=0;
    //Get a reference to the form id="cakeform"
    var theForm = document.forms["cakeform"];
    //Get a reference to the select id="filling"
     var selectedFilling = theForm.elements["galeriefilling"];

    //set cakeFilling Price equal to value user chose
    //For example filling_prices["Lemon".value] would be equal to 5
    galmainPrice = galerie_prices[selectedFilling.value];

    //finally we return galmainPrice
    return galmainPrice;
}


//candlesPrice() finds the candles price based on a check box selection
function candlesPrice()
{
    var candlePrice=0;
    //Get a reference to the form id="cakeform"
    var theForm = document.forms["cakeform"];
    //Get a reference to the checkbox id="includecandles"
    var includeCandles = theForm.elements["includecandles"];

    //If they checked the box set candlePrice to 5
    if(includeCandles.checked==true)
    {
        candlePrice=19;
    }
    //finally we return the candlePrice
    return candlePrice;
}


function textPrice()
{
    var textePrice=0;

    var theForm = document.forms["cakeform"];

    var includetexte = theForm.elements["includetexte"];


    if(includetexte.checked==true)
    {
        textePrice=50;
    }

    return textePrice;
}



function galeriePrice()
{
    var galPrice=0;

    var theForm = document.forms["cakeform"];

    var includegalerie = theForm.elements["includegalerie"];


    if(includegalerie.checked==true)
    {
        galPrice=11;
    }

    return galPrice;
}




function mapsPrice()
{
    var mPrice=0;
    var theForm = document.forms["cakeform"];
    var includemaps = theForm.elements["includemaps"];


    if(includemaps.checked==true)
    {
        mPrice=8;
    }

    return mPrice;
}


function contactPrice()
{
    var cPrice=4;
    var theForm = document.forms["cakeform"];
    var includecontact = theForm.elements["includecontact"];


    if(includecontact.checked==true)
    {
        cPrice=7;
    }

    return cPrice;
}

function pluginPrice()
{
    var pPrice=0;
    var theForm = document.forms["cakeform"];
    var includefbplugin = theForm.elements["includefbplugin"];


    if(includefbplugin.checked==true)
    {
        pPrice=11;
    }

    return pPrice;
}

function iconPrice()
{
    var iPrice=0;
    var theForm = document.forms["cakeform"];
    var includeicons = theForm.elements["includeicons"];


    if(includeicons.checked==true)
    {
        iPrice=79;
    }

    return iPrice;
}


function logoPrice()
{
    var lPrice=0;
    var theForm = document.forms["cakeform"];
    var includelogo = theForm.elements["includelogo"];


    if(includelogo.checked==true)
    {
        lPrice=279;
    }

    return lPrice;
}


function vkPrice()
{
    var visitenPrice=0;
    var theForm = document.forms["cakeform"];
    var includevk = theForm.elements["includevk"];


    if(includevk.checked==true)
    {
        visitenPrice=39;
    }

    return visitenPrice;
}





//function insciptionPrice()
//{
//    //This local variable will be used to decide whether or not to charge for the inscription
//    //If the user checked the box this value will be 20
//    //otherwise it will remain at 0
//    var inscriptionPrice=0;
//    //Get a refernce to the form id="cakeform"
//    var theForm = document.forms["cakeform"];
//    //Get a reference to the checkbox id="includeinscription"
//    var includeInscription = theForm.elements["includeinscription"];
//    //If they checked the box set inscriptionPrice to 20
//    if(includeInscription.checked==true){
//        inscriptionPrice=20;
//    }
//    //finally we return the inscriptionPrice
//    return inscriptionPrice;
//}
//
function calculateTotal()
{
    //Here we get the total price by calling our function
    //Each function returns a number so by calling them we add the values they return together
    var cakePrice = getCakeSizePrice() + getFillingPrice() + protextePrice() + galeriemainPrice() + candlesPrice()  + textPrice() + galeriePrice() + mapsPrice() + contactPrice() + pluginPrice() + iconPrice() + logoPrice() + vkPrice();

    //display the result
    var divobj = document.getElementById('totalPrice');
    divobj.style.display='block';
    divobj.innerHTML = ""+cakePrice;

}

function hideTotal()
{
    var divobj = document.getElementById('totalPrice');
    divobj.style.display='none';
}
