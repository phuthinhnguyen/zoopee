function Loadinglogin() {
    return (
        // loading-icon
        <div className="preloader-wrap">
            <div className="header">
                <h2 className="logotext">zoopee</h2>
                <div className="header-form">
                    <div>
                        <div
                            className="login"
                        >
                            <label>Username</label>
                            <input
                                type="text"
                            // name="username"
                            // value={formlogin.username}
                            // onChange={(event) => handleChangelogin(event)}
                            />
                        </div>

                    </div>
                    <div>
                        <div
                            className="login"
                        >
                            <label>Password</label>
                            <input
                                type="password"
                            // name="password"
                            // value={formlogin.password}
                            // onChange={(event) => handleChangelogin(event)}
                            />
                        </div>

                    </div>

                    <button className="button-login">
                        Login
                    </button>

                    <button className="button-signup-header-form">
                        Sign up
                    </button>
                </div>
            </div>
            <div className="preloader">
                <img src="/img/Preloader_7.gif" alt=""></img>
            </div>
        </div>

    )
}
export default Loadinglogin;