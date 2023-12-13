import { Navigate } from "react-router-dom"

const PreventSignin = (props) => {
    console.log(props)
    return(
        <>
            {props.props.auth ?
                <Navigate to="/dashboard" />
                :
                props.children
            }
        </>
    )
}

export default PreventSignin;