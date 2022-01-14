import AnyTouch from 'any-touch'
let config = { scale: 1, top: 0, left: 0, angle: 0 }

function zoom (target, scale) {
  var timer = null

  function _timerStart () {
    timer = setInterval(_draw, 100);
  }

  function _timerEnd () {
    clearInterval(timer)
    timer = null
  }

  function _draw () {
    config.scale += scale
    draw()
  }

  return {
    onTap: function (e) {
      e.preventDefault()
      target.setAttribute('style', `background-position-x: -100%`)
      _draw()
      setTimeout(() => {
        target.setAttribute('style', `background-position-x: 0`)
      }, 100)
    },
    onPress: function (e) {
      e.preventDefault()
      target.setAttribute('style', `background-position-x: -100%`)
      _timerStart()
    },
    onPressUp: function (e) {
      e.preventDefault()
      target.setAttribute('style', `background-position-x: 0`)
      _timerEnd()
    }
  }
}

function trans (target, direction) {
  var timer = null

  function _timerStart () {
    timer = setInterval(_draw, 100);
  }

  function _timerEnd () {
    clearInterval(timer)
    timer = null
  }

  function _draw () {
    switch (direction) {
      case 'left':
        config.left -= 1
        break
      case 'right':
        config.left += 1
        break
      case 'up':
        config.top -= 1
        break
      case 'down':
        config.top += 1
        break
      default:
        break;
    }
    draw()
  }

  return {
    onTap: function (e) {
      e.preventDefault()
      target.setAttribute('style', `background-position-x: ${transBtnBg[direction]}`)
      _draw()
      setTimeout(() => {
        target.setAttribute('style', `background-position-x: 0;`)
      }, 100)
    },
    onPress: function (e) {
      e.preventDefault()
      target.setAttribute('style', `background-position-x: ${transBtnBg[direction]}`)
      _timerStart()
    },
    onPressUp: function (e) {
      e.preventDefault()
      target.setAttribute('style', `background-position-x: 0;`)
      _timerEnd()
    } 
  }
}

function init () {
  const btnZoomIn = document.querySelector('.btn-zoom-in')
  const btnZoomOut = document.querySelector('.btn-zoom-out')
  const transBtn = document.querySelector('.translate-buttons')
  const btnTransLeft = document.querySelector('.btn-left')
  const btnTransUp = document.querySelector('.btn-up')
  const btnTransRight = document.querySelector('.btn-right')
  const btnTransdown = document.querySelector('.btn-down')

  const zoomInAt = new AnyTouch(btnZoomIn)
  const zoomInObj = zoom(btnZoomIn, 0.1)
  zoomInAt.on('tap', zoomInObj.onTap)
  zoomInAt.on('press', zoomInObj.onPress)
  zoomInAt.on('pressup', zoomInObj.onPressUp)

  const zoomOutAt = new AnyTouch(btnZoomOut)
  const zoomOutObj = zoom(btnZoomOut, -0.1)
  zoomOutAt.on('tap', zoomOutObj.onTap)
  zoomOutAt.on('press', zoomOutObj.onPress)
  zoomOutAt.on('pressup', zoomOutObj.onPressUp)

  const transLeft = new AnyTouch(btnTransLeft)
  const transLeftObj = trans(transBtn, 'left')
  transLeft.on('tap', transLeftObj.onTap)
  transLeft.on('press', transLeftObj.onPress)
  transLeft.on('pressup', transLeftObj.onPressUp)

  const transUp = new AnyTouch(btnTransUp)
  const transUpObj = trans(transBtn, 'up')
  transUp.on('tap', transUpObj.onTap)
  transUp.on('press', transUpObj.onPress)
  transUp.on('pressup', transUpObj.onPressUp)

  const transRight = new AnyTouch(btnTransRight)
  const transRightObj = trans(transBtn, 'right')
  transRight.on('tap', transRightObj.onTap)
  transRight.on('press', transRightObj.onPress)
  transRight.on('pressup', transRightObj.onPressUp)

  const transDown = new AnyTouch(btnTransdown)
  const transDownObj = trans(transBtn, 'down')
  transDown.on('tap', transDownObj.onTap)
  transDown.on('press', transDownObj.onPress)
  transDown.on('pressup', transDownObj.onPressUp)
}
