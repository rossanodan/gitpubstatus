import React, { useState, useEffect } from "react"
import axios, { AxiosResponse } from "axios"
import "./App.css"

const App = () => {
  const [ghStatus, setghStatus] = useState({
    indicator: "",
    description: ""
  })

  const [error, setError] = useState({
    isError: false,
    message: ""
  })

  useEffect(() => {
    axios
      .get("https://www.githubstatus.com/api/v2/status.json")
      .then(({ data }: AxiosResponse) => {
        const { indicator, description } = data.status
        setError({
          isError: false,
          message: ""
        })
        setghStatus({
          indicator,
          description
        })
      })
      .catch((error) => {
        setError({
          isError: true,
          message: error
        })
        console.log(`Error: ${error}`)
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {error.isError && <p>Sorry, something is wrong! Try again later.</p>}
        {ghStatus.indicator === "none" && (
          <>
            <img
              src="https://media.giphy.com/media/3ofSBoh8hXCs4wIvTi/giphy.gif"
              alt="gif"
            />
            <p>Everything looks good.. Sorry.. Get back to work!</p>
          </>
        )}
        {ghStatus.indicator === "minor" && (
          <>
            <img
              src="https://media.giphy.com/media/3ofSBoh8hXCs4wIvTi/giphy.gif"
              alt="gif"
            />
            <p>Everything looks good.. Sorry.. Get back to work!</p>
          </>
        )}
        {ghStatus.indicator === "major" && (
          <>
            <img
              src="https://media.giphy.com/media/QsyPRpG6WVR6SYfBVw/giphy.gif"
              alt="gif"
            />
            <p>It's pub time!</p>
          </>
        )}
        {ghStatus.indicator === "critical" && (
          <>
            <img
              src="https://media.giphy.com/media/1luXLMeNxsaNFMUuOe/giphy.gif"
              alt="gif"
            />
            <p>
              <strong className="Critical-Outage">CRITICAL OUTAGE</strong> It's
              pub time!
            </p>
          </>
        )}
        <small className="More-Detailed-Information">
          For more detailed information about GitHub Status, visit{" "}
          <a
            href="https://www.githubstatus.com/"
            target="_blank"
            rel="noreferrer"
          >
            https://www.githubstatus.com/
          </a>
        </small>
      </header>
    </div>
  )
}

export default App
