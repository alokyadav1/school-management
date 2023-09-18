/* eslint-disable react/prop-types */
function FeatureCard({ iconSrc, title, description }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <img src={iconSrc} alt={title} className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    );
  }
export default FeatureCard;