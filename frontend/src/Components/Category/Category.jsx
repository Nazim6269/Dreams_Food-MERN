import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Category = () => {
  const { data } = useSelector((state) => state.fetchReducer);
  console.log(data);
  if (!data) {
    return (
      <div className=" h-[55vh] flex justify-center items-center text-4xl">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container  mx-auto">
          <div className="flex  flex-wrap -m-4">
            {data.map((item) => {
              return (
                <div
                  key={item._id}
                  className="border rounded lg:w-1/4 md:w-1/2 w-full"
                >
                  <Link to={`/category/${item.CategoryName}`}>
                    <div className="mt-4 flex flex-col justify-center items-center">
                      <div className="w-20">
                        <img
                          className="h-18"
                          src={item.img}
                          alt={item.CategoryName}
                        />
                      </div>
                      <div>
                        <h2 className="text-gray-900 title-font text-lg font-medium">
                          {item.CategoryName}
                        </h2>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;
