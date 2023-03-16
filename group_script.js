
// link html to javascript::::::::::::::::::::::::: All links goes here

let temperature= document.getElementById("temperature");
let date1 = document.getElementById("date1");
let feels_like_w =document.getElementById("feels_like_w");
let wind_condition = document.getElementById("wind_condition");
let current_condition= document.getElementById("cond");
let create_list =document.getElementById("create_list")
let image_box=document.getElementsByClassName("box")
let submitXX=document.getElementById("submit")
let myDIV = document.getElementById("myDIV");


// Global variable: All global variables goes here
let boundry_wind = 6 ; // give the lower bound tto check wind condition::::::::::::::::::::
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


submitXX.addEventListener("click" , GetInfo)

//####################----MAIN PROG----##################################
function GetInfo() {
    console.log("TEST GetInfo First line")

    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = newName.value;

    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=28ccc81c35e0d2b02668d8948dbe91d2&units=metric')
    .then(response => response.json())
    .then(data => {
        console.log("Data was obtained...")
        console.log(data.list[0], data.list[2],data.city);
       
        let date = new Date();
        date1.textContent=(new Date(date.getTime() + (date.getTimezoneOffset()*60000)+data.city.timezone*1000)).toLocaleString()
    
        // set today temperature to celicus
        today_temperature= data.list[0].main.temp;
        
        current_location= data.city.name;
        today_wind_rate= data.list[0].wind;
        today_weather_condn = data.list[0].weather[0].description;
        date_today=data.list[0].dt_txt; 
        
        feels_like_temperature=Math.ceil(data.list[0].main.feels_like) ;
        console.log("***"+feels_like_temperature)
    
        /// Passed values to current weather condition based on the location:::
        temperature.textContent = Math.floor(today_temperature).toFixed() + " ºC" ; // done
        feels_like_w.textContent = "feels like " + feels_like_temperature + " ºC";
        
        // MIN MAX temperature is not coming correctly::  CHECK??????
        
        // Need to correct this ---------------- ????? Which API???
        //min_max.textContent = Math.ceil(data.list[0].main.temp_min-273.15) +" ºC  /" +Math.ceil(data.list[0].main.temp_max-273.15)+ " ºC";
        wind_condition.textContent = today_wind_rate.speed; // done
        //location_current.textContent = data.city.name; // done
        current_condition.textContent = data.list[0].weather[0].description;
           
        //document.getElementById("WR").textContent = weather_remarks;
        /* Prediction in 6 hours::
        document.getElementById("date2").textContent = data.list[2].dt_txt; 
        document.getElementById("temp1").textContent = Math.ceil(data.list[2].main.temp).toFixed();
        document.getElementById("FL1").textContent = Math.ceil(data.list[2].main.feels_like);
        document.getElementById("max1").textContent = Math.ceil(data.list[2].main.temp_max);
        document.getElementById("WS1").textContent = data.list[2].wind.speed;
        document.getElementById("cond1").textContent = data.list[2].weather[0].description;

        */
        console.log("TEST GetInfo last line")

        create_checklist();
      
    })
    .catch(err => alert(err));
//    .catch(err => alert("Something Went Wrong: Location not Found \n Check the Spelling!!"));

    // Date and Time
    

      


}
///************PART 1 ************************** ******************/
// Default Screen. 

function DefaultScreen(){
    // Get the current location

let geo={};

    function sucess(pos){

        const lat = pos.coords.latitude;
        geo.latitude=lat;


        const lon = pos.coords.longitude;
        geo.longitude=lon;
        const myTimeout = setTimeout(myGeo(), 2000);

    }

//console.log(geo)


    function error(){                
    }

options={};

navigator.geolocation.getCurrentPosition(sucess,error, options);

  // pause for 5 Sec, to load the location input. 

    function myGeo() {
    console.log("**##:")
    console.log(geo)
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+geo.latitude+'&lon='+geo.longitude+'&appid=28ccc81c35e0d2b02668d8948dbe91d2&units=metric')
    .then(response => response.json())
    .then(data =>{


        document.getElementById("cityInput").defaultValue = data.city.name;

        GetInfo();
        console.log("TEST 101")

        })
    
          
    } 
  
}

/*

let api_url= "https://api.openweathermap.org/data/2.5/forecast?lat=65.010211&lon=25.483722&appid=28ccc81c35e0d2b02668d8948dbe91d2";

async function getISS() {
const renponse= await fetch (api_url);
const data= await renponse.json();


console.log(data.list[0], data.list[2],data.city);

  // this will give date and time of the current location::::
let date = new Date();
date1.textContent = date.getDate() +"/"  +(date.getMonth()+1) +"/"+ date.getFullYear()  ;
time1.textContent=  date.getHours() +":" + date.getMinutes()+":"+ date.getSeconds();

// set today temperature to celicus
today_temperature= data.list[0].main.temp -273.15;


current_location= data.city.name;
today_wind_rate= data.list[0].wind;
today_weather_condn = data.list[0].weather[0].description;
date_today=data.list[0].dt_txt; 


  
feels_like_temperature= -25//Math.ceil(data.list[0].main.feels_like-273.15);

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

*/

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
    rain_cloths : [ "Water proof pants" , "Rain boots" , "Rain gloves"],
    sun_shine : ["Sun glasses"],
    windy :["Wind proof jacket"]
   }  ;

   // 
  


   //Testing Purpose::: Adding these


