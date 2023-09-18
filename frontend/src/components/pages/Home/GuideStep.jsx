/* eslint-disable react/prop-types */
function GuideStep({ stepNumber, title, description, imageSrc }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="flex-shrink-0 bg-green-500 rounded-full w-12 h-12 flex items-center justify-center text-white text-2xl font-semibold">
          {stepNumber}
        </div>
        <div className="mt-4 lg:mt-0 lg:ml-4">
          <div className="text-center lg:text-left mb-4">
            <img
              src={imageSrc}
              alt={`Step ${stepNumber}`}
              className="w-32 h-32 mx-auto lg:mx-0"
            />
          </div>
          <h3 className="text-xl lg:text-2xl font-semibold mb-2">
            Step {stepNumber}: {title}
          </h3>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
}
export default GuideStep;
