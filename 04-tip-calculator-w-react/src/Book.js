import React from 'react'

const Book = (props) => {
  // Events in React
  // attribute, eventHandler
  // onClick, onMouseOver
  const {img, title, author} = props;
  const clickHandler = (e) => {
    console.log(e);
    console.log(e.target)
    alert('hello world')
  };
  const complexExample = (author) => {
    console.log({author})
  }

  return (
    <article className='book' onMouseOver={() => {
      console.log(title);
    }}> 
      <img src={img} alt="" />
      <h1>{title}</h1>
      <h4> {author}</h4>
      <button type="button" onClick={clickHandler}>Reference</button>
      <button type="button" onClick={() => complexExample(author)}>More complex example</button>
    </article>
  );
};

export default Book
