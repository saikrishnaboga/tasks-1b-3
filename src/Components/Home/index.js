import {Component} from 'react'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

const Option = props => {
  const {tagDetails} = props
  const {optionId, displayText} = tagDetails
  return <option value={optionId}>{displayText}</option>
}

class Home extends Component {

  submitForm = () =>

  render() {
    return (
      <div className="app-container">
        <div className="add-container">
          <h1>Create a task!</h1>
          <form onSubmit={this.submitForm}>
            <label htmlFor="task">Task</label>
            <input type="text" id="task" placeholder="Enter the task here" />
            <br />
            <label htmlFor="tag">Tags</label>
            <select>
              {tagsList.map(each => (
                <Option tagDetails={each} key={each.optionId} />
              ))}
            </select>
            <button type="submit">Add Task</button>
          </form>
        </div>

        <div className="show-container">
          <h1>Tags</h1>
          {tagsList.map(each => (
            <button type="button">{each.displayText}</button>
          ))}
        </div>
      </div>
    )
  }
}
export default Home
