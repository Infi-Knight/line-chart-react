import React from 'react'

import LineChart from '@infi-knight/line-chart-react'

const chartConfig = {
  id: 'myCanvas',
  minX: 0,
  maxX: 150,
  minY: 0,
  maxY: 120,
  height: 500,
  width: 500,
  unitsPerTickX: 10,
  unitsPerTickY: 10,
  showAxes: true
}

const chartItems = [
  {
    styles: { lineColor: 'blue', lineWidth: 2 },
    points: [
      {
        x: 0,
        y: 0
      },
      {
        x: 20,
        y: 10
      },
      {
        x: 40,
        y: 15
      },
      {
        x: 60,
        y: 40
      },
      {
        x: 80,
        y: 60
      },
      {
        x: 100,
        y: 50
      },
      {
        x: 120,
        y: 85
      },
      {
        x: 140,
        y: 100
      }
    ]
  },
  {
    styles: { lineColor: 'red', lineWidth: 8 },
    points: [
      {
        x: 20,
        y: 85
      },
      {
        x: 40,
        y: 75
      },
      {
        x: 60,
        y: 75
      },
      {
        x: 80,
        y: 45
      },
      {
        x: 100,
        y: 65
      },
      {
        x: 120,
        y: 40
      },
      {
        x: 140,
        y: 35
      }
    ]
  }
]

const App = () => {
  return <LineChart chartItems={chartItems} chartConfig={chartConfig} />
}

export default App
