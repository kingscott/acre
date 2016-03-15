import React from 'react'
import GoogleMap from 'google-map-react'

const Map = React.createClass({
  // getInitialState () {
  //   return {
  //     la: 43.701100,
  //     lo: -79.416300
  //   }
  // },

  _onChildClick (key, childProps) {
    // Do something with the dom here
    // Figure out what to do with the different elements
    var dataPoint = this.state.myCopy[key]

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
    console.log('from map', this.props.la, this.props.lo)
    const center = [this.props.la, this.props.lo]
    const zoom = 1
    const l1 = this.props.la
    const l2 = this.props.lo
    return (
      <div style={{width: '100%', height: '1000px'}}>
        <GoogleMap lat={l1} lng={l2} center={center} zoom={zoom} onChildMouseEnter={this._onChildMouseEnter}
        onChildMouseLeave={this._onChildMouseLeave} onChildClick={this._onChildClick}>
          {this.props.newData}
        </GoogleMap>
      </div>
    )
  }
})

export default Map
