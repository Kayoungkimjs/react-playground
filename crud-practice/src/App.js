import { useState } from 'react';
import Header from './Header';
import Nav from './Nav';
import Article from './Article'
import Create from './Create'
import Update from './Update'

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ]);

  let content = null;
  let contextControl = null;
  
  //모드에 따른 컨텐츠 변경
  if(mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB" />
  } else if(mode==='READ') {
    let title, body = null;
    for (let i = 0; i <topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body} />;
    contextControl = (
      <>
        <li>
          <a
            href={`/update/${id}`}
            onClick={(e) => {
              e.preventDefault();
              setMode("UPDATE");
            }}
          >
            Update
          </a>
        </li>
        <li>
          <input type="button" value="Delete" onClick={(e)=>{
            const newTopics=[];
            for(let i = 0; i<topics.length; i++) {
              if(topics[i].id !== id) {
                newTopics.push(topics[i]);
              }
            }
            setTopics(newTopics);
            setMode('WELCOME')
          }} />
        </li>
      </>
    );
  } else if(mode==='CREATE') {
    content = <Create onCreate={(title, body)=>{
      const newTopic = {id:nextId, title:title, body:body}
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }} />
  } else if(mode==="UPDATE") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content=<Update title={title} body={body} onUpdate={(title, body)=>{
        const updatedTopic={id:id, title:title, body:body}
        const newTopics=[...topics];
        for (let i=0; i<newTopics.length; i++) {
          if(newTopics[i].id === id) {
            newTopics[i]=updatedTopic;
            break;
          }
        }
        setTopics(newTopics);
        setMode('READ');
    }}/>
  }

  return (
    <>
      <Header
        title="REACT"
        onChange={() => {
          setMode("WELCOME");
        }}
      />
      <Nav
        topics={topics}
        onChange={(id) => {
          setMode("READ");
          setId(id);
        }}
      />
      {content}
      <ul>
        <li>
          <a
            href="/create"
            onClick={(e) => {
              e.preventDefault();
              setMode("CREATE");
            }}
          >
            Create
          </a>
        </li>
        {contextControl}
      </ul>
    </>
  );
}

export default App;
