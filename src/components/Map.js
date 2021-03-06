import React from 'react'
import GoogleMap from 'google-map-react'

const Map = React.createClass({
  _onChildClick (key, childProps) {
    // Do something with the dom here
    // Figure out what to do with the different elements
    var dataPoint = this.props.copy[key]

    document.getElementById('banner-complete').style.background = 'url(' + dataPoint.image + ')'
    document.getElementById('my-description').innerHTML = dataPoint.description
    document.getElementById('my-title').innerHTML = dataPoint.name

    document.getElementById('1bed').innerHTML = dataPoint.apartment_1_outside + ' / ' + dataPoint.apartment_1
    document.getElementById('3bed').innerHTML = dataPoint.apartment_3_outside + ' / ' + dataPoint.apartment_3
    document.getElementById('mcd').innerHTML = dataPoint.eat_out_price
    document.getElementById('pop').innerHTML = dataPoint.density + ' /km squared '

    // Basically, start pulling shit out and going to town
    var floaterCard = document.getElementById('floater-card')

    document.getElementById('overlay').style.display = 'block'
    floaterCard.style.display = 'block'
  },

  render () {
    const center = [this.props.la, this.props.lo]
    const zoom = 1
    return (
      <div style={{width: '100%', height: '1000px'}}>
        <GoogleMap lat={this.props.la} lng={this.props.lo} center={center} zoom={zoom} onChildMouseEnter={this._onChildMouseEnter}
        onChildMouseLeave={this._onChildMouseLeave} onChildClick={this._onChildClick}>
          {this.props.data}
        </GoogleMap>
      </div>
    )
  }
})

export default Map
