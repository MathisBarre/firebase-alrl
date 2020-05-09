import React from 'react'
import './App.css'
import * as firebase from "firebase/app"
import "firebase/analytics"
import "firebase/auth"
import "firebase/firestore"
var firebaseConfig = {
  apiKey: "AIzaSyCbk8YcyeJFryW7k2kmxlD3xdklivB9NhM",
  authDomain: "awesome-learning-ranked-list-0.firebaseapp.com",
  databaseURL: "https://awesome-learning-ranked-list-0.firebaseio.com",
  projectId: "awesome-learning-ranked-list-0",
  storageBucket: "awesome-learning-ranked-list-0.appspot.com",
  messagingSenderId: "935911432741",
  appId: "1:935911432741:web:bccf72c916bd9c8ac215cc",
  measurementId: "G-NTVQ8QSPD3"
};

firebase.initializeApp(firebaseConfig)
firebase.analytics()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    const db = firebase.firestore()
    const dataList = {}
    db.collection("ranking").get().then((querySnapshot) => {
      querySnapshot.forEach((document) => {
        const data = document.data()
        const languageName = data.language_name.toLowerCase()
        if ( dataList[languageName] === undefined || dataList[languageName] === null ) dataList[languageName] = []
        dataList[languageName].push({
          name: data.ressource_name,
          url: data.ressource_url,
          rank: data.ressource_rank
        })
      })
      this.setState({
        data: dataList
      })
    })
  }

  render() {
    if (this.state.data === null) return <div>Fetching data...</div>
    else {
      return (
        <main className="main">
          <h1>Awesome learning ranking list</h1>
          <h2>Content table</h2>
          <ul>
            {Object.keys(this.state.data).map((language) => (
              <li><a href={`#${language}`}>{language}</a></li>
            ))}
          </ul>

          {Object.keys(this.state.data).map((language) => (
            <>
              <h3 className="languageName" id={language}>{language}</h3>
              <ul>
                {this.state.data[language].map((ressource) => (
                  <li key={ressource.url}>
                    <a href={ressource.url} target="_blank" rel="noopener noreferrer">{ressource.name}</a> ({ressource.rank} {(ressource.rank < 2) ? "like" : "likes"})
                  </li>
                ))}
              </ul>
            </>
          ))}
          {/* {this.state.data.map((entry) => (
            <h2 key={entry.ressource_url}>{entry.language_name} - <a href={entry.ressource_url} target="_blank" rel="noopener noreferrer">{entry.ressource_name}</a> ({entry.ressource_rank} upvote)</h2>
          ))} */}
        </main>
      ) 
    }
  }
}

export default App;
