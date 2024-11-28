import { Component } from "react"

const myKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ4N2U2MzA2ZmM4YzAwMTU2Yjg3MzMiLCJpYXQiOjE3MzI4MDQxOTUsImV4cCI6MTczNDAxMzc5NX0.37gvr-YkmkWAFXU_ISszQ6B-ww7xN8ZVgV4JY_jAs0g"
class Comment extends Component {
    state = {
        comments: []
    };

    getComm = () => {
        fetch("https://striveschool-api.herokuapp.com/api/comments/" + this.props.id,
            {
            headers: {
                Authorization: myKey,
                "Content-Type": "application/json",

            },
        }
    )
        .then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error ("Errore");
            }

        })
        .then((arrayOfComments) => {
            this.setState({
                comments: arrayOfComments,
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
    componentDidMount() {
        this.getComm()
    }
    render () {
        const {comments} = this.state
        return (
            <>
            <h5>Commenti</h5>
            <ul>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <li key={comment._id}>
                {comment.comment || 'Nessun testo disponibile'}
              </li>
            ))
          ) : (
            <p>Nessun commento disponibile.</p>
          )}
        </ul>
            </>

        )
    }
}
export default Comment