import { FormSignin } from "../components/FormSignin"
import { Quote } from "../components/Quote"

const Signup = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <FormSignin />
            </div>

            <div className="invisible lg:visible">
                <Quote />
            </div>
        </div>
    )
}

export default Signup