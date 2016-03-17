import React from 'react'
import TextField from 'material-ui/lib/text-field'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Slider from 'material-ui/lib/slider'
import RaisedButton from 'material-ui/lib/raised-button'
import AutoComplete from 'material-ui/lib/auto-complete'
import Colors from 'material-ui/lib/styles/colors'
import request from 'superagent'

const additionalData = [
  'Arts',
  'Climate', 'Commute Times', 'Country', 'Crime Rate',
  'Education',
  'Night Life',
  'Public Transporation',
  'Walkability'
]

const Search = React.createClass({
  getInitialState () {
    return {
      job: '',
      language: 1,
      rooms: 1,
      lifestyle: 1,
      downtown: 1
    }
  },

  // State handlers
  // TODO - are you fucking kidding me? Reduce!
  handleJob (e) {
    this.setState({job: e.target.value})
  },

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

  onSearch () {
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
        if (err != null) { console.log('handled') }

        let coords = {
          la: data.body[0].coords.la,
          lo: data.body[0].coords.lo
        }
        let copy = Object.assign({}, data.body)
        this.props.passData(coords, copy, data.body)
      })
  },

  render () {
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
            <tr>
              <td>
                Criteria
              </td>
              <td>
                <AutoComplete hintText='Additional criteria' filter={AutoComplete.fuzzyFilter} dataSource={additionalData}
                onNewRequest={(e) => { console.log('clicked', e) }} />
              </td>
            </tr>
          </table><br />
          <RaisedButton label='Search' primary={true} backgroundColor={Colors.blueA700} onClick={this.onSearch}/>
        </center><br />
      </div>
    )
  }
})

export default Search
