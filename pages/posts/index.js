import { authPage } from '../../libs/middlewares/authorizationPage';

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);
  const postReq = await fetch('http://localhost:3000/api/posts', {
    headers: {
      Authorization: 'Bearer ' + token,
    }, //setelah bearer harus ada spasi
  });
  const posts = await postReq.json();
  // console.log(posts);
  // menyimpan data kedalam props
  return {
    props: {
      posts: posts.data,
    },
  };
}
export default function PostIndex(props) {
  console.log(props);
  return (
    <div>
      <h1>POST</h1>
      {props.posts.map((post) => {
        return <div key={post.id}>{post.title}</div>; //jika menggunakan foreach tidak bisa return
      })}
    </div>
  );
}
