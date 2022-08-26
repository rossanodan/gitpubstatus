import { useState, useEffect } from "react"
import axios, { AxiosResponse } from "axios"

import { Gif } from "./Gif"
import { constants } from "./constants"

import "./App.css"

const renderGif = (indicator: string) => {
  switch (indicator) {
    case "none":
      return (
        <>
          <Gif src="https://media.giphy.com/media/3ofSBoh8hXCs4wIvTi/giphy.gif" />
          <p>{constants.STATUS_OK}</p>
        </>
      )
    case "minor":
      return (
        <>
          <Gif src="https://media.giphy.com/media/3ofSBoh8hXCs4wIvTi/giphy.gif" />
          <p>{constants.STATUS_OK}</p>
        </>
      )
    case "major":
      return (
        <>
          <Gif src="https://media.giphy.com/media/QsyPRpG6WVR6SYfBVw/giphy.gif" />
          <p>{constants.STATUS_OUTAGE}</p>
        </>
      )
    case "critical":
      return (
        <>
          <Gif src="https://media.giphy.com/media/1luXLMeNxsaNFMUuOe/giphy.gif" />
          <p>
            <strong className="Critical-Outage">CRITICAL OUTAGE</strong>{" "}
            {constants.STATUS_OUTAGE}
          </p>
        </>
      )
    default:
  }
}

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

  if (error && error.isError) {
    return <p>{constants.ERROR}</p>
  }

  return (
    <div className="App">
      <header className="App-header">
        {renderGif(ghStatus.indicator)}
        <small className="More-Detailed-Information">
          {constants.MORE_INFO}
          <a
            href="https://www.githubstatus.com/"
            target="_blank"
            rel="noreferrer"
            className="More-Detailed-Information-URL"
          >
            https://www.githubstatus.com/
          </a>
        </small>
        <small className="Credits">
          {new Date().getFullYear()} - {constants.AUTHOR_NAME}
        </small>
      </header>
    </div>
  )
}

export default App
