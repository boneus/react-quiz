import React, {Component} from 'react';
import axios from 'axios'
import classes from './QuizList.module.css'
import {NavLink} from "react-router-dom"

class QuizList extends Component {

  state = {
    quizes: []
  }

  renderQuizes() {
    return this.state.quizes.map(quiz => {
      return (
        <li
          key={quiz.id}
        >
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  async componentDidMount() {
    try {
      const response = await axios.get('https://react-quiz-cc091.firebaseio.com/quizzes.json')

      const quizes = []

      Object.keys(response.data).map((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        })
      })

      this.setState({
        quizes
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>

          <ul>
            {this.renderQuizes()}
          </ul>
        </div>
      </div>
    );
  }
}

export default QuizList;