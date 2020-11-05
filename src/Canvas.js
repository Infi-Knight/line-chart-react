import React, { useRef, useEffect } from 'react'

import { DEFAULT_LINE_STYLES } from './constants'
import { LineChartDrawer } from './LineChartDrawer'
import { scaleCanvasForHiDpi } from './scalefix'

export const Canvas = ({ chartConfig, chartItems }) => {
  const { id, height, width, ...lineChartDrawerInput } = chartConfig

  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current

    // scale the canvas appropriately for retina screens
    scaleCanvasForHiDpi(canvas, height, width)

    const lineChartDrawer = new LineChartDrawer({
      ...lineChartDrawerInput,
      canvas
    })

    chartItems.forEach((item) => {
      const {
        points,
        styles: { lineColor, lineWidth } = { ...DEFAULT_LINE_STYLES }
      } = item
      lineChartDrawer.drawLine(points, lineColor, lineWidth)
    })
  }, [LineChartDrawer, chartConfig, chartItems, scaleCanvasForHiDpi])

  return <canvas id={id} height={height} width={width} ref={canvasRef} />
}
