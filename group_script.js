
// link html to javascript::::::::::::::::::::::::: All links goes here
//  new changes with
let temperature= document.getElementById("temperature");
let location_current= document.getElementById("location1");
let date1 = document.getElementById("date1");
let feels_like_w =document.getElementById("feels_like_w");
let wind_condition = document.getElementById("wind_condition");
let current_condition= document.getElementById("cond");
let checklist =document.getElementById("checklist");
// let image_div=document.getElementById("image_div");
let image_box=document.getElementsByClassName("box")

/*
const head_main= document.getElementById("head_main");
const location1= document.getElementById("location1");
const date1 = document.getElementById("date1");
const time1 = document.getElementById("time1");
;
const feels_like_w =document.getElementById("feels_like_w");
const wind_condition = document.getElementById("wind_condition");
const prediction=document.getElementById("prediction") ;
const change_loca=document.getElementById("change_loca");
const image1 =document.getElementById("image1")
*/


// Global variable: All global variables goes here
let today_temperature;
let current_location;
let date_today;
let time_today;
let today_wind_rate;
let today_rainy_presentage;
let today_forcast;
// May be this two we can go as map or something......
let noOfDates_to_forecast_future;//
let future_forecast;
let feels_like_temperature;
//#####################################################################



///************PART 1 ************************** ******************/

//********** THIS PART IS TO FETCH DAT AND INCLUDE THEM... --> ..............  */

// Paul:: Please note that above I have already called few elements using ID:: Use them if you want:::
// Fetching data goes here: 
// we assign them  belows:



let api_url= "https://api.openweathermap.org/data/2.5/forecast?lat=65.010211&lon=25.483722&appid=28ccc81c35e0d2b02668d8948dbe91d2";

async function getISS() {
const renponse= await fetch (api_url);
const data= await renponse.json();


console.log(data.list[0], data.list[2],data.city);

  // this will give date and time of the current location::::
let date = new Date();
date1.textContent = date.getDate() +"/"  +(date.getMonth()+1) +"/"+ date.getFullYear()  ;
time1.textContent=  date.getHours() +":" + date.getMinutes()+":"+ date.getSeconds()

// set today temperature to celicus
today_temperature= data.list[0].main.temp -273.15;


current_location= data.city.name;
today_wind_rate= data.list[0].wind;
today_weather_condn = data.list[0].weather[0].description;
date_today=data.list[0].dt_txt; 


  
feels_like_temperature= Math.ceil(data.list[0].main.feels_like-273.15);

/// Passed values to current weather condition based on the location:::
temperature.textContent = Math.floor(today_temperature).toFixed() + " ºC" ; // done
feels_like_w.textContent = "feels like " + feels_like_temperature + " ºC";

// MIN MAX temperature is not coming correctly::  CHECK??????

// Need to correct this ---------------- ????? Which API???
//min_max.textContent = Math.ceil(data.list[0].main.temp_min-273.15) +" ºC  /" +Math.ceil(data.list[0].main.temp_max-273.15)+ " ºC";
wind_condition.textContent = today_wind_rate.speed; // done
location_current.textContent = data.city.name; // done
current_condition.textContent = data.list[0].weather[0].description;



if (today_temperature<263){
    weather_remarks="Pretty Cold";
} else if (today_temperature >= 263 && today_temperature <= 273.15){
    weather_remarks="moderate Cold";
} else {
    weather_remarks="It is Summer!";
} 

//document.getElementById("WR").textContent = weather_remarks;
// Prediction in 6 hours::
document.getElementById("date2").textContent = data.list[2].dt_txt; 
document.getElementById("temp1").textContent = Math.ceil(data.list[2].main.temp-273.15).toFixed();
document.getElementById("FL1").textContent = Math.ceil(data.list[2].main.feels_like-273.15);
document.getElementById("max1").textContent = Math.ceil(data.list[2].main.temp_max-273.15);
document.getElementById("WS1").textContent = data.list[2].wind.speed;
document.getElementById("cond1").textContent = data.list[2].weather[0].description;

}

getISS();



//// ********************** PART 2*************************************************//// 

/****************** This part is for adding pictures and processing data ....... **************** */



