
import React, {useState, useEffect} from "react";

const Searchweather = () => {
    const  [search, setSearch] = useState("san diego");
    const  [data, setData] = useState([]);
    const  [input, setInput] = useState("");
    let componentMounted = true;
    let temp = "0";
    let min = "0";
    let max = "0"; 
    let emoji = null;


    useEffect(() => {
        const fetchWeather = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=67717ad3570e3d223581e9d8e1138860`);
            if(componentMounted){
                setData(await response.json());
                console.log(data);
                
                temp = (data.main.temp - 273.15).toFixed(0);
                min = (data.main.temp_min - 273.15).toFixed(0);
                max = (data.main.temp_max - 273.15).toFixed(0); 
    
            }

            return () => {
                componentMounted = false;
            }
    
        }
        fetchWeather();
    
    }, [search]);


    if(typeof data.main != "undefined"){
        if(data.weather[0].main === "Clouds"){
            emoji = "fa-cloud";
        }else if(data.weather[0].main === "Thunderstorm"){
            emoji = "fa-bolt";
        }else if(data.weather[0].main === "Drizzle"){
            emoji = "fa-cloud-rain";
        }else if(data.weather[0].main === "Rain"){
            emoji = "fa-cloud-shower-heavy";
        }else if(data.weather[0].main === "Snow"){
            emoji = "fa-cloud-snow-flake";
        }else if(data.weather[0].main === "Clear"){
            emoji = "fa-sun";
        }else emoji = "fa-smog";
    }else{
        return(<div>Loading...</div>)
    } 
   
    temp = (data.main.temp - 273.15).toFixed(0);
    min = (data.main.temp_min - 273.15).toFixed(0);
    max = (data.main.temp_max - 273.15).toFixed(0);

    let utcdate = Date.now();
    console.log(utcdate);
    console.log(data.timezone);

    let date = utcdate+(data.timezone);
    const date2= new Date(date);
    let dateFormat = date2.toDateString();
    let hour = date2.getHours() + ":" + date2.getMinutes();

    let handleSubmit = (event) =>{
        event.preventDefault();
        setSearch(input);
    }

    return(
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card text-white text-center border-0">
                            <img src={`https://source.unsplash.com/600x1000/?${data.weather[0].main},weather`} class="card-img" alt="..."/> 
                            <div className="card-img-overlay">
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-4 w-75 mx-auto input-group-lg">
                                        <input type="search" 
                                            className="form-control" 
                                            placeholder="Search City" 
                                            aria-label="Search City" 
                                            aria-describedby="basic-addon2"
                                            name="search"
                                            value={input}
                                            onChange={(e)=>setInput(e.target.value)}
                                            required/>
                                        <button type="submit" className="input-group-text" id="basic-addon2">
                                        <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </form>

                                <div className="bg-dark bg-opacity-50 py-3">
                                    <h2 class="card-title">
                                        {data.name}
                                    </h2>
                                   
                                    <hr />
                                   <i className={`fas ${emoji} fa-4x`}></i>
                                   <h1 className="fw-bolder mb-5">
                                    {temp}&deg; C 
                                    </h1>
                                   <p className="lead fw-bolder mb-0"> {data.weather[0].main}</p>
                                   <p className="lead">{min}&deg; C | {max}&deg; C</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default Searchweather;