import axios from "axios";
import { Post } from "../pages/PostsPage";

export class PostApiService {

  private baseUrl:string = 'https://jsonplaceholder.typicode.com/';
  // posts endpoint

  private endPoint:string;
  private signal:any;

  constructor(endPoint:string,signal:any) { 
    this.endPoint = endPoint;
    this.signal = signal;
  }

  // post listesi döndürür
  async getPosts():Promise<Post[]> {
    return (await axios.get(`${this.baseUrl}/${this.endPoint}`,{signal:this.signal})).data
  }

  getPostsPromise():Promise<Post[]> {
    return axios.get(`${this.baseUrl}/${this.endPoint}`,{signal:this.signal});
  }

  async getPostById(postId:number):Promise<Post> {
    return (await axios.get(`${this.baseUrl}/${this.endPoint}/${postId}`,{signal:this.signal})).data
  }
  // birden fazla servisi birleştirip tek bir servis içerisinde result döndürdük
  // default function async örneği.
  async getPostWithUser(postId:number):Promise<Post> {
    try {
      const post =  await this.getPostById(postId);
      const user = (await axios.get(`${this.baseUrl}/users/${postId}`,{signal:this.signal})).data;
      post.user = {...user};
  
      return Promise.resolve(post);
      
    } catch (error) {
       return Promise.reject(error);
    }
  }
}