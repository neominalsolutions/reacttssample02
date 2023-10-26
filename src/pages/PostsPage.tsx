// postları yüklediğimiz component

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

// Backend deki Dto yapıları için burada karşılık olarak interface tercih edilir.
// type mapping yaptığımızdan dolayı class ihtiyaç duymuyoruz.
// DTO işlemleri için type yada interface tercih edebiliriz.
export interface Post {
  userId?:number;
  title:string;
  body:string;
  id:number;
}

function PostsPage() {

  const [posts,setPosts] = useState<Post[]>([]);

  // birden falza case durumda bu load datayı çağırabiliriz.
  const loadData = async()=> {
    // response AxiosResponse döndürür.
    let response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    let data = response.data; // response.body() denk gelir. fetch api da gördük
    setPosts([...data]);
  }

   useEffect(() => { // ComponentDidMount denk gelir.
    console.log('component doma giriğinde');
    // useEffect hook içerisinde async bir function kullanmak için aşağıdaki yazım formatını kullanalım.
    loadData();

    // clean up function diyoruz. Component domdan ayrılırken çalışır.
    return () => { // Component WillUnMount
      console.log('component domdan çıktığında')
    }
  }, []) // [] hali empty dependecy herhangi bir state mekanizmasını takip etmediğimiz kısım. sadece doma girerken 1 kereye mahsus çalışır

  useEffect(() => {
    if(posts.length !== 0) {
      console.log('posts state değiştiğinde');
      // loadData();
    }
  }, [posts]) // [state] state takibi sağlar. // ComponentDidUpdate lifecyle method denk gelir. // ama birden falza useState olduğunda doma ilk giriş anında da tetiklenir.

  // a veya b statelerinden herhangi birinin değişim anını yakalabiliriz.
  // useEffect(()=> {

  // }, [a,b])

  const setStateSample = () => {
    setPosts([{id:1,title:'t',body:'b'}])
  }

  return (
    <>
      <button onClick={setStateSample}>Test Change State</button>
      <table style={{width:"100%", padding:"5px"}}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {
              posts.map((post:Post) => {
                return <tr key={post.id}>
                  <td>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </td>
                 <td>
                  {post.body}
                 </td>
                </tr>
              })
          }
         
        </tbody>
      </table>
    </>
  )
}

export default PostsPage

