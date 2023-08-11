
// link html to javascript::::::::::::::::::::::::: All links goes here
let head_main= document.getElementById("head_main");
let para1=document.getElementById("para1");
let date1 = document.getElementById("date1");
let cityName= document.getElementById( "cityName");
let inputContainer= document.getElementById("inputContainer");
let inputContainer2= document.getElementById("inputContainer2");
let cityInput= document.getElementById("cityInput");
let firstsetup= document.getElementById("firstsetup");
let temperature= document.getElementById("temperature");
let feels_like_w =document.getElementById("feels_like_w");
let min_max=document.getElementById("min_max");
let wind_condition = document.getElementById("wind_condition");
let current_condition= document.getElementById("cond");
let create_list =document.getElementById("create_list");
let image_box=document.getElementsByClassName("box");
let submit1=document.getElementById("submit1");
let myDIV = document.getElementById("myDIV");
let Prediction = document.getElementById( "prediction");
let mylink=document.getElementById("mylink");
let extra_list=document.getElementById("extra_list");
let additional=document.getElementById("additional");
let part1=document.getElementById("part1");
let table_DIV=document.getElementById("table_DIV")
let submit2=document.getElementById("submit2");
let new_assign_temp= document.getElementById("tempNewInput")
// Global variable: All global variables goes here
// According to https://www.windfinder.com/wind/windspeed.html   wind boundry was set to below::::
// that is for moderate breeze ::: 1ktz nearly equal .55 m/s

let boundry_wind = 5.56 ; // give the lower bound tto check wind condition::::::::::::::::::::
let rain_boundry = .25; // The lowest  presentage to suggest rainny cloths::::::::::::::::

//  
let today_temperature;
let current_location;
let today_wind_rate;
let feels_like_temperature;
let new_ID;


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

submit1.addEventListener("click" , GetInfo);
submit2.addEventListener("click", update_cloths);

//####################----All other functions / objects/ array gioes here----##################################

// ********************** FUNCTIONS ***************************************

//GetInfo() : taking data from API as an object by searching location name
//DefaultScreen() : What to print when open the browser by current location
//myGeo() ::  saving latitude and longitude
//error()  ::: defaullt
//check_temperature() ::: return cloth array depend on the temperature
//create_checklist() ::: create list of elements based on themperature
//extra_items() :::: create list of elements based on rain and wind 
//create_table() :::: create forecast data in left side



// PART 1 :  functions for fetching data:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    function GetInfo() {
        console.log("TEST GetInfo First line")

        var newName = document.getElementById("cityInput");
        //var cityName = document.getElementById("cityName");
        //var new_temperature=document.getElementById ("")
        //let var2=  newName.value.toLowerCase() ;
        //let test3=var2[0].toUpperCase() + (var2[1, end]).toLowerCase();
           // console.log(var2+ "**" + test3)
        cityName.innerHTML = newName.value[0].toUpperCase() + newName.value.substr(1, newName.value.length).toLowerCase() ;

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
            //console.log("***"+feels_like_temperature)
        
            /// Passed values to current weather condition based on the location:::
            temperature.textContent = Math.floor(today_temperature).toFixed() + " ºC" ; // done
            feels_like_w.textContent = "feels like " + feels_like_temperature + " ºC";
            wind_condition.textContent = today_wind_rate.speed + " m/s";
            
     
            current_condition.textContent = data.list[0].weather[0].description;
            
            // we need this to display link::
            new_ID= data.city.id

            // for rain and wind codition data ::::::::::::::::::::::::::::::
            // We need to empty this, if we search another city, it should not extend the array:::
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

            let n = 25-nd.getHours();
            n=(n/3).toFixed();
            hours_now=nd.getHours();
             

            for (i=0; i<n; i++){
               
                arr_wind.push(data.list[i].wind.speed);
                arr_rain.push(Number(data.list[i].pop));
                arr_time.push(d1.getHours()+(3*i));
                arr_temp.push(data.list[i].main.temp);
                arr_fl.push(data.list[i].main.feels_like);
                arr_wc.push(data.list[i].weather[0].description);
                arr_day.push(nd.getDate());
                arr_Hours.push(nd.getHours());
            }

            //console.log("printing**********")
            //console.log("*********"+arr_time)

            max_rainPresentage=Math.max(...arr_rain);
            index_rain = arr_rain.indexOf(max_rainPresentage);
            max_windrate=Math.max(...arr_wind);
            index_wind = arr_wind.indexOf(max_windrate);
            

            let rain_time = data.list[index_rain].dt_txt;
  

            let max_temp = Math.round(Math.max(...arr_temp));
            let min_temp = Math.round(Math.min(...arr_temp));
            //console.log(arr_temp)

            min_max.innerText = min_temp + " ºC | " +max_temp+ " ºC";
        
            create_checklist();
            create_table();
            
        })
        .catch(err => alert(err));


    }


    function create_table(){
        
        max_length=0;

        if (arr_temp.length > 3) 
            max_length= 3;
        else max_length =arr_temp.length-1;
        //console.log("check" + max_length)
 
        if (table_DIV.hasChildNodes()) {
            while (table_DIV.hasChildNodes()) {
                table_DIV.removeChild(table_DIV.lastChild);
            }
        }

        if (max_length !=0){

            // Create table with relevant  icons and lables :::
            var new_Div= document.createElement('div');
            new_Div.setAttribute("class", "col-sm-3 p-1  text-black");
            var line =  document.createElement('hr');
            table_DIV.appendChild(new_Div);
        
            var time_parax=  document.createElement('p');
            var temp_parax=  document.createElement('p');
            var fels_parax=  document.createElement('p');
            fels_parax.style.fontSize="18px";
            var rain_parax=  document.createElement('p');
            rain_parax.style.fontSize="20px";
            var wind_parax=  document.createElement('p');
            wind_parax.style.fontSize="30px";
        
            time_parax.innerHTML= "&#128341";
            temp_parax.innerHTML= "&#127777";
            fels_parax.innerHTML = "feels like";
            rain_parax.innerHTML = "&#127784";
            wind_parax.innerHTML=  "&#127788";
        
            new_Div.appendChild(time_parax);
            new_Div.appendChild(temp_parax);      
            new_Div.appendChild(fels_parax);
            new_Div.appendChild(rain_parax);
            new_Div.appendChild(wind_parax);
            table_DIV.appendChild(new_Div);


            for( iter=1; iter <= max_length ; iter++ ){
            
                var new_Div= document.createElement('div');
                new_Div.setAttribute("class", "col-sm-3 p-1  text-black");
                var line =      document.createElement('hr');

            
                var time_para2=  document.createElement('p');
                var temp_para2=  document.createElement('p');
                var fels_para2=  document.createElement('p');
                var rain_para2=  document.createElement('p');
                var wind_para2=  document.createElement('p');

                time_para2.innerHTML= arr_time[iter]+":00";
                temp_para2.innerHTML= Math.round(arr_temp[iter]) +  " ºC";
                fels_para2.innerHTML = Math.round(arr_fl[iter]) +  " ºC"; 
                rain_para2.innerHTML = Math.round(arr_rain[iter]*100)+ " %";
                wind_para2.innerHTML=  arr_wind[iter] +  " m/s";

                new_Div.appendChild(time_para2);
                new_Div.appendChild(temp_para2);      
                new_Div.appendChild(fels_para2);
                new_Div.appendChild(rain_para2);
                new_Div.appendChild(wind_para2);
                new_Div.appendChild(line);
                table_DIV.appendChild(new_Div)

            }
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
                    //console.log("TEST 101")
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

            myDIV.appendChild(chk_box);
            myDIV.appendChild(chk_box_lable);
 
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
            console.log("We can give warning message here");
                break;
            }
    }


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
        let status1;
     
        // This is for raining::::::::::::::::::::::::::::::::::
        if (max_rainPresentage !=0){     
                if (today_temperature >0){
                     status1 =  "There is a "+  Math.round(max_rainPresentage*100) +"% probability to experience " + arr_wc[index_rain]+ " at  " +arr_time[index_rain] +":00 hrs." ;
                }
                else{
                    status1 =  "There is a "+  Math.round(max_rainPresentage*100) +"% probability to experience " + arr_wc[index_rain]+ " at  " +arr_time[index_rain] +":00 hrs." ;
                }
        }
        else if (max_rainPresentage ==0){ 
            status1="";
        }
        
        
        if (max_rainPresentage > rain_boundry  && today_temperature > 0){


            cloths_rain=array_cloths.rain_cloths; 
            console.log("testing:" +cloths_rain);
            cloths_rain.forEach(function(element,index){
                image1 = document.createElement("img");
                image1.src=`Pictures/${element}.jpg`; // assign the name for the image:::
                image1.style.display= "inline-block";
                image1.style.height="150px" ;
                image1.style.width ="175px";
                //image1.height="200px"
                additional2.appendChild(image1);
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
        
        if (max_windrate != 0){
        console.log("test::::"+max_windrate);
        var chk_para = document.createElement("p");
    //    chk_para.innerText =" The highest wind rate reported is " + max_rainPresentage + "m/s at ????? and  status says ???" ;
        status1 = status1+ " The  maximum wind rate reported is  " +  max_windrate+ " m/s  at "+ arr_time[index_wind] +":00 hrs (" + arr_wc[index_wind]+"). ";
        chk_para.innerHTML= status1;
        document.getElementById("additional").appendChild(chk_para);   
        }
        // According to https://www.windfinder.com/wind/windspeed.html  
        if (max_windrate > boundry_wind && today_temperature > 5 && max_windrate !=0){
    
            cloths_windy=array_cloths.windy; 
            console.log("testing:" +cloths_windy);
            //if (today_temperature >0){
                cloths_windy.forEach(function(element,index){
                    image1 = document.createElement("img");
                    image1.src=`Pictures/${element}.jpg`; // assign the name for the image:::
                    image1.style.display= "inline-block";
                    image1.style.height="150px" ;
                    image1.style.width ="175px"
            
                    additional2.appendChild(image1);

                    var chk_box = document.createElement("INPUT");
                    chk_box.setAttribute("type", "checkbox");
                    chk_box.setAttribute("id", "mycheckbox");
        
                    var chk_box_lable = document.createElement("LABEL");
                    chk_box_lable.setAttribute("for", "mycheckbox");
                    chk_box_lable.innerText= '\u00a0' + '\u00a0'+element + '\u00a0' + '\u00a0';

                    extra_list2.appendChild(chk_box);
                    extra_list2.appendChild(chk_box_lable);

                    
                })
        }
    }

    function update_cloths(){    
       feels_like_temperature= document.getElementById("tempNewInput").value
        console.log("testjjj"+feels_like_temperature)

    
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

            myDIV.appendChild(chk_box);
            myDIV.appendChild(chk_box_lable);
 
            // Create pictures under same name::
            image = document.createElement("img");
            image.src=`Pictures/${element}.jpg`; // assign the name for the image:::
            
    
            // Adding images to header DIV
            span_1=document.createElement("span");
            span_1.style= `--i:${item*angle_needed};`;
            span_1.appendChild(image);
    
            image_box[0].appendChild(span_1);


        });
        
        max_rainPresentage=0;
        max_windrate=0;
        extra_items(); 

    }
        //////********************************************************************************* */
    // lets make an object with different cloths:
    const array_cloths =
    { too_cold: ["Thermal pant", "Pant" , "Long sleeve top", "Inner overall", "Socks", "Winter pant","Winter jacket"  ,"Woolen socks","Winter boots" ,"Winter cap" , "Scarf" , "Mittens", "Winter gloves"] ,
        pretty_cold: ["Long sleeve top", "Thermal pant","Inner overall", "Socks",   "Winter jacket" , "Winter pant" , "Woolen socks"  , "Winter boots" ,   "Winter cap" ,  "Winter scarf" ,  "Winter gloves" ],
        around_zero : ["Short sleeve top", "Inner overall", "Socks",   "Winter jacket" , "Winter pant" ,   "Winter boots" , "Mid-seasonal cap" ,  "Mid-seasonal gloves", "scarf" ] ,
        offseason_feel :  ["Short sleeve top", "Socks",  "Inner overall", "Mid-seasonal jacket"  , "Cap"  , "Shoes" , "scarf" ], 
        summary_mood : [ "Short sleeve top", "Shorts",    "Cap"  , "Sandles" ],
        too_hot : [ "Short sleeve top", "Shorts",   "Cap"  , "Sandles"],
        rain_cloths : [ "Water proof pant" , "Rain boots" , "Rain gloves", "Umbrella"],
        sun_shine : ["Sun glasses"],
        windy :["Wind proof jacket"]
    }  ;

    // **********************************************************************************








