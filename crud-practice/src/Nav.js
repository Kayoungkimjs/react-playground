import React from "react";

const Nav = (props) => {
    //map 사용 & for 문 사용
    // const topics = props.topics;
    const lis = []
     for (let i = 0; i < props.topics.length; i++) {
       let topic = props.topics[i];
       lis.push(<li key={topic.id}><a id={topic.id} href={`./read/${topic.id}`} onClick={(event)=>{
           event.preventDefault();
           props.onChange(Number(event.target.id)); //a tag id 속성을 가져오기 위해 사용 
       }}>{topic.title}</a></li>);
     }
  return (
    <nav>
      {/* <ol>
          {topics.map(topic => (
              <li key={topic.id}>
                  <a href={'./read/${topic.id}'}>{topic.title}</a>
            </li>
          ))}
      </ol> */}
      <ol>
         {lis}
      </ol>
    </nav>
  );
};

export default Nav;
