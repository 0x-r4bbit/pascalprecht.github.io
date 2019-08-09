import React from 'react';
import './Signup.css';

class Signup extends React.Component {
  render() {
    return (
      <form action="https://app.convertkit.com/forms/1021619/subscriptions"
        className="seva-form formkit-form"
        method="post"
        data-sv-form="1021619"
        data-uid="6c042b4842"
        data-format="inline"
        data-version="5"
        min-width="400 500 600 700 800"
        style={{backgroundColor: "rgb(255, 255, 255)", borderRadius: "6px"}}>

        <div data-style="full">
          <div data-element="column"
            className="formkit-background"
            style={{backgroundImage: "url(https://images.unsplash.com/photo-1542931287-023b922fa89b?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjY5NzkwfQ?fit=max&w=800)"}}>
          </div>
          <div data-element="column" className="formkit-column">
            <div className="formkit-header" data-element="header" style={{color: "rgb(83, 83, 83)", fontSize: "19px", fontWeight: "700"}}>
              <h1 style={{ marginTop: 0 }}>Get my content by email</h1>
            </div>
            <ul className="formkit-alert formkit-alert-error" data-element="errors" data-group="alert">
            </ul>
            <div data-element="fields" className="seva-fields formkit-fields">
              <div className="formkit-field">
                <input className="formkit-input" aria-label="Your first name" name="fields[first_name]" placeholder="Your first name" type="text" style={{color: "rgb(139, 139, 139)", borderColor: "rgb(221, 224, 228)", fontWeight: "400"}} />
              </div>

              <div className="formkit-field">
                <input className="formkit-input" name="email_address" placeholder="Your email address" required="" type="email" style={{color: "rgb(139, 139, 139)", borderColor: "rgb(221, 224, 228)", fontWeight: "400"}} />
              </div>
              <button data-element="submit" className="formkit-submit formkit-submit" style={{color: "rgb(255, 255, 255)", backgroundColor: "rgb(255, 188, 117)", borderRadius: "3px", fontWeight: "700"}}>
                <div className="formkit-spinner">
                  <div>
                  </div>
                  <div>
                  </div>
                  <div>
                  </div>
                </div>
                <span>Subscribe</span>
              </button>
            </div>
            <div className="formkit-disclaimer" data-element="disclaimer" style={{color: "rgb(139, 139, 139)", fontSize: "13px"}}>
              <p>No spam. Unsubscribe at anytime.</p>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Signup;
