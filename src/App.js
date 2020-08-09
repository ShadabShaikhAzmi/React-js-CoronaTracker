import React, { useEffect, useState } from "react";
import Linegraph from "./component/Linegraph";
import CovidDeatils from "./component/CovidDeatils";
import "./App.css";
import axios from "./Axios";

function App() {
  const [totalconfirm, settotalconfirm] = useState(0);
  const [totalrecover, settotalrecover] = useState(0);
  const [totaldeath, settotaldeath] = useState(0);
  const [loading, setloading] = useState(false);
  const [covidDeatils, setcovidDeatils] = useState([]);
  const [days, setdays] = useState("7");
  const [country, setcountry] = useState("");
  const [dataGrapher, setdataGrapher] = useState([]);
  const [dataLabeler, setdataLabeler] = useState([]);

  useEffect(() => {
    setloading(true);
    axios
      .get("https://api.covid19api.com/summary")
      .then((res) => {
        setloading(false);
        if (res.status === 200) {
          settotalconfirm(res.data.Global.TotalConfirmed);
          settotalrecover(res.data.Global.NewRecovered);
          settotaldeath(res.data.Global.TotalDeaths);
          setcovidDeatils(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const _date = `0${d.getDate()}`.slice(-2);
    return `${year}-${month}-${_date}`;
  };

  const countryHandler = (e) => {
    setcountry(e.target.value);
    const d = new Date();
    const to = formatDate(d);
    const from = formatDate(d.setDate(d.getDate() - days));
    getCoronaBydate(e.target.value, from, to);
  };

  const daysHandler = (e) => {
    setdays(e.target.value);
    const d = new Date();
    const to = formatDate(d);
    const from = formatDate(d.setDate(d.getDate() - e.target.value));
    getCoronaBydate(country, from, to);
  };

  const getCoronaBydate = (countrySlug, from, to) => {
    axios
      .get(
        `https://api.covid19api.com/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`
      )
      .then((res) => {
        const dataGraphing = res.data.map((d) => d.Cases);
        const dataLabel = res.data.map((d) => d.Date);
        console.log(res);
        const covidD = covidDeatils.Countries.find(
          (country) => country.Slug === countrySlug
        );
        setdataGrapher(dataGraphing);
        setdataLabeler(dataLabel);
        settotalconfirm(covidD.TotalConfirmed);
        settotalrecover(covidD.TotalRecovered);
        settotaldeath(covidD.TotalDeaths);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (loading) {
    return <p>Fetching data from api....</p>;
  }

  return (
    <div className="App">
      <CovidDeatils
        totalconfirm={totalconfirm}
        totalrecover={totalrecover}
        totaldeath={totaldeath}
        country={country}
      />
      <br></br>
      <div>
        <select value={country} onChange={countryHandler}>
          <option value="">Select Country</option>
          {covidDeatils.Countries &&
            covidDeatils.Countries.map((country) => (
              <option key={country.Slug} value={country.Slug}>
                {country.Country}
              </option>
            ))}
        </select>
        <select value={days} onChange={daysHandler}>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
        </select>
      </div>
      <Linegraph dataGraphs={dataGrapher} dataLabeles={dataLabeler} />
    </div>
  );
}

export default App;
