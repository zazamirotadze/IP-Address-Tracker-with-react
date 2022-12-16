import { useEffect, useState } from 'react';
import './App.css';
import { MapContainer, TileLayer,  Marker, Popup,useMap } from 'react-leaflet'
import { Icon } from "leaflet";

const skater = new Icon({
  iconUrl: "./images/icon-location.svg",
  iconSize: [25, 35]
});




function App() {

  //states for page to work
  const [position, setPosition]  = useState([51.505, -0.09])
  const [ip, setIp] = useState("")
  const [initiaIp, setInitialIp] = useState("")
  const [data, setData] = useState("")
  const [inputChange, setInputChange] = useState(true)
  const [isInitialiFelched, setIsInitialiFetched] = useState(false)

  //initial fetch
  useEffect(()=>{
    fetch(`https://ipapi.co/json/ `)
    .then((response) => response.json())
    .then((data) =>{ 
      setData(data) 
      setInitialIp(data.ip)
      setPosition([data.latitude,data.longitude])
      setIsInitialiFetched(true)
    })
  },[])

  //fetch when button is clicked
  useEffect(()=>{
    fetch(`https://ipapi.co/${ip}/json/ `)
    .then((response) => response.json())
    .then((data) =>{  
      if(data.error){
        alert("please enter  correct ip")
      }else if(ip==="" & isInitialiFelched===true){
        alert("please enter ip")
      }
      else{
        setData(data)
        setPosition([data.latitude,data.longitude])
      }
    })
  },[inputChange])

  //function to change map when button is clicked
  function FlyMapTo() {
      const map = useMap()
      useEffect(() => {
          map.flyTo(position)
      }, [map])
      return null
  }
 

  return (
    <div className="App">
        <div className="header-div" ><h2>IP Address Tracker</h2></div>
  <div className="input-div" >
     <input type="text" placeholder="Search for any IP address or domain" onChange={(e)=> setIp(e.target.value)} >
    </input>
    <button onClick={()=>setInputChange(prevValue=> !prevValue)}></button>
  </div>
  <div className="info-map-div">
    <div className="info-div" >
      <div><h4>IP Address</h4><h2>{data.ip===""? initiaIp: data.ip}</h2></div>
      <div><h4>Location</h4><h2 >{data.region}</h2></div>
      <div><h4>UTC</h4><h2>{data.utc_offset}</h2></div>
      <div><h4>ISP</h4><h2>{data.org}</h2></div>
    </div>
    <MapContainer  className='map' center={position} zoom={16} scrollWheelZoom={false} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={skater}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <FlyMapTo />
    </MapContainer>
  </div>

    <div className="attribution">
      Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">Frontend Mentor</a>. 
      Coded by <a href="/">Zaza Mirotadze</a>.
    </div>

    </div>
  );
}

export default App;