// lets make an object with different cloths:
const array_cloths =
  { too_cold: ["Thermal pant", "Pant" , "Long sleeve", "Inner overall", "Socks", "Winter jacket"  ,"Winter pant"  ,"Wollen socks","Winter boots" ,"Winter cap" , "Scarf" , "Mittens", "Winter gloves"] ,
    pretty_cold: ["Long sleeve", "Thermal pant","Inner overall", "Socks",   "Winter jacket" , "Winter pant" , "Wollen socks"  , "Winter boots" ,   "Winter cap" ,  "Scarf" ,  "Winter gloves" ],
    around_zero : ["Short sleeve", "Inner overall", "Socks",   "Winter jacket" , "Winter pant" , "Wollen socks"  , "Winter boots" , "Off seasonal cap" ,  "Off seasonal gloves" ] ,
    offseason_feel :  ["Short sleeve", "Socks",  "Inner overall", "Offseasonal jacket"  , "Cap"  , "Shoes" ], 
    summary_mood : [ "Short sleeve", "Short",  "Inner overall",   , "Cap"  , "Sandles" ],
    too_hot : [ "Short sleeve", "Short",  "Inner overall",   , "Cap"  , "Sandles"],
    rain_cloths : [ "Water proof pants" , "Rain boots" , " Rain gloves"],
    sun_shine : ["Sun glasses"]
   }  ;

   // 
  


function check_temperature(){  

  switch(true){

// below -25 :: I add this to put some warning message
    case feels_like_temperature<-25:
    return array_cloths.too_cold;
    console.log("we need another warning message or something for this.")
    break;
//below -15
    case feels_like_temperature <-15:
    return array_cloths.too_cold;
    break;

// between -5 and -15
    case feels_like_temperature<-5:
    return array_cloths.pretty_cold;
   // return array_cloths.test;
    break;

// +5 to -5 :::
    case feels_like_temperature<5:
    return array_cloths.around_zero;
    break;

//5 to +15//
    case feels_like_temperature<15:
    return array_cloths.offseason_feel;
    break;

 //5 to +15//
    case feels_like_temperature<30:
    return array_cloths.summary_mood;
    break;

// above +15
    case feels_like_temperature<60:
    return array_cloths.too_hot;
    break;

    default:
    console.log("Something is hapening:::");
    break;

    }
}
  

//************** WE NEED TO ADD RAINY AND WINDY CONDITION CLOTH SELECTION HERE.... */


     var span_1;
     var image;

/* Here we create elements for check list and cloth images:::*/

function create_checklist(){

// take cloths from defined array
    cloths_need = check_temperature();
    console.log(cloths_need)
    cloths_need.forEach(function(element,item) {
    
    // create check boxes and set names using array names
    var chk_box = document.createElement("INPUT");
    chk_box.setAttribute("type", "checkbox");
    chk_box.innerText ="test";

    //style="display: inline-block"
    var chk_para = document.createElement("p");
    chk_para.innerText =element + '\u00a0' + '\u00a0';
    chk_para.style.display= "inline-block";

    // Create pictures under same name::
    image = document.createElement("img");
    image.src=element+".jpg"; // assign the name for the image:::
    // Adding images to header DIV
    span_1=document.createElement("span");
    span_1.style= `--i:${item};`;

    span_1.appendChild(image);
    image_box[0].appendChild(span_1);

    // Add elements to myDIV
    document.getElementById("myDIV").appendChild(chk_box);
    document.getElementById("myDIV").appendChild(chk_para); 

    });

}


/*
function changeCSS() {
var selects = image_box;
for(var i =0, il = selects.length;i<il;i++){
selects[i].style.transform=  `rotateY(calc(var(--i)*36deg)) translateZ(400px);`
}
}
*/ //image_box[0].style.transform = `rotateY(calc(var(--i)*60deg)) translateZ(400px);` ;

// image_box[0].transform= `rotateY(calc(var(--i)*36deg)) translateZ(400px);` ;
//image_box[0].setAttribute('transform', `rotateY(calc(var(--i)*36deg)) translateZ(400px);` )



//image_div.style.transform=`rotateY(calc(var(--i)*36deg)) translateZ(400px);`
// span_1.style.transform=`rotateY(calc(var(--i)*36deg)) translateZ(400px);`
// image.style.transform=`rotateY(calc(var(--i)*36deg)) translateZ(400px);`


//transform: rotateY(calc(var(--i)*36deg)) translateZ(400px)

//create_checklist()

// Animations goes here::::::::::::::::::::::::::::::::::::::::::::


