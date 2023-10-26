// postları yüklediğimiz component

import React, { useState } from 'react'
import { Link } from 'react-router-dom';

// Backend deki Dto yapıları için burada karşılık olarak interface tercih edilir.
// type mapping yaptığımızdan dolayı class ihtiyaç duymuyoruz.
// DTO işlemleri için type yada interface tercih edebiliriz.
export interface Post {
  userId:number;
  title:string;
  body:string;
  id:number;
}

function PostsPage() {

  const [posts,setPosts] = useState<Post[]>([]);

  return (
    <>
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
                    <Link to={`posts/${post.id}`}>{post.title}</Link>
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

