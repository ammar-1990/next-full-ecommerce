import axios from "axios";
import jwt from "jsonwebtoken";

const Orders = ({ user, orders }) => {
  console.log(orders);
  return (
    <div className="w-full ">
      <h1 className="text-3xl font-bold">Orders</h1>
      <div className="h-[550px] overflow-y-scroll myScroll shadow-sm shadow-zinc-400  rounded-sm mt-12 ">
      <table className="w-full  text-white border border-zinc-800 min-w-[750px]">
        <thead className="bg-zinc-800 uppercase">
          <tr>
            <td className=" p-3 border-r border-gray-500 text-sm md:text-base">
              date
            </td>
            <td className=" p-3 border-r border-gray-500 text-sm md:text-base">
              Recepient
            </td>
            <td className="p-3">Products</td>
          </tr>
        </thead>
        <tbody className="text-zinc-700">
          {orders.map((el) => (
            <tr key={el._id} className="odd:bg-gray-200 bg-gray-100">
              <td className="p-3  border  border-gray-300">{new Date(el.createdAt).toLocaleString()}</td>
              <td className="p-3 border  border-gray-300">
                <span className="capitalize">{el.name}</span> - {el.email} <br />{" "}
                <span className="capitalize">
                  {el.street} - {el.city}
                </span>{" "}
                - <span className="uppercase">{el.country}</span>{" "}
                <br/>
                <span>Postal code: {el.postal}</span>
              </td>
              <td className="p-3 border border-gray-300">
                <div className="flex gap-4 flex-col">
                  {el.cart.map((el, i) => (
                    <span key={i}>
                      {el.name}   x{el.amount}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    
    </div>
  );
};

export default Orders;

export async function getServerSideProps({ req, res }) {
  const user = jwt.verify(
    req.cookies.accessToken,
    process.env.JWT_SECRET,
    (error, token) => {
      if (error) return null;

      return (req.user = token);
    }
  );

  if (!user)
    return { redirect: { destination: "/register", permanent: false } };

  const orders = await axios("http://localhost:3001/api/orders");

  return {
    props: { user, orders: orders.data },
  };
}
