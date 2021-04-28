import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const AnecdoteList = (props) =>{
    const anecdotes = props.anecdotes
    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        props.voteAnecdote(anecdote.id)
        props.setNotification(`you voted '${anecdote.content}'`, 3)
    }
    
    return (
      <div>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() =>vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
}

const mapStateToProps = (state) => {
  const anecdotes = state.anecdotes
  const filter = state.filter
  if (filter.filter ==="") 
    return {
      anecdotes:anecdotes
    }
  return { 
      anecdotes:anecdotes
          .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.filter.toLowerCase()))
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList