/* eslint-disable no-unused-vars */
import UserImg from "../../../assets/images/user.png";
import { useParams, useLocation, useNavigate ,Link } from "react-router-dom";
function ViewDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { data,role } = location.state;

    //handle back
    const handleBack = () => {
        navigate(-1);
    }
  //performance report
  const performanceReport = () => {
    navigate(`/admin/student/performanceReport/${data._id}`, { state: { data } });
  };

  return (
    <div className="container mx-auto p-4 bg-blue-200 h-screen">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="p-4">
          {/* Back Button */}
          <button className="text-blue-600 text-sm hover:scale-105" onClick={handleBack}>
            &lt; Back to Profiles
          </button>
          {/* User Profile Picture */}
          <img
            src={data.profile_pic ? data.profile_pic : UserImg}
            alt="User Profile"
            className="w-32 h-32 rounded-full mx-auto"
          />
          {/* User ID */}
          <div className="mt-4 text-center">
            <span className="text-xl font-semibold text-primary">
              User ID: <span className="text-lg text-blue-800 bg-slate-100 p-1 rounded-md ">{data._id}</span>
            </span>
          </div>
          {/* Full Name */}
          <div className="mt-2">
            <p className="text-lg font-semibold">Full Name:</p>
            <p className="text-gray-700">{data.first_name} {data.last_name}</p>
          </div>

          {/* Email */}
          <div className="mt-2">
            <p className="text-lg font-semibold">Email:</p>
            <p className="text-gray-700">{data.email}</p>
          </div>

          {/* Mobile */}
          <div className="mt-2">
            <p className="text-lg font-semibold">Mobile:</p>
            <p className="text-gray-700">{data.mobile}</p>
          </div>

          {/* Standard */}
          <div className="mt-2">
            <p className="text-lg font-semibold">Standard:</p>
            <p className="text-gray-700">{data.standard}</p>
          </div>

          {/* Date of Birth */}
          <div className="mt-2">
            <p className="text-lg font-semibold">Date of Birth:</p>
            <p className="text-gray-700">{data.dob}</p>
          </div>

          {/* Button to View Performance Report */}
          {role === "Student" && <div className="mt-4 text-center">
            <button
              onClick={performanceReport}
              className="bg-primary text-white bg-blue-700 px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              View Performance Report
            </button>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default ViewDetail;