//************************************************************************************** */
    let today_time_array = [];
    let today_wind_rates= [];
    let today_temp_forecast=[];
    let today_rain_pres =[];
    new_value_temp=3; // temperature for each hour goes here:::
    new_value_wind=4; // wind for each hour goes here:::::::::::::::
    new_value_rainy=1; // 
    //hours_index = 2; // this is current time


    // if you are getting every 3 hours put it that way::::::::::::::::: then hours_index ++3 
    for (let hours_index = 0; hours_index < 24; hours_index += 3) {
        today_time_array.push(hours_index);
        today_rain_pres.push(new_value_rainy);
        today_wind_rates.push(new_value_wind) ;
        today_temp_forecast.push( new_value_temp);
    // today_temperature_forecast = set (hours_index, new_value_temp);
    //  today_wind_rates= new Map (hours_index, new_value_temp);
    // These things no need :: checking purpose::::::::
        new_value_temp +=5;
        new_value_wind +=5;
        new_value_rainy +=6;
    }
    // Above has values with forecast :::::::::::::::

    // This will give min and max temperature ::::::...
    min_temperatue= Math.min(...today_temp_forecast);
    max_temperature=Math.max(...today_temp_forecast);
    // rain ::: We need maximum rain presentage and time:::
 
    max_rainPresentage = Math.max(...today_rain_pres);
    console.log(max_rainPresentage)

    max_windrate =Math.max(...today_wind_rates);
    console.log(max_rainPresentage)
    //index_value= today_rain_pres.findIndex(Math.max(today_rain_pres));
 

/***************************************************************************************** */
    
    // if there is any possibility we gonnna display cloths for rain



function check_temperature(){  
    console.log("int temp")
    console.log(feels_like_temperature)

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


/* Here we create elements for check list and cloth images:::*/


var span_1


function create_checklist(){
    console.log("I am running")

    if (myDIV.hasChildNodes()) {
        while (myDIV.hasChildNodes()) {
            myDIV.removeChild(myDIV.lastChild);
        }
    }

    if (image_box[0].hasChildNodes()) {
        while (image_box[0].hasChildNodes()) {
            image_box[0].removeChild(image_box[0].lastChild);
        }
    }


// take cloths from defined array
    
    cloths_need = check_temperature();
    //console.log(cloths_need.length)
    angle_needed=Math.ceil(360/cloths_need.length);
    console.log(angle_needed)

    cloths_need.forEach(function(element,item) {
        
        // create check boxes and set names using array names
        var chk_box = document.createElement("INPUT");
        chk_box.setAttribute("type", "checkbox");
        chk_box.setAttribute("name", "test")
        chk_box.setAttribute("id", "mycheckbox");

        var chk_box_lable = document.createElement("LABEL");
        chk_box_lable.setAttribute("for", "mycheckbox");
        chk_box_lable.innerText= '\u00a0' + '\u00a0'+element + '\u00a0' + '\u00a0';

        // Add elements to myDIV
        myDIV.appendChild(chk_box);
        myDIV.appendChild(chk_box_lable);
//        var chk_box_gap = document.createElement("BR");



        // Create pictures under same name::
        image = document.createElement("img");
        image.src=`Pictures/${element}.jpg`; // assign the name for the image:::
        console.log(element)
        console.log(image.src)
 
        // Adding images to header DIV
        span_1=document.createElement("span");
        span_1.style= `--i:${item*angle_needed};`;
        span_1.appendChild(image);
 
        image_box[0].appendChild(span_1);


    });
 
    //extra_items();
  
}

function extra_items(){

    // This is for raining::::::::::::::::::::::::::::::::::
    if (max_rainPresentage > 0){
        //console.log("Highest raining possibility is "+ max_rainPresentage +"% at" +today_time_array[index_value] );
        cloths_rain=array_cloths.rain_cloths; 
        console.log("testing:" +cloths_rain);

        cloths_rain.forEach(function(element,index){
            image1 = document.createElement("img");
            image1.src=`Pictures/${element}.jpg`; // assign the name for the image:::
            image1.style.display= "inline-block";
            image1.style.height="150px" ;
            image1.height="200px"
            document.getElementById("aditional").appendChild(image1);
            image1.style.display= "inline-block";

            var chk_box = document.createElement("INPUT");
            chk_box.setAttribute("type", "checkbox");

            var chk_para = document.createElement("p");
            chk_para.innerText =element + '\u00a0' + '\u00a0';
            chk_para.style.display= "inline-block";

            document.getElementById("extra_list").appendChild(chk_box);
            document.getElementById("extra_list").appendChild(chk_para); 
            
        })
            var chk_para = document.createElement("p");
            chk_para.innerText =" The highest rain presentage reported is xx % and at yy time" ;
            document.getElementById("extra_list").appendChild(chk_para);      
    }

    // Same goes for wind ::::::::::::
    // We propse cloths for wind only if it is postive temperature 
    // if temperature is negative we give a warning message::::::
    if (max_windrate > boundry_wind){
        
        cloths_windy=array_cloths.windy; 
        console.log("testing:" +cloths_windy);
        //if (today_temperature >0){
            cloths_windy.forEach(function(element,index){
                image1 = document.createElement("img");
                image1.src=`Pictures/${element}.jpg`; // assign the name for the image:::
                image1.style.display= "inline-block";
                image1.style.height="150px" ;
                image1.height="200px"
                document.getElementById("aditional").appendChild(image1);
                image1.style.display= "inline-block";
    
                var chk_box = document.createElement("INPUT");
                chk_box.setAttribute("type", "checkbox");
    
                var chk_para = document.createElement("p");
                chk_para.innerText =element + '\u00a0' + '\u00a0';
                chk_para.style.display= "inline-block";
    
                document.getElementById("extra_list").appendChild(chk_box);
                document.getElementById("extra_list").appendChild(chk_para); 
                
            })

       // }

            var chk_para = document.createElement("p");
            chk_para.innerText =" The highest wind rate is reported is aa % and at tt time" ;
            document.getElementById("extra_list").appendChild(chk_para);      
    }

}







