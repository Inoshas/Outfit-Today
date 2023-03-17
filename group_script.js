
// link html to javascript::::::::::::::::::::::::: All links goes here
let head_main= document.getElementById("head_main");
let para1=document.getElementById("para1");
let date1 = document.getElementById("date1");
let cityName= document.getElementById( "cityName");
let inputContainer= document.getElementById("inputContainer");
let cityInput=document.getElementById("cityInput");
let firstsetup=document.getElementById("firstsetup");
let temperature= document.getElementById("temperature");
let feels_like_w =document.getElementById("feels_like_w");
let min_max=document.getElementById("min_max");
let wind_condition = document.getElementById("wind_condition");
let current_condition= document.getElementById("cond");
let create_list =document.getElementById("create_list");
let image_box=document.getElementsByClassName("box");
let submitXX=document.getElementById("submit");
let myDIV = document.getElementById("myDIV");
let Prediction = document.getElementById( "prediction");
let mylink=document.getElementById("mylink");

// Global variable: All global variables goes here
let boundry_wind = 6 ; // give the lower bound tto check wind condition::::::::::::::::::::
let rain_boundry = 0;
let today_temperature;
let current_location;
let today_wind_rate;
let feels_like_temperature;
let new_ID;

//************** additional variable to assign  */
let today_time_array = [];
let today_wind_rates= [];
let today_temp_forecast=[];
let today_rain_pres =[];


//#####################################################################
// Calling main functions here----------------------------

submitXX.addEventListener("click" , GetInfo);

//####################----All other functions / objects/ array gioes here----##################################

// PART 1 :  functions for fetching data:::::::::::::
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
            
            // we need this to display link::
            new_ID= data.city.id
        

            create_checklist();
            
        })
        .catch(err => alert(err));


    }

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

// *************************Part 1 ends here ************************************

//// ********************** PART 2*************************************************//// 


/****************** This part is for adding pictures and processing data ....... **************** */



// functions come first:::::::::::::::::::::::::

    function create_checklist(){
        console.log("I am running")

    /// remove all created childs here:::::::::::::::::::::::

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



        if (mylink.hasChildNodes()) {
            while (mylink.hasChildNodes()) {
                mylink.removeChild(mylink.lastChild);
            }
        }

    //:::::::::::::::::::::::::::::::::::::::::::::::::::

    // create link here::::::::::::
        new_href= 'https://openweathermap.org/city/'+new_ID ;
        new_link = document.createElement('a');
        new_link.setAttribute("class","new_link");
        new_link.setAttribute('href', new_href);
        new_link.setAttribute('target', "_blank")
        new_link.innerHTML="for more info"
        mylink.appendChild(new_link);


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
    
        extra_items();
    
    }



    function check_temperature(){  
        //console.log("int temp")
        //console.log(feels_like_temperature)

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
  



   
   //////////////////////// Third part to add extra things::::::::::::::::::::: ///////////////////////


   //Testing Purpose::: Adding these


//************************************************************************************** */
  
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



/* Here we create elements for check list and cloth images:::*/


var span_1




function extra_items(){

    // This is for raining::::::::::::::::::::::::::::::::::
    if (max_rainPresentage > rain_boundry ){
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







