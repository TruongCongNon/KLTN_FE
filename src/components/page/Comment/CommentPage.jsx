import React from "react";
import Button from "../../Button/Button";

const CommentPage = () => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <textarea
          name="comment"
          className="rounded-md resize-y border forcus:border-indigo-600 border-indigo-600 p-3 w-3/4 h-30"
          id=""
        ></textarea>
      </div>
      <div className="">
        <Button title="Gửi comment" className="flex items-end" />
      </div>
    </div>
  );
};

export default CommentPage;
