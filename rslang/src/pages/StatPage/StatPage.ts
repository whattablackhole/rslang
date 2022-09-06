/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

/* eslint-disable no-unused-vars */

import { Chart, ChartItem, registerables } from "chart.js";

export class StatPage {
    init = (): void => {
      this.drawPage();
      const xValues:number[] = [50,60,70,80,90,100,110,120,130,140,150];
      const yValues:number[] = [7,8,8,9,9,9,10,11,14,14,15];

      const ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d') as ChartItem;
      Chart.register(...registerables);

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unused-vars
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      label: 'Learned words',
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 6, max:16}}],
    }
  }
});
};
  
    drawPage = (): void => {
      const mainEl = document.querySelector("main") as HTMLElement;
      mainEl.className = "main";
      mainEl.innerHTML = `<div class="main__container statistics__container">
        <div class="statistics__title">
          <h2>Statistics</h2>
        </div>
        <div class="statistic__content">
          <h2 class="stat-date">Today</h2>
          <div class="statistic__wrapper">
            <div class="statistic-item counter-item">
              <p class="words-count learned">0</p>
              <p class="words-text">words<br> were learned</p>
            </div>
            <div class="statistic-item">
              <p class="item-statistic__accuracy">Accuracy</p>
              <p class="item-statistic__percentage">100%</p>
            </div>
            <div class="statistic-item">
              <p class="statistic-item__title">Sprint</p>
              <div class="item-audiocall__statistic">
                <div>
                  <span>0%</span>
                  <span>words</span>
                </div>
                <div>
                  <span>0%</span>
                  <span>accuracy</span>
                </div>
                <div>
                  <span>0%</span>
                  <span>in a row</span>
                </div>
              </div>
            </div>
            <div class="statistic-item">
              <p class="statistic-item__title">Audiocall</p>
              <div class="item-audiocall__statistic">
              <div>
              <span>0%</span>
              <span>words</span>
            </div>
            <div>
              <span>0%</span>
              <span>accuracy</span>
            </div>
            <div>
              <span>0%</span>
              <span>in a row</span>
            </div>
              </div>
            </div>
          </div>
          
        </div>
        <div class="average__wrapper">
          <h2 class="stat-date">All time</h2>
          <canvas id="myChart" width="400" height="400"></canvas>
        </div>
      </div>
      `
  }
}



