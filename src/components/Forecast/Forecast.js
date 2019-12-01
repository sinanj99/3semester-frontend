import React, { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
function Forecast({
  notFound,
  setNotFound,
  setCity,
  city,
  facade,
  search,
  setSearch
}) {
  const match = useRouteMatch();
  /* for some reason i can't use the variables from css-file :-( */
  document.body.style.setProperty(
    "--snowy-day",
    "linear-gradient(to bottom, #c2dbff, #f0f0f0)"
  );
  document.body.style.setProperty(
    "--foggy-day",
    "linear-gradient(to bottom, #cdcdcd, #aacbe2)"
  );
  document.body.style.setProperty(
    "--cloudy-day",
    "linear-gradient(to bottom, #5494b2, #a5bdca)"
  );
  document.body.style.setProperty(
    "--clear-day",
    "linear-gradient(to bottom, #3da7f4, #a0d7ff)"
  );
  var bodyStyles = window.getComputedStyle(document.body);
  /* ------------------------------------------------------------------- */
  useEffect(() => {
    facade
      .fetchCityInfo(match.params.cityName)
      .then(data => {
        setNotFound(false);
        setCity(data);
        setSearch(match.params.cityName); // necessary if you type the city manually in the url
        document.body.style =
          "background: " + bodyStyles.getPropertyValue(getBackground(data));
      })
      .catch(e => setNotFound(true));
  }, []);

  return (
    <div>
      {notFound === true ? (
        <h1>404</h1>
      ) : (
        <div>
          <h1>{search}</h1>
          <Link to={match.url + "/info"} className="link-style">
            City Info
          </Link>
          {city !== "" && city !== undefined
            ? city.weatherList.map((w, i) => (
                <Link key={i} to={match.url + "/" + w.date}>
                  {w.date}
                </Link>
              ))
            : "Loading..."}
        </div>
      )}
      <br />
      <Link to="/search" className="link-style">
        Search
      </Link>
      <br />
      <br />
    </div>
  );
}
function getBackground(city) {
  let code;
  if (city !== null && city !== undefined && city !== "") {
    code = city.weatherList[0].weatherCode;
  }
  if (code >= 200 && code < 300) return "--thunderstorm";
  if (code >= 500 && code < 600) return "--cloudy-day";
  if (code >= 600 && code < 700) return "--snowy-day";
  if (code >= 700 && code < 800) return "--foggy-day";
  if (code == 800) return "--clear-day";
  else {
    return "--cloudy-day";
  }
}
export default Forecast;