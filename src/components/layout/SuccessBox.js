export default function SuccessBox({children}) {
    return(
        <h2 className="text-center bg-green-100 p-4 border-4 border-green-300 rounded-lg">
            {children}
          </h2>
    )
}