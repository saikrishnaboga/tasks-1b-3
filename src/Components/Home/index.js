import {v4 as uuidv4} from 'uuid'
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

const Tag = props => {
  const {tagDetails, tagClick} = props
  const {optionId, displayText} = tagDetails

  const onClickButton = () => {
    tagClick(optionId)
  }

  return (
    <li>
      <button type="button" onClick={onClickButton}>
        {displayText}
      </button>
    </li>
  )
}

const Task = props => {
  const {details} = props
  const {tag, inputText} = details

  return (
    <li className="tasks-section">
      <p>{tag}</p>
      <p>{inputText}</p>
    </li>
  )
}

class Home extends Component {
  state = {
    tag: tagsList[0].optionId,
    inputText: '',
    isClick: false,
    taskLists: [],
    id: '',
  }

  submitForm = event => {
    event.preventDefault()
    const {tag, inputText} = this.state
    const object = {tag, inputText, id: uuidv4()}
    this.setState(prevState => ({
      taskLists: [...prevState.taskLists, object],
      inputText: '',
    }))
  }

  onChangeTags = event => {
    this.setState({
      tag: event.target.value,
    })
  }

  onChangeInputText = event => {
    this.setState({
      inputText: event.target.value,
    })
  }

  tagClick = id => {
    console.log(id)
    this.setState(prevState => ({
      id,
      isClick: !prevState.isClick,
    }))
  }

  render() {
    const {inputText, taskLists, isClick, id} = this.state
    const tabsList = taskLists.filter(each => each.tag === id)
    const isClickList = isClick ? (
      <ul>
        {tabsList.map(each => (
          <Task details={each} key={each.id} />
        ))}
      </ul>
    ) : (
      <ul>
        <h1>Tasks</h1>
        {taskLists.map(each => (
          <Task details={each} key={each.id} />
        ))}
      </ul>
    )
    return (
      <div className="app-container">
        <div className="add-container">
          <h1>Create a task!</h1>
          <form onSubmit={this.submitForm}>
            <label htmlFor="task">Task</label>
            <input
              type="text"
              id="task"
              placeholder="Enter the task here"
              onChange={this.onChangeInputText}
              value={inputText}
            />
            <br />
            <label htmlFor="tag">Tags</label>
            <select onChange={this.onChangeTags}>
              {tagsList.map(each => (
                <Option tagDetails={each} key={each.optionId} />
              ))}
            </select>
            <button type="submit">Add Task</button>
          </form>
        </div>
        <div>
          <div className="show-container">
            <h1>Tags</h1>
            <ul>
              {tagsList.map(each => (
                <Tag
                  tagDetails={each}
                  key={each.optionId}
                  tagClick={this.tagClick}
                />
              ))}
            </ul>
          </div>
          <div>
            {taskLists.length === 0 ? <p>No Tasks Added Yet</p> : isClickList}
          </div>
        </div>
      </div>
    )
  }
}
export default Home
