import React from 'react';
import {postUser} from './loginAPI';
import {BrowserRouter as Link} from 'react-router-dom'

export default class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.formData = {};
    }
    clickHandler = async () => {
        const user = await postUser(this.formData);
        if(user) {
                sessionStorage.setItem("taskId",user.data.taskId) // store user info into sessionStorage.
                this.props.history.push({
                    pathname : '/main',
                });
        }
        
    }

    onChangeHandler = (e) => {
        this.formData.email = e.target.value;
        this.formData.content = "Welcome to workflowy!";
    }

    render() {
        return (
            <React.Fragment>
                <div className="navbar-2 wf-section">
                    <div data-collapse="tiny" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navbar-3 w-nav">
                        <div className="container-7 w-container">
                            <a href="/" className="menu-logo w-inline-block">
                                <img src="https://assets-global.website-files.com/5fd91be1f828cf2dfee59347/5fd91be1f828cfcbb8e5935a_workflowy-logo.svg" loading="lazy" alt="" className="image-2"></img>
                                <h1 className="heading-4">Workflowy</h1>
                            </a>
                            <nav role="navigation" className="nav-menu w-nav-menu">
                                <a href="/features/" className="link-navbar">Features</a>
                                <a href="/pricing/" className="link-navbar">Pricing</a>
                                <a href="/download/" className="link-navbar">Downloads</a>
                                <a href="/login/" className="btn-login-main">Log in</a>
                            </nav>
                            <div className="w-nav-button" aria-label="menu" role="button" tabIndex="0" aria-controls="w-nav-overlay-0" aria-haspopup="menu" aria-expanded="false">
                                <div className="w-icon-nav-menu"></div>
                            </div>
                        </div>
                        <div className="w-nav-overlay" data-wf-ignore="" id="w-nav-overlay-0">
                        </div>
                    </div>
                </div>
                <div className="hero-focus w-container">
                    <div>
                        <h1 className="hero-focus-heading">
                            <strong className="bold-text-12">Overwhelmed?</strong>
                            <span className="text-span-17">We can help.</span>
                            <br></br>
                        </h1>
                        <p className="hero-paragraph">
                            WorkFlowy offers a simpler way to stay organized. If you have a crazy job or an ambitious project, we will be your trusty sidekick.
                            <br></br>
                        </p>
                    </div>
                    <div className="signup-form">
                            <div className="_wf-auth-form-email">
                                <input name="email" placeholder="Enter your email" type="text" inputMode="email" className="text-field w-input " onChange={(e)=>{this.onChangeHandler(e)}}></input>
                                        <button className="submit-button w-button"  onClick={(e) => this.clickHandler(e)}>
                                            <span>Sign up</span>
                                        </button>
                            </div>
                    </div>
                    <div className="div-block-69">
                        <p className="paragraph-18">Already have an account?</p>
                        <a href="/login/" className="btn-login-2-mini">Log in</a>
                    </div>
                </div>
                <div className="organizations-block-original">
                    <div className="users-row">
                        <div className="user-block">
                            <img src="https://assets-global.website-files.com/5fd91be1f828cf2dfee59347/60a429b73ccb67578896a5e8_twitter.svg" loading="lazy" alt="" className="user-image"></img>
                            <p className="user-text">
                                Ev Williams, founder of Medium, Twitter, and Blogger, uses Workflowy every day
                                <br></br>
                            </p>
                        </div>
                        <div className="user-block">
                            <img src="https://assets-global.website-files.com/5fd91be1f828cf2dfee59347/60a429e68a773d67bd937229_new%20york%20times.svg" loading="lazy" alt="" className="user-image" style={{cursor: "wait"}}></img>
                            <p className="user-text">Farhad Manjoo, the New York Times technology columnist, runs his writing process with Workflowy
                                <br></br>
                            </p>
                        </div>
                        <div className="user-block">
                            <img src="https://assets-global.website-files.com/5fd91be1f828cf2dfee59347/60a429ee8704ded4d0bbf750_slack.svg" loading="lazy" alt="" className="user-image"></img>
                            <p className="user-text">Slack, one of the fastest growing companies of all time, was started with Workflowy
                                <br></br>
                            </p>
                        </div>
                    </div>
                    <div className="users-row">
                        <div className="user-block">
                            <img src="https://assets-global.website-files.com/5fd91be1f828cf2dfee59347/60a429fbb297f085e002e3b1_atlassian.svg" loading="lazy" alt="" className="user-image"></img>
                            <p className="user-text">The CEO of Atlassian, a company worth over $10 billion, stays productive with Workflowy
                                <br></br>
                                <br></br>
                            </p>
                        </div>
                        <div className="user-block">
                            <img src="https://assets-global.website-files.com/5fd91be1f828cf2dfee59347/60a42a0402166b7a2415ac7f_hatching%20twitter.svg" loading="lazy" alt="" className="user-image"></img>
                            <p className="user-text">The New York Times bestselling book "Hatching Twitter" was written using WorkFlowy
                                <br></br>
                            </p>
                        </div>
                        <div className="user-block">
                            <img src="https://assets-global.website-files.com/5fd91be1f828cf2dfee59347/60a42a2ce850dc5cd87f614f_workflowy.svg" loading="lazy" alt="" className="user-image"></img>
                            <p className="user-text">Workflowy uses Workflowy to build Workflowy ;)
                                <br></br>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="app-row">
                    <p className="paragraph-19">
                        We've got apps! Install WorkFlowy for 
                        <a href="https://workflowy.com/downloads/" className="link-7">desktop</a>, 
                        <a href="https://itunes.apple.com/us/app/workflowy-note-list-outline/id551139514?mt=8" target="_blank" className="link-8">iOS</a> 
                        or <a href="https://play.google.com/store/apps/details?id=com.workflowy.android" target="_blank" className="link-9">Android</a>
                    </p>
                </div>
            </React.Fragment>
        )
    }
}