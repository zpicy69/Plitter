import { useRouter } from "next/router";
import usePost from "@/hooks/usePost";
import { ClipLoader } from "react-spinners";
import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import Form from "@/components/Form";
import CommentFeed from "@/components/posts/CommentFeed";

const PostView = () => {
    const router = useRouter();
    const { postId } = router.query;

    const { data: fetchedPost, isLoading } = usePost(postId as string);

    if (isLoading || !fetchedPost) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    }

    return (
        <>
            <Header showBackArrow label='Tweet' />
            <PostItem data={fetchedPost} />
            <Form placeholder="Tweet your reply" isComment postId={postId as string} />
            <CommentFeed comments={fetchedPost?.comments} />
        </>
    );
}

export default PostView;