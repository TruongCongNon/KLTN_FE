import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsTree, deleteComment, addComment } from "../../../redux/api/apiRequestComment";

const CommentPage = ({ productId }) => {
  const dispatch = useDispatch();
  const { tree: comments, isFetching } = useSelector(
    (state) => state.comment.comments
  );
  const currentUser = useSelector((state) => state.auth.login.currentUser);
console.log("comment",comments);
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [parentId, setParentId] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (productId) {
      dispatch(getCommentsTree(productId));
    }
  }, [dispatch, productId]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({ file, url: URL.createObjectURL(file) }));
    setImages([...images, ...newImages]);
  };

  const handleSubmit = () => {
    if (!content.trim() && images.length === 0) return;

    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("userId", currentUser._id);
    formData.append("username", currentUser.username);
    formData.append("content", content);
    formData.append("parentId", parentId || "");
    images.forEach((img) => {
      formData.append("images", img.file);
    });

    dispatch(addComment(formData)).then(() => {
      setContent("");
      setImages([]);
      setEditingId(null);
      setParentId(null);
      dispatch(getCommentsTree(productId));
    });
  };

  const handleEdit = (comment) => {
    setEditingId(comment._id);
    setContent(comment.content);
    setParentId(comment.parentId || null);
  };

  const renderComments = (commentList, level = 0) => {
    return commentList.map((comment) => (
      <div
        key={comment._id}
        className={`pl-${Math.min(level * 4, 12)}  border-gray-300 mt-4`}
        onClick={() => setSelectedId(comment._id)}
      >
        <p className="font-semibold">{comment.username}</p>
        <p className="mb-1">{comment.content}</p>

        {comment.images?.length > 0 && (
          <div className="flex gap-2 mt-1 flex-wrap">
            {comment.images.map((img, idx) => (
              <img
                key={idx}
                src={`http://localhost:5000${img}`}
                alt="cmt-img"
                className="w-24 h-24 object-cover "
              />
            ))}
          </div>
        )}

        {selectedId === comment._id && comment.userId === currentUser._id && (
          <div className="space-x-2 mb-2">
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() => handleEdit(comment)}
            >
              Cập nhật
            </button>
            <button
              className="text-sm text-red-600 hover:underline"
              onClick={() => {
                dispatch(deleteComment(comment._id)).then(() =>
                  dispatch(getCommentsTree(productId))
                );
              }}
            >
              Xóa
            </button>
          </div>
        )}

        {comment.replies?.length > 0 &&
          renderComments(comment.replies, level + 1)}
      </div>
    ));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h3 className="text-xl font-semibold mb-4">Bình luận sản phẩm</h3>

      <textarea
        className="w-full border border-gray-300 rounded-lg p-3 resize-none mb-2"
        rows={3}
        placeholder="Viết bình luận..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="mb-2"
      />

      <div className="flex flex-wrap gap-2 mb-4">
        {images.map((img, index) => (
          <div key={index} className="relative w-24 h-24">
            <img
              src={img.url}
              alt={`upload-${index}`}
              className="object-cover w-full h-full rounded"
            />
            <button
              type="button"
              onClick={() => setImages(images.filter((_, i) => i !== index))}
              className="absolute top-0 right-0 bg-black bg-opacity-60 text-white text-xs px-1 rounded-bl"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="flex space-x-2 mb-6 justify-end">
        <button
          onClick={handleSubmit}
          disabled={isFetching}
          className={`px-4 py-2 rounded text-white ${
            editingId ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editingId ? "Cập nhật" : "Gửi"}
        </button>

        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setContent("");
              setImages([]);
            }}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Hủy
          </button>
        )}
      </div>

      {isFetching ? <p>Đang tải bình luận...</p> : <div>{renderComments(comments)}</div>}
    </div>
  );
};

export default CommentPage;
