import { NavLink } from "react-router-dom"

export default function AboutPage() {
    return (
        <div id="about-page">
            <p>GitHub:<NavLink to ="https://github.com/philliam-fancyson">philliam-fancyson</NavLink></p>
            <p>Linkedin: <NavLink to="https://www.linkedin.com/in/phillnguyen/">phillnguyen</NavLink></p>
    </div>
    )
}
