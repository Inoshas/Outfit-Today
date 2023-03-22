
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

let extra_list=document.getElementById("extra_list");
let additional=document.getElementById("additional");
let part1=document.getElementById("part1");

// Global variable: All global variables goes here
// According to https://www.windfinder.com/wind/windspeed.html   wind boundry was set to below::::
// that is for moderate breeze ::: 1ktz nearly equal .55 m/s

let boundry_wind = 5.56 ; // give the lower bound tto check wind condition::::::::::::::::::::

let rain_boundry = .25;
let today_temperature;
let current_location;
let today_wind_rate;
let feels_like_temperature;
let new_ID;

//************** additional variable to assign  */



let arr_temp=[];
let arr_fl = [];
let arr_wc= [];
let arr_rain= [];
let arr_wind= [];
let arr_day= [];
let arr_Hours=[];
let arr_time =[];

let max_rainPresentage;
let index_rain ;
let max_windrate ;
let index_wind ;



//#####################################################################
// Calling main functions here----------------------------

submitXX.addEventListener("click" , GetInfo);

//####################----All other functions / objects/ array gioes here----##################################

// ********************** FUNCTIONS ***************************************

//GetInfo()
//DefaultScreen()
//myGeo()
//error() 
//check_temperature() ::: return cloth array depend on the temperature
//create_checklist() ::: create list of elements based on themperature
//extra_items() :::: create list of elements based on rain and wind 

// PART 1 :  functions for fetching data:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
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
            var d1 = (new Date(date.getTime() + (date.getTimezoneOffset()*60000)+data.city.timezone*1000));

        
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
            wind_condition.textContent = today_wind_rate.speed + " m/s";
            
            // MIN MAX temperature is not coming correctly::  CHECK??????
            
            // Need to correct this ---------------- ????? Which API???
            //min_max.textContent = Math.ceil(data.list[0].main.temp_min-273.15) +" ºC  /" +Math.ceil(data.list[0].main.temp_max-273.15)+ " ºC";
             // done
            //location_current.textContent = data.city.name; // done
            current_condition.textContent = data.list[0].weather[0].description;
            
            // we need this to display link::
            new_ID= data.city.id

            // for rain and wind codition data ::::::::::::::::::::::::::::::

            
            arr_temp=[];
            arr_fl = [];
            arr_wc= [];
            arr_rain= [];
            arr_wind= [];
            arr_day= [];
            arr_Hours=[];
            arr_time =[];

            var d = new Date();

            var nd = new Date((d.getTime() + (d.getTimezoneOffset() * 60000)) + (data.city.timezone*1000));

           

            let n = 24-nd.getHours();

            n=(n/3).toFixed();

            hours_now=nd.getHours();

            console.log("####"+nd.getHours());

                        

            for (i=0; i<n; i++){
               
                arr_wind.push(data.list[i].wind.speed)
                arr_rain.push(Number(data.list[i].pop))
               arr_time.push(d1.getHours()+(3*i))
              
             
                arr_temp.push(data.list[i].main.temp)
                arr_fl.push(data.list[i].main.feels_like)
                arr_wc.push(data.list[i].weather[0].description)
                

                arr_day.push(nd.getDate());
                arr_Hours.push(nd.getHours())
            }
            console.log("printing**********")
            console.log("*********"+arr_time)

            max_rainPresentage=Math.max(...arr_rain);
            index_rain = arr_rain.indexOf(max_rainPresentage);
            max_windrate=Math.max(...arr_rain);
            index_wind = arr_rain.indexOf(max_windrate);
            

            let rain_time = data.list[index_rain].dt_txt;

            console.log(rain_time);

            let max_temp = Math.round(Math.max(...arr_temp));
            let min_temp = Math.round(Math.min(...arr_temp))
            console.log(arr_temp)

            min_max.innerText = min_temp + " ºC | " +max_temp+ " ºC"
        

            create_checklist();
            create_table();
            
        })
        .catch(err => alert(err));


    }

    function create_table(){
        
        console.log(arr_temp.length);
        max_length=0;

        if (arr_temp.length > 4) 
            max_length= 4;
        else max_length =arr_temp.length-1;
        console.log("check" + max_length)

        if (part1.hasChildNodes()) {
            while (part1.hasChildNodes()) {
                part1.removeChild(part1.lastChild);
            }
        }

    
        for( iter=1; iter <= max_length ; iter++ ){
            /*var temp_icon=document.createElement('i');
            temp_icon.setAttribute("class", "fas");
            temp_icon.innerHTML = '&#xf769'
            console.log(temp_icon)*/
            
            var time_para=  document.createElement('p');
            var temp_para=  document.createElement('p');
            var fels_para=  document.createElement('p');
            var rain_para=  document.createElement('p');
            var wind_para=  document.createElement('p');
            var line =      document.createElement('hr');

            time_para.innerHTML= arr_time[iter];
            temp_para.innerHTML= Math.round(arr_temp[iter]) ;
            fels_para.innerHTML = "feels like " + Math.round(arr_fl[iter]);
            rain_para.innerHTML = arr_rain[iter]*100+ " %";
            wind_para.innerHTML=  arr_wind[iter] + " m/s";


            console.log(time_para);
            console.log(temp_para);
           
           // part1.appendChild(temp_icon);
           console.log(arr_time.length +"***"+ arr_temp.length )
            part1.appendChild(time_para);
            part1.appendChild(temp_para);      
            part1.appendChild(fels_para);
            part1.appendChild(rain_para);
            part1.appendChild(wind_para);
            part1.appendChild(line)

        }
       

    }

// Function for showing default screen::::::::::::::::::::::::::::::::::::::::::::::::::::

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



// functions to create check list:::::::::::::::::::::::::

    function create_checklist(){
     

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
        new_link.innerHTML="For more forecast info"
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
    { too_cold: ["Thermal pant", "Pant" , "Long sleeve top", "Inner overall", "Socks", "Winter pant","Winter jacket"  ,"Woolen socks","Winter boots" ,"Winter cap" , "Scarf" , "Mittens", "Winter gloves"] ,
        pretty_cold: ["Long sleeve top", "Thermal pant","Inner overall", "Socks",   "Winter jacket" , "Winter pant" , "Woolen socks"  , "Winter boots" ,   "Winter cap" ,  "Winter scarf" ,  "Winter gloves" ],
        around_zero : ["Short sleeve top", "Inner overall", "Socks",   "Winter jacket" , "Winter pant" ,   "Winter boots" , "off-seasonal cap" ,  "Off-seasonal gloves", "scarf" ] ,
        offseason_feel :  ["Short sleeve top", "Socks",  "Inner overall", "Off-seasonal jacket"  , "Cap"  , "Shoes" , "scarf" ], 
        summary_mood : [ "Short sleeve top", "Shorts",    "Cap"  , "Sandles" ],
        too_hot : [ "Short sleeve top", "Shorts",   "Cap"  , "Sandles"],
        rain_cloths : [ "Water proof pant" , "Rain boots" , "Rain gloves", "Umbrella"],
        sun_shine : ["Sun glasses"],
        windy :["Wind proof jacket"]
    }  ;

   // 
  



   
   //////////////////////// Third part to add extra things::::::::::::::::::::: ///////////////////////


   //Testing Purpose::: Adding these


//************************************************************************************** */
  



function extra_items(){

    // remove all created childs here:::::::::::::::::::::::

    if (additional.hasChildNodes()) {
        while (additional.hasChildNodes()) {
            additional.removeChild(additional.lastChild);
        }
    }



    if (extra_list.hasChildNodes()) {
        while (extra_list.hasChildNodes()) {
            extra_list.removeChild(extra_list.lastChild);
        }
    }

 
    if (additional2.hasChildNodes()) {
        while (additional2.hasChildNodes()) {
            additional2.removeChild(additional2.lastChild);
        }
    }



    if (extra_list2.hasChildNodes()) {
        while (extra_list2.hasChildNodes()) {
            extra_list2.removeChild(extra_list2.lastChild);
        }
    }

   

    // This is for raining::::::::::::::::::::::::::::::::::
    if (max_rainPresentage !=0){
            var chk_para = document.createElement("p");
            if (today_temperature >0){
                chk_para.innerHTML = "The highest rain presentage reported is <font color='Blue' font size = '5' >" + max_rainPresentage*100+ "%  </font> at " +arr_time[index_rain] +" status says ???? " + arr_wc[index_rain]  ;
            }
            else{
                chk_para.innerHTML = "Highest Possibility to experience snowing  is <font color='Blue' font size = '5' >" + max_rainPresentage*100+ "%  </font>  at "+arr_time[index_rain] +" status says  ???? " + arr_wc[index_rain]
            }

            extra_list.appendChild(chk_para); 
    }
    
    if (max_rainPresentage > rain_boundry  && today_temperature > 0){
        //console.log("Highest raining possibility is "+ max_rainPresentage +"% at" +today_time_array[index_value] );
        var chk_para = document.createElement("p");
        chk_para.innerText = "Suggestions for rainy conditions are, " ;
        extra_list.appendChild(chk_para); 

        cloths_rain=array_cloths.rain_cloths; 
        console.log("testing:" +cloths_rain);
    

        cloths_rain.forEach(function(element,index){
            image1 = document.createElement("img");
            image1.src=`Pictures/${element}.jpg`; // assign the name for the image:::
            image1.style.display= "inline-block";
            image1.style.height="150px" ;
            //image1.height="200px"
            additional.appendChild(image1);
            image1.style.display= "inline-block";

            var chk_box = document.createElement("INPUT");
            chk_box.setAttribute("type", "checkbox");
            chk_box.setAttribute("id", "mycheckbox");

            var chk_box_lable = document.createElement("LABEL");
            chk_box_lable.setAttribute("for", "mycheckbox");
            chk_box_lable.innerText= '\u00a0' + '\u00a0'+element + '\u00a0' + '\u00a0';

            // Add elements to myDIV
            extra_list2.appendChild(chk_box);
            extra_list2.appendChild(chk_box_lable);

        })
           
    }
   
      
    var chk_para = document.createElement("p");
//    chk_para.innerText =" The highest wind rate reported is " + max_rainPresentage + "m/s at ????? and  status says ???" ;
    chk_para.innerHTML =" The highest wind rate reported is <font color='Blue' font size = '5' >" + max_rainPresentage + "m/s </font>at "+ arr_time[index_wind] +" and  status says ???" + arr_wc[index_rain] ;
    document.getElementById("additional2").appendChild(chk_para);   

    // Same goes for wind ::::::::::::
    // We propse cloths for wind only if it is postive temperature 
    // if temperature is negative we give a warning message::::::

    // According to https://www.windfinder.com/wind/windspeed.html  
    if (max_windrate > boundry_wind && today_temperature > 5 && max_windrate !=0){
    

        var chk_para = document.createElement("p");
        chk_para.innerText = "Suggestions for windy conditions are, " ;
        additional2.appendChild(chk_para); 
       
        
        cloths_windy=array_cloths.windy; 
        console.log("testing:" +cloths_windy);
        //if (today_temperature >0){
            cloths_windy.forEach(function(element,index){
                image1 = document.createElement("img");
                image1.src=`Pictures/${element}.jpg`; // assign the name for the image:::
                image1.style.display= "inline-block";
                image1.style.height = "150px"

    
                
                additional2.appendChild(image1);

                var chk_box = document.createElement("INPUT");
                chk_box.setAttribute("type", "checkbox");
                chk_box.setAttribute("id", "mycheckbox");
    
                var chk_box_lable = document.createElement("LABEL");
                chk_box_lable.setAttribute("for", "mycheckbox");
                chk_box_lable.innerText= '\u00a0' + '\u00a0'+element + '\u00a0' + '\u00a0';
    
                // Add elements to myDIV
                additional2.appendChild(chk_box);
                additional2.appendChild(chk_box_lable);
                
            })

       // }

         
    }

}







