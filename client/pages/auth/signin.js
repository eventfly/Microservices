import { useState } from "react"
import axios from "axios";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

export default () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const { doRequest, errors } = useRequest({
        url: "/api/auth/users/signin",
        method: "post",
        body: {
            email, password
        }, onSuccess: () => Router.push("/")
    })

    const onSubmit = async (e) => {
        e.preventDefault();

        doRequest()
    }

    return (
        <form onSubmit={onSubmit}>
            <h1> Sign in</h1>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input value={email} onChange={e => setEmail(e.target.value)}
                    type="email" className="form-control" id="email"
                    aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                    className="form-control" id="password" aria-describedby="emailHelp"
                    placeholder="Enter password" />
            </div>

            {errors}
            <button className="btn btn-primary"> Sign In </button>
        </form>
    )
}