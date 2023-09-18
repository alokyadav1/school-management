/* eslint-disable react/prop-types */
function SecurityCard({ title, description }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    );
  }
export default SecurityCard;