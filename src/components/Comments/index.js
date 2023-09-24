import {Component} from 'react'

import {v4} from 'uuid'

import Kishore from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentItem: [],
    name: '',
    comment: '',
  }

  onChangeCommentInput = event => {
    this.setState({
      comment: event.target.value,
    })
  }

  onChangeNameInput = event => {
    this.setState({
      name: event.target.value,
    })
  }

  onAdd = event => {
    event.preventDefault()

    const {name, comment} = this.state

    const back = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name,
      comment,
      date: new Date(),
      initialClassName: back,
      isLiked: false,
    }
    this.setState(prevState => ({
      name: '',
      comment: '',
      commentItem: [...prevState.commentItem, newComment],
    }))
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentItem: prevState.commentItem.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = commentId => {
    const {commentItem} = this.state

    this.setState({
      commentItem: commentItem.filter(comment => comment.id !== commentId),
    })
  }

  render() {
    const {commentItem, name, comment} = this.state
    return (
      <div className="bg1">
        <div className="bg2">
          <h1 className="h1">Comments</h1>

          <div className="bg3">
            <form className="form" onSubmit={this.onAdd}>
              <p className="p"> Say something about 4.0 Technologies</p>
              <input
                type="text"
                className="nameInput"
                placeholder="Your Name"
                onChange={this.onChangeNameInput}
                value={name}
              />
              <textarea
                className="text"
                placeholder="Your Comment"
                onChange={this.onChangeCommentInput}
                value={comment}
              />
              <button className="btn" type="submit">
                Add Comment
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="img1"
            />
          </div>

          <hr className="line" />

          <p className="v">
            <span className="span">{commentItem.length}</span> Comments
          </p>

          <ul className="ul">
            {commentItem.map(each => (
              <Kishore
                key={each.id}
                comments={each}
                onLike={this.toggleIsLiked}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
