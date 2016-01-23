import React from 'react'
import GoogleMap from 'google-map-react'
import TextField from 'material-ui/lib/text-field'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Slider from 'material-ui/lib/slider'
import Toggle from 'material-ui/lib/toggle'

const Map = React.createClass({
  getInitialState () {
    return {
      la: 43.701100,
      lo: -79.416300,
      job: '',
      language: 1,
      popDensity: 0.3,

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
                &nbsp;<TextField hintText='ex. Software Developer' value={this.state.job}/><br />
              </td>
            </tr>
            <tr>
              <td style={{paddingTop: '10px'}}>
                Language
              </td>
              <td>
                &nbsp;<SelectField value={this.state.language} onChange={this.handleChange}>
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
                &nbsp;<Slider defaultValue={this.state.popDensity} value={this.state.popDensity} step={0.1} onChange={getPopDensity()}/>
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
          </table>
        </center>
        <div style={{width: '100%', height: 400}}>
          <GoogleMap lat={this.state.la} lng={this.state.lo} center={center} zoom={zoom}/>
        </div>
      </div>
    )
  }
})

export default Map
