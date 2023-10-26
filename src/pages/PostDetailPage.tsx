import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Post, PostUser } from './PostsPage';
import { PostApiService } from '../services/PostApiService';

function PostDetailPage() {
  // route üzerinden gönderilen dinamik parametre değerlerini param useParams hook ile okuyabiliriz.
  const param = useParams();
  console.log('param', param);
  const [post,setPost] = useState<Post>();
  const controller = new AbortController();
  const postService = new PostApiService("posts",controller.signal);

  // hooks kullanımı function componentin en başında tanımlanır.
  useEffect(() => {
    loadData(Number(param.id)); // git param id değerine göre datayı load et
    return () => {}
  }, []); // sadece doma yüklenirken çalışsın

  // post değeri varsa undefined değilse.
  // post && <></> post varsa sağındaki kısmı render eder. yoksa zaten hiç bir boğu render etmez

  // arrow function async örneği
  const loadData = async(postId:number) => {
    try {
      // sıralı asenkron bir kod blok örneği.
      // const post = (await (axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`))).data as Post;
      // console.log('post', post);
      // const postUser = (await axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)).data as PostUser;
      // console.log('postUser', postUser);

      // post.user = {...postUser};

      const post = await postService.getPostWithUser(postId);
      setPost({...post});

    } catch (error) {

    }
  } 

  return (
    <>

      {/* {post ? <>Post bulundu</>:<>Post Yok</>} */}

      {/* ekrana render ederken else kısmına gerek duymadığınız durumda aşağıdaki formatta yazabiliriz. */}
      {post && <>
      <h1>{post.title}</h1>
      <p>
        {post.body}
      </p>
      <hr></hr>
      <h1>
        User Details
      </h1>
      <p>
        username: {post.user?.username}
      </p>
      </>}
    </>
  )
}

export default PostDetailPage