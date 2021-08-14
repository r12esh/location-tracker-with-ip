import React, { useState, useEffect } from 'react';
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { maptiler } from 'pigeon-maps/providers';


const maptilerProvider = maptiler('YOUR_KEY', "streets")

function App() {

  const [ip, setIp] = useState();
  const [queryIp, setQueryIp] = useState("");

  const getIP = async () => {
    const ip = await fetch(`https://geo.ipify.org/api/v1?apiKey=YOUR_KEY&ipAddress=${queryIp}`).then((response) => response.json())
    setIp(ip)
    console.log(ip);

  }
  useEffect(() => {
    getIP();
  }, []);

  return (
    <div className="App">
      <div className="upper-div">
        <h1>
          Track Location with IP
        </h1>
        <div className="query-ip">
          <input
            value={queryIp}
            onChange={(e) => setQueryIp(e.target.value)}
            placeholder="Enter IP address"
          />
          <button onClick={getIP}>Submit</button>
        </div>



      </div>
      {
        ip ?
          <div className="map-class">
            <Map
              provider={maptilerProvider}
              dprs={[1, 2]}
              defaultCenter={[ip?.location?.lat, ip?.location?.lng]}
              center={[ip?.location?.lat, ip?.location?.lng]}
              defaultZoom={13}
              zoom={13}
              height="100vh"
            >
              <div className="location-info">
                <div className="location-info-box"> <h3>IP address </h3>  <p> {ip?.ip} </p> </div>
                <div className="location-info-box"> <h3>Location </h3>  <p> {ip?.location?.country}, {ip?.location?.region}, {ip?.location?.city} </p> </div>
                <div className="location-info-box"> <h3>Time Zone </h3>  <p> {ip?.location?.timezone} </p> </div>
                <div className="location-info-box"> <h3>ISP</h3>  <p> {ip?.isp} </p> </div>
              </div>
              <Marker
                width={57}
                anchor={[ip?.location?.lat, ip?.location?.lng]}
                color={"rgb(0, 0, 0.507)"}
              />
              <ZoomControl/>
            </Map>
          </div>
          :
          <div className="loading">
            Loading...
          </div>
      }
    </div>
  );
}

export default App;







