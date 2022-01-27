import React from 'react';

function NavigationBar() {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <div className="container">
          <nav className="navbar navbar-expand-sm navbar-light ">
            <a className="navbar-brand" href="/#">
              <img src="tlp.png" width="170" height="127.5" alt="" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#toggleMobileMenu"
              aria-controls="toggleMobileMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="toggleMobileMenu">
              <ul className="navbar-nav mr-auto">
                <li>
                  <a className="nav-link" href="/dashboard">
                    Home
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/dashboard">
                    Area Management
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/settings">
                    Settings
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}

export default NavigationBar;
