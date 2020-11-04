import { PADDING, TICK_SIZE, POINT_RADIUS, FONT_HEIGHT } from './constants'

export class LineChartDrawer {
  constructor({
    canvas,
    minX,
    minY,
    maxX,
    maxY,
    unitsPerTickX,
    unitsPerTickY,
    showAxes
  }) {
    this.canvas = canvas
    this.minX = minX
    this.minY = minY
    this.maxX = maxX
    this.maxY = maxY
    this.unitsPerTickX = unitsPerTickX
    this.unitsPerTickY = unitsPerTickY

    this.padding = PADDING
    this.tickSize = TICK_SIZE
    this.pointRadius = POINT_RADIUS
    this.fontHeight = FONT_HEIGHT // prevent axes labels from getting cutoff

    this.context = this.canvas.getContext('2d')
    this.rangeX = this.maxX - this.minY
    this.rangeY = this.maxY - this.minY
    this.numXTicks = Math.round(this.rangeX / this.unitsPerTickX)
    this.numYTicks = Math.round(this.rangeY / this.unitsPerTickY)
    this.x = this.getLongestValueWidth() + this.padding * 2
    this.y = this.padding * 2
    this.width = this.canvas.width - this.x - this.padding * 2
    this.height = this.canvas.height - this.y - this.padding - this.fontHeight
    this.scaleX = this.width / this.rangeX
    this.scaleY = this.height / this.rangeY

    // draw x y axis and tick marks
    if (showAxes) {
      this.drawXAxis()
      this.drawYAxis()
    }
  }

  getLongestValueWidth() {
    this.context.font = this.font
    let longestValueWidth = 0
    for (let n = 0; n <= this.numYTicks; n++) {
      const value = this.maxY - n * this.unitsPerTickY
      longestValueWidth = Math.max(
        longestValueWidth,
        this.context.measureText(value).width
      )
    }
    return longestValueWidth
  }

  drawXAxis() {
    const context = this.context
    context.save()
    context.beginPath()
    context.moveTo(this.x, this.y + this.height)
    context.lineTo(this.x + this.width, this.y + this.height)
    context.lineWidth = 2
    context.stroke()

    // draw tick marks
    for (let n = 0; n < this.numXTicks; n++) {
      context.beginPath()
      context.moveTo(
        ((n + 1) * this.width) / this.numXTicks + this.x,
        this.y + this.height
      )
      context.lineTo(
        ((n + 1) * this.width) / this.numXTicks + this.x,
        this.y + this.height - this.tickSize
      )
      context.stroke()
    }

    // draw labels
    context.font = this.font
    context.fillStyle = 'black'
    context.textAlign = 'center'
    context.textBaseline = 'middle'

    for (let n = 0; n < this.numXTicks; n++) {
      const label = Math.round(((n + 1) * this.maxX) / this.numXTicks)
      context.save()
      context.translate(
        ((n + 1) * this.width) / this.numXTicks + this.x,
        this.y + this.height + this.padding
      )
      context.fillText(label, 0, 0)
      context.restore()
    }
    context.restore()
  }

  drawYAxis() {
    const context = this.context
    context.save()
    context.beginPath()
    context.moveTo(this.x, this.y)
    context.lineTo(this.x, this.y + this.height)
    context.lineWidth = 2
    context.stroke()
    context.restore()

    // draw tick marks
    for (let n = 0; n < this.numYTicks; n++) {
      context.beginPath()
      context.moveTo(this.x, (n * this.height) / this.numYTicks + this.y)
      context.lineTo(
        this.x + this.tickSize,
        (n * this.height) / this.numYTicks + this.y
      )
      context.stroke()
    }

    // draw values
    context.font = this.font
    context.fillStyle = 'black'
    context.textAlign = 'right'
    context.textBaseline = 'middle'

    for (let n = 0; n < this.numYTicks; n++) {
      const value = Math.round(this.maxY - (n * this.maxY) / this.numYTicks)
      context.save()
      context.translate(
        this.x - this.padding,
        (n * this.height) / this.numYTicks + this.y
      )
      context.fillText(value, 0, 0)
      context.restore()
    }
    context.restore()
  }

  drawLine(data, color, width) {
    const context = this.context
    context.save()
    this.transformContext()
    context.lineWidth = width
    context.strokeStyle = color
    context.fillStyle = color
    context.beginPath()
    context.moveTo(data[0].x * this.scaleX, data[0].y * this.scaleY)

    for (let n = 0; n < data.length; n++) {
      const point = data[n]

      // draw segment
      context.lineTo(point.x * this.scaleX, point.y * this.scaleY)
      context.stroke()
      context.closePath()
      context.beginPath()
      context.arc(
        point.x * this.scaleX,
        point.y * this.scaleY,
        this.pointRadius,
        0,
        2 * Math.PI,
        false
      )
      context.fill()
      context.closePath()

      // position for next segment
      context.beginPath()
      context.moveTo(point.x * this.scaleX, point.y * this.scaleY)
    }
    context.restore()
  }

  transformContext() {
    const context = this.context
    // move context to center of canvas
    this.context.translate(this.x, this.y + this.height)
    // invert the y scale so that it increments
    // as you move upwards
    context.scale(1, -1)
  }
}
