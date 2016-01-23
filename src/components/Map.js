import React from 'react'
import GoogleMap from 'google-map-react'
import TextField from 'material-ui/lib/text-field'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Slider from 'material-ui/lib/slider'
import Toggle from 'material-ui/lib/toggle'
import RaisedButton from 'material-ui/lib/raised-button'

let places = (
  <div lat={43.701100} lng={-79.416300}>Waterloo</div>
)

const Map = React.createClass({
  getInitialState () {
    return {
      la: 43.701100,
      lo: -79.416300,
      job: '',
      language: 1,
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

  onSearch () {
    console.log(this.state)
    let stuff = [{'cityName': 'waterloo', 'grossSalary': '50000', 'image': '...', 'rent': '500', 'disposableIncome': '12500', 'coords': {'la': '1', 'lo': '2'}}, {'cityName': 'hamilton', 'grossSalary': '5000', 'image': '...', 'rent': '500', 'disposableIncome': '12500', 'coords': {'la': '43', 'lo': '-79'}}]
    this.state.newData = stuff.map((e, i) => {
      return <div key={i} lat={parseFloat(e.coords.la)} lng={parseFloat(e.coords.lo)}>{e.cityName}</div>
    })
    this.setState({la: parseFloat(stuff[0].coords.la), lo: parseFloat(stuff[0].coords.lo)})
  },

  render () {
    const center = [this.state.la, this.state.lo]
    const zoom = 1
    return (
      <div>
        <center>
          <table>
            <tr>
              <td>
                Job Title
              </td>
              <td>
                &nbsp;<TextField hintText='ex. Software Developer' value={this.state.job} onChange={this.getJob}/><br />
              </td>
            </tr>
            <tr>
              <td style={{paddingTop: '10px'}}>
                Language
              </td>
              <td>
                &nbsp;<SelectField value={this.state.language.value} onChange={this.handleChange}>
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
                &nbsp;<Slider defaultValue={this.state.popDensity} value={this.state.popDensity} step={0.1}/>
              </td>
            </tr>
            <tr>
              <td>
                1 or 3 rooms?
              </td>
              <td>
                <Toggle name='Housing' value='3' />
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
          <GoogleMap id='googs' lat={this.state.la} lng={this.state.lo} center={this.state.center} zoom={zoom}>
            {this.state.newData}
          </GoogleMap>
        </div>
      </div>
    )
  }
})

export default Map
