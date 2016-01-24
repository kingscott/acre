import React from 'react'
import GoogleMap from 'google-map-react'
import TextField from 'material-ui/lib/text-field'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Slider from 'material-ui/lib/slider'
import Toggle from 'material-ui/lib/toggle'
import RaisedButton from 'material-ui/lib/raised-button'
// import {superagent as request} from 'superagent'

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: 40,
  height: 40,
  left: -40 / 2,
  top: -40 / 2,

  border: '5px solid #f44336',
  borderRadius: 40,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4
}

const Map = React.createClass({
  getInitialState () {
    return {
      la: 43.701100,
      lo: -79.416300,
      job: '',
      language: 1,
      rooms: 1,
      popDensity: 0.3,
      newData: []
    }
  },

  getJob (e) {
    this.setState({job: e.target.value})
  },

  getPopDensity (value) {
    console.log(value)
  },

  // language handler
  handleChange (e, index, language) {
    this.setState({language})
  },

  handleRooms (e, index, rooms) {
    this.setState({rooms})
  },

  handleSlider (e) {
    console.log(e)
  },

  onSearch () {
    console.log(this.state)
    let stuff = [{'cityName': 'Toronto', 'grossSalary': '50000', 'image': '...', 'rent': '500', 'disposableIncome': '12500', 'coords': {'la': '1', 'lo': '2'}}, {'cityName': 'hamilton', 'grossSalary': '5000', 'image': '...', 'rent': '500', 'disposableIncome': '12500', 'coords': {'la': '43.7001100', 'lo': '-79.4163000'}}]
    this.state.newData = stuff.map((e, i) => {
      return <div style={greatPlaceStyle} key={i} lat={parseFloat(e.coords.la)} lng={parseFloat(e.coords.lo)}>{e.cityName}</div>
    })
    this.setState({la: parseFloat(stuff[0].coords.la), lo: parseFloat(stuff[0].coords.lo)})
  },

  render () {
    const center = [this.state.la, this.state.lo]
    const zoom = 1
    return (
      <div>
        <header style={{marginTop: '-20px', borderBottom: '1px solid black', fontFamily: 'Pacifico', fontSize: '35px'}}>acre.</header><br />
        <center>
          <table>
            <tr>
              <td>
                Job Title
              </td>
              <td>
                <TextField hintText='ex. Software Developer' value={this.state.job} onChange={this.getJob}/><br />
              </td>
            </tr>
            <tr>
              <td style={{paddingTop: '10px'}}>
                Language
              </td>
              <td>
                <SelectField value={this.state.language} onChange={this.handleChange}>
                  <MenuItem value={1} primaryText='English' />
                  <MenuItem value={2} primaryText='French' />
                </SelectField>
              </td>
            </tr>
            <tr>
              <td>
                Population Density
              </td>
              <td>
                <Slider min={500} max={3000} value={this.state.popDensity} step={0.1} onChange={this.handleSlider} />
              </td>
            </tr>
            <tr>
              <td>
                No. of Rooms
              </td>
              <td>
                <SelectField value={this.state.rooms} onChange={this.handleRooms}>
                  <MenuItem value={1} primaryText='1' />
                  <MenuItem value={2} primaryText='3' />
                </SelectField>
              </td>
            </tr>
            <tr>
              <td>
                Lifestyle
              </td>
              <td>
                <Toggle name='Lifestyle' value='lofty' />
              </td>
            </tr>
          </table><br />
          <RaisedButton label='Search' primary={true} onClick={this.onSearch}/>
        </center><br />
        <div style={{width: '100%', height: 400}}>
          <GoogleMap lat={this.state.la} lng={this.state.lo} center={center} zoom={zoom}>
            {this.state.newData}
          </GoogleMap>
        </div>
      </div>
    )
  }
})

export default Map
