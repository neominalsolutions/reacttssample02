// postları yüklediğimiz component

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { PostApiService } from '../services/PostApiService';

// Backend deki Dto yapıları için burada karşılık olarak interface tercih edilir.
// type mapping yaptığımızdan dolayı class ihtiyaç duymuyoruz.
// DTO işlemleri için type yada interface tercih edebiliriz.
export interface Post {
  userId?:number;
  title:string;
  body:string;
  id:number;
  user?: PostUser;
}

export interface PostUser {
  name:string;
  email:string;
  username:string;
}

// Not Function Componente çalışırken timing işlemlerinde dikkatli olalım.

function PostsPage() {

  const [posts,setPosts] = useState<Post[]>([]);
  const controller = new AbortController();
  const postApiService = new PostApiService('posts', controller.signal);
  // uygulama gereksiz kaynak tüketmesin diye timing işlemlerini clean up function içinde sonlandıralım
  let interval:any;
  // birden falza case durumda bu load datayı çağırabiliriz.
  const loadData = async()=> {
    // response AxiosResponse döndürür.
    // controller abort işlemini axios ile nasıl uygularız ? 
    // let response = await axios.get('https://jsonplaceholder.typicode.com/posts',{signal:controller.signal});
    // let data = response.data; // response.body() denk gelir. fetch api da gördük
    // const data = await postApiService.getPosts();
    // setPosts([...data]);

    // postApiService.getPosts().then(response => {
    // }).catch(err => {})

    postApiService.getPostsPromise()
    .then((response:any) => {
      console.log('response', response.data);
      // verinin yüklendiğine emin olduğumuz yerde setState yaptık.
      setPosts([...response.data])
    }).catch(err => {
      console.log('err', err);
    });
  }


   useEffect(() => { // ComponentDidMount denk gelir.
    console.log('component doma giriğinde');
    // useEffect hook içerisinde async bir function kullanmak için aşağıdaki yazım formatını kullanalım.

    // eslint-disable-next-line react-hooks/exhaustive-deps
    interval = setInterval(() => {
      console.log('interval');
    },1000);

    loadData();
    // clean up function diyoruz. Component domdan ayrılırken çalışır.
    return () => { // Component WillUnMount
      // network request terminate işlemi
      controller.abort(); // sinyal kesme işlemini yaptık
      console.log('component domdan çıktığında');
      clearInterval(interval);
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

