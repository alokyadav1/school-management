import UserImg from "../../../assets/images/user.png";
import { useParams, useLocation } from "react-router-dom";
function ViewDetail() {
    const { id } = useParams();
    const location = useLocation();
    const { data } = location.state;
    return ( 
        <div>
            <h1>View Detail - <span className="font-bold">{id}</span></h1>
            <div className="flex justify-center">
                <div className="w-auto">
                    <img src={UserImg} alt="" className="bg-white p-1 w-40 h-40" />
                </div>
                <div>
                    <p>id - {data._id}</p>
                    <p>full name - {data.first_name} {data.last_name}</p>
                    <p>email - {data.email}</p>
                    <p>date of birth - { data?.dob }</p>
                </div>
            </div>
        </div>
     );
}

export default ViewDetail;