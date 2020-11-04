import React, { useRef, useEffect } from 'react'

import { DEFAULT_LINE_STYLES } from './constants'
import { LineChartDrawer } from './LineChartDrawer'

export const Canvas = ({ chartConfig, chartItems }) => {
  const { id, height, width, ...lineCharDrawerInput } = chartConfig

  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const lineChartDrawer = new LineChartDrawer({
      ...lineCharDrawerInput,
      canvas
    })

    chartItems.forEach((item) => {
      const {
        points,
        styles: { lineColor, lineWidth } = { ...DEFAULT_LINE_STYLES }
      } = item
      lineChartDrawer.drawLine(points, lineColor, lineWidth)
    })
  }, [LineChartDrawer, chartConfig, chartItems])

  return <canvas id={id} height={height} width={width} ref={canvasRef} />
}
