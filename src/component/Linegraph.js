import React from "react";
import { Line } from "react-chartjs-2";

const Linegraph = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "600px",
        width: "600px",
        margin: "50px auto",
      }}
    >
      <Line
        data={{
          labels: props.dataLabeles.map((l) => l.substr(0, 10)),
          datasets: [
            {
              label: "Corona Cases ",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: props.dataGraphs,
            },
          ],
        }}
      />
    </div>
  );
};

export default Linegraph;
