export default function BusinessDetails() {
  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      <div className="flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-300 text-lg font-semibold">
          Icon
        </span>
      </div>

      <div className="col-span-2">
        <h2 className="mb-2 text-xl font-semibold">Business</h2>
        <p className="text-gray-700">
          This is where you can write about the business. Provide details, history, and other
          relevant information to give a clear picture of what the business is about.
        </p>
      </div>

      <div className="col-span-2 flex items-center justify-center">
        <div className="text-lg font-semibold">
          <p>Ratings:</p>
          <p className="text-yellow-500">9.5k</p>
        </div>
      </div>
    </div>
  )
}
