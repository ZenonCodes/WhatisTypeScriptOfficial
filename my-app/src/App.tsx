import React, {useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Word from './components/Word';
import {WordType} from "./types/word.types";

function App() {

    const img = <img src="https://i.pinimg.com/originals/b0/32/10/b032103c74cd544dba4be86c10af02c7.gif" alt={"Confused man"}/>

    const [word, setWord] = useState([])
    const [error,setError] = useState([])

    useEffect(() =>{
        const form = document.getElementById('defineform') as HTMLFormElement;
        document.body.addEventListener('submit', async function(event){
            const url = ('https://api.dictionaryapi.dev/api/v2/entries/en/');
            const formData = new FormData(form);
            const text = formData.get('defineword') as string;
             fetch(url + text)
                 .then(response => response.json())
                 .then(res => setWord(res))
                // .then(res => setWord(res))
                 .catch(err => console.log(err))
            event.preventDefault();
        });

    }, [])

  // @ts-ignore
    return (
    <div className="App">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">SAY WHAT?</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://dictionaryapi.dev">Our API</a>
                        </li>
                    </ul>
                    <form className="d-flex" id="defineform">
                        <input className="form-control me-2" type="search" name="defineword" placeholder="What WHAT?"
                               aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Define</button>
                    </form>
                </div>
            </div>
        </nav>
        <main className="container">
            <div className="bg-light p-5 rounded">
                <h1>SAY WHAT?</h1>
                {word.length > 0 ? "" : img}
            <ul className="list-unstyled">
                    {word.map((word:any) =>
                        <React.Fragment>
                            <h2><u>{word.word} </u></h2>
                            <p></p>
                           <li> <i>Pronunciation: {word.phonetic}</i></li>
                            {word.meanings.map((meanings:any) => (
                                <li><b> <u><b/>{meanings.partOfSpeech}</u> </b>
                                    {meanings.definitions.map((definitions) => (
                                        <p>
                                        <li><b>Definition: </b>{definitions.definition}</li>
                                            <li><i><b>{definitions.example ? "Example: " + definitions.example :""}</b></i></li>

                                        </p>
                                    ))}
                                    <li><b>Synonyms:</b> {meanings.synonyms + ""}</li>
                                    <li> <b>Antonyms:</b> {meanings.antonyms + " "} </li>
                                <p></p>
                                 </li>
                            ))}
                        </React.Fragment>
                    )}
                </ul>
            </div>
        </main>


    </div>
  );
}

export default App;
