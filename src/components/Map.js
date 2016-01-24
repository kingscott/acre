import React from 'react'
import GoogleMap from 'google-map-react'
import TextField from 'material-ui/lib/text-field'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Slider from 'material-ui/lib/slider'
import RaisedButton from 'material-ui/lib/raised-button'
import Colors from 'material-ui/lib/styles/colors'
import request from 'superagent'

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: 60,
  height: 20,
  left: -40 / 2,
  top: -40 / 2,

  border: '2px solid #f44336',
  borderRadius: 30,
  backgroundColor: 'white',
  color: '#3f51b5',
  fontSize: 14,
  fontWeight: 'bold',
  margin: 4,
  textAlign: 'center'
}

const Map = React.createClass({
  getInitialState () {
    return {
      la: 43.701100,
      lo: -79.416300,
      job: '',
      language: 1,
      rooms: 1,
      lifestyle: 1,
      downtown: 1
    }
  },

  handleJob (e) {
    this.setState({job: e.target.value})
  },

  // language handler
  handleChange (e, index, language) {
    this.setState({language})
  },

  handleRooms (e, index, rooms) {
    this.setState({rooms})
  },

  handleSlider (e, value) {
    this.setState({value})
  },

  handleLifestyle (e, index, lifestyle) {
    this.setState({lifestyle})
  },

  handleDowntown (e, index, downtown) {
    this.setState({downtown})
    console.log(e)
  },

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

  onSearch () {
    console.log(this.state)
    // let stuff = [{'cityName': 'Toronto', 'grossSalary': '50000', 'image': '...', 'rent': '500', 'disposableIncome': '12500', 'coords': {'la': '1', 'lo': '2'}}, {'cityName': 'Hamilton', 'grossSalary': '5000', 'image': '...', 'rent': '500', 'disposableIncome': '12500', 'coords': {'la': '43.7001100', 'lo': '-79.4163000'}}]
    // this.state.newData = stuff.map((e, i) => {
    //   return <div style={greatPlaceStyle} key={i} lat={parseFloat(e.coords.la)} lng={parseFloat(e.coords.lo)}>{e.cityName}</div>
    // })
    // this.setState({la: parseFloat(stuff[0].coords.la), lo: parseFloat(stuff[0].coords.lo)})
    let data = {
      jobTitle: this.state.job,
      language: this.state.language === 1 ? 'EN' : 'FR',
      housing: {
        lifestyle: this.state.lifestyle === 2,
        bedrooms: this.state.rooms === 2 ? 3 : 1,
        downtown: this.state.downtown === 2
      }
    }

    request
      .post('http://localhost:8080/compute')
      .send(data)
      .end((err, data) => {
        if (err != null) {
          console.log('handled')
        }
        // console.log(data.body)

        this.setState({la: data.body[0].coords.la, lo: data.body[0].coords.lo})
        this.state.newData = data.body.map((e, i) => {
          return <div style={greatPlaceStyle} key={i} lat={e.coords.la} lng={e.coords.lo}>{e.cityName}</div>
        })
        let copy = Object.assign({}, data.body)
        console.log(copy)
        this.setState({myCopy: data.body})
        this.forceUpdate()
      })
  },

  render () {
    const center = [this.state.la, this.state.lo]
    const zoom = 1
    return (
      <div>
        <header style={{marginTop: '-20px', color: Colors.green800, borderBottom: '1px solid black', fontFamily: 'Pacifico', fontSize: '35px'}}>acre.</header><br />
        <center style={{
          position: 'absolute',
          left: 0,
          backgroundColor: '#FFF',
          zIndex: '1',
          height: '370px',
          overflowY: 'auto',
          border: '1px solid black',
          paddingBottom: '25px',
          top: '89px'
        }}>
          <table>
            <tr>
              <td>
                Job Title
              </td>
              <td>
                <TextField hintText='ex. Software Developer' value={this.state.job} onChange={this.handleJob}/><br />
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
                <Slider style={{marginBottom: '0px'}} min={500} max={3000} defaultValue={700} value={this.state.value} step={0.1} onChange={this.handleSlider} />
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
                <SelectField value={this.state.lifestyle} onChange={this.handleLifestyle}>
                  <MenuItem value={1} primaryText='Conservative' />
                  <MenuItem value={2} primaryText='Lofty' />
                </SelectField>
              </td>
            </tr>
            <tr>
              <td>
                Downtown
              </td>
              <td>
                <SelectField value={this.state.downtown} style={{underlineStyle: Colors.deepOrange500}} onChange={this.handleDowntown}>
                  <MenuItem value={1} primaryText='No' />
                  <MenuItem value={2} primaryText='Yes' />
                </SelectField>
              </td>
            </tr>
          </table><br />
          <RaisedButton label='Search' primary={true} backgroundColor={Colors.blueA700} onClick={this.onSearch}/>
        </center><br />
        <div style={{width: '100%', height: '1000px'}}>
          <GoogleMap lat={this.state.la} lng={this.state.lo} center={center} zoom={zoom} onChildMouseEnter={this._onChildMouseEnter}
          onChildMouseLeave={this._onChildMouseLeave} onChildClick={this._onChildClick}>
            {this.state.newData}
          </GoogleMap>
        </div>
      </div>
    )
  }
})

export default Map
