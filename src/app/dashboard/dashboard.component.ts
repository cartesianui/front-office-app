import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@cartesianui/common';
import { ChartConfiguration } from 'chart.js';

const chartConfig: ChartConfiguration = {
  options: { legend: { display: false } }
};

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  user = {
    firstName: 'Jake'
  };
  welcomeMessage = 'Hello';

  months = ['January', 'February', 'March', 'April', 'May', 'June'];
  balances = [100, 200, 150, 250, 350, 300];
  views = [425, 631, 908, 1855, 2995, 4091];
  clicks = [98, 155, 354, 850, 1144, 1712];

  private getChange = (arr: number[]) => arr[arr.length - 1] - arr[arr.length - 2];
  balanceChange = this.getChange(this.balances);
  viewsChange = this.getChange(this.views);
  clicksChange = this.getChange(this.clicks);
  currentBalance = this.balances[this.balances.length - 1];
  currentViews = this.views[this.views.length - 1];
  currentClicks = this.clicks[this.clicks.length - 1];

  getChangeClass = (v: number) => (v > 0 ? 'text-success' : v < 0 ? 'text-danger' : 'text-muted');

  balanceChart: ChartConfiguration = {
    data: {
      labels: this.months,
      datasets: [
        {
          label: 'Balance',
          data: this.balances
        }
      ]
    },
    type: 'line',
    options: { ...chartConfig.options }
  };

  viewsChart: ChartConfiguration = {
    data: {
      labels: this.months,
      datasets: [
        {
          label: 'Views',
          data: this.views
        }
      ]
    },
    type: 'bar',
    options: { ...chartConfig.options }
  };

  clicksChart: ChartConfiguration = {
    data: {
      labels: this.months,
      datasets: [
        {
          label: 'Clicks',
          data: this.clicks
        }
      ]
    },
    type: 'line',
    options: { ...chartConfig.options }
  };

  clients = [
    {
      picture: 'https://i.pravatar.cc/48',
      name: 'Alex',
      tasks: {
        completed: Math.ceil(Math.random() * 8),
        total: 8
      },
      rating: 4
    },
    {
      picture: 'https://i.pravatar.cc/49',
      name: 'Cindy',
      tasks: {
        completed: Math.ceil(Math.random() * 5),
        total: 5
      },
      rating: 3.5
    },
    {
      picture: 'https://i.pravatar.cc/47',
      name: 'Travis',
      tasks: {
        completed: Math.ceil(Math.random() * 2),
        total: 2
      },
      rating: 4.9
    }
  ];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    const h = new Date().getHours();
    this.welcomeMessage = h < 4 ? 'Night Owl Huh? Hello' : h < 11 ? 'Good Morning' : h < 16 ? 'Good Afternoon' : 'Good Evening';
  }
}
