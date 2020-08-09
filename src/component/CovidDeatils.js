import React from "react";
import NumberFormat from "react-number-format";
import Card from "./Card";

const CovidDeatils = (props) => {
  const { totalconfirm, totalrecover, totaldeath, country } = props;
  return (
    <div>
      <h1 style={{ textTransform: "capitalize" }}>
        {country === "" ? "Worldwide Corona Report" : country}
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card>
          <span>Total Confirmed</span>
          <br />
          <span>
            <NumberFormat
              value={totalconfirm}
              displayType={"text"}
              thousandSeparator={true}
            />
          </span>
        </Card>
        <Card>
          <span>Total Recovered</span>
          <br />
          <span>
            <NumberFormat
              value={totalrecover}
              displayType={"text"}
              thousandSeparator={true}
            />
          </span>
        </Card>
        <Card>
          <span>Total Deaths</span>
          <br />
          <span>
            <NumberFormat
              value={totaldeath}
              displayType={"text"}
              thousandSeparator={true}
            />
          </span>
        </Card>
      </div>
    </div>
  );
};

export default CovidDeatils;
