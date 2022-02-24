import react from 'react'
import { Link } from 'react-router-dom'

function GameButton(){
    return(
        <div>
            <button>
            <Link to="/game"> game </Link>
            </button>
        </div>
    )
}

export default GameButton