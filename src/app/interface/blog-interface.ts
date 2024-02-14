export interface TrainerData {
    id: string;
  }
  
export interface Blog {
    _id: string
    title: string;
    content: string;
    author: string;
    blogImage: File[]; // Update interface to include the image file
  }
  
export interface Response {
    message: string;
    blogs: Blog[]
  }
  
  export interface ResponseById {
    message: string;
    blog: Blog
  }
  