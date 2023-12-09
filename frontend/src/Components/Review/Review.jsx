import React from "react";

const Review = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5  mx-auto">
          <h1 className="text-3xl font-medium title-font text-gray-900 mb-2">
            Review
          </h1>
          <div className="flex -m-4">
            <div className="p-4 w-full">
              <div className="h-full bg-gray-100 p-8 rounded">
                <p className="leading-relaxed mb-6">Write your comment</p>
                <div className="flex gap-2">
                  <textarea name="" id="" cols="50" rows="2"></textarea>

                  <button className="inline-flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg">
                    Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Review;
