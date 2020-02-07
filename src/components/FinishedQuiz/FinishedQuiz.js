import React from 'react'
import classes from './FinishedQuiz.module.css'

const FinishedQuiz = props => {
  console.log(props)
  console.log(classes)
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++
    }

    return total
  }, 0)
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          const cls = [
            'fa',
            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[props.results[quizItem.id]]
          ]
          // debugger
          return (
            <li key={index}>
              <strong>{index + 1}</strong>.&nbsp;
              {quizItem.question}
              <i className={cls.join(' ')} />
            </li>
          )
        })}
        {/*<li>*/}
        {/*  <strong>1. </strong>*/}
        {/*  How are you?*/}
        {/*  <i className={'fa fa-times ' + classes.error} />*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*  <strong>2. </strong>*/}
        {/*  How are you?*/}
        {/*  <i className={'fa fa-check ' + classes.success} />*/}
        {/*</li>*/}
      </ul>

      <p>Правильно {successCount} из {props.quiz.length}</p>

      <div>
        <button onClick={props.onRetry}>Повторить</button>
      </div>
    </div>
  )
}

export default FinishedQuiz