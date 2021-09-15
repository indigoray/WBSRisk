import * as React from "react";
import * as ReactDOM from "react-dom";
import WBSTree from "./WBSTree";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { AppContext } from "./../AppContext";

import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  ChartLegend,
} from "@progress/kendo-react-charts";
import "hammerjs";


const delayDays = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const workRiskProbability = [
  1, 1.2, 2, 4, 8, 12, 15, 17.2, 18, 16, 12, 8, 4, 1.5, 0.7, 0, 0,
];
const accumRiskProbability = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

function makeRiskProbabilities() {
  let sumProb = 0;
  for (var i = 0; i < 17; i++) {
    sumProb += workRiskProbability[i];
  }
  for (var i = 0; i < 17; i++) {
    workRiskProbability[i] /= sumProb;
    accumRiskProbability[i] =
      workRiskProbability[i] + (i > 0 ? accumRiskProbability[i - 1] : 0);
  }
}
makeRiskProbabilities();

const risks = [
  {
    risk: "폭우",
    riskId: 10001,
  },
  {
    risk: "민원",
    riskId: 10002,
  },
  {
    risk: "반입지연",
    riskId: 10003,
  },
];

const WorkRiskChart = (props) => {
  const { riskId, onRiskChange } = React.useContext(AppContext);
  const currentRisk = risks.find((item) => item.riskId === riskId);

  return (
    <>
      <div id="WorkRiskChart" className="workriskchart-page main-content">
        <div className="card-container grid">
          <h3 className="card-title">WBS Tree</h3>
          <div className="card-component">
            <WBSTree></WBSTree>
          </div>
        </div>
        <div className="card-container grid">
          <h3 className="card-title">Risk Distribution</h3>
          <div className="risktypes">
            <span>Risk Type </span>
            <DropDownList
              textField={"risk"}
              dataItemKey={"riskId"}
              data={risks}
              value={currentRisk}
              onChange={onRiskChange}
            />
          </div>
          <div className="card-component">
            <Chart
              style={{
                height: 350,
              }}
            >
              <ChartTitle text="지연 확률 분포(일)" />
              <ChartLegend position="top" orientation="horizontal" />
              <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={delayDays} startAngle={45} />
              </ChartCategoryAxis>
              <ChartSeries>
                <ChartSeriesItem
                  type="line"
                  data={workRiskProbability}
                  markers={{ visible: true }}
                  line={{ style: "smooth" }}
                />
                <ChartSeriesItem
                  type="column"
                  data={workRiskProbability}
                  markers={{ visible: true }}
                  line={{ style: "smooth" }}
                />
              </ChartSeries>
            </Chart>
            <Chart
              style={{
                height: 350,
              }}
            >
              <ChartTitle text="누적 확률 분포(일)" />
              <ChartLegend position="top" orientation="horizontal" />
              <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={delayDays} startAngle={45} />
              </ChartCategoryAxis>
              <ChartSeries>
                <ChartSeriesItem
                  type="line"
                  data={accumRiskProbability}
                  markers={{ visible: true }}
                  line={{ style: "smooth" }}
                />
                <ChartSeriesItem
                  type="column"
                  data={accumRiskProbability}
                  markers={{ visible: true }}
                  line={{ style: "smooth" }}
                />
              </ChartSeries>
            </Chart>
          </div>
        </div>
      </div>
    </>
  );
};
export default WorkRiskChart;
