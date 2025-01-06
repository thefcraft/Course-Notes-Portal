interface askConfirmationProps{
    title: string,
    description?: string,
    onClickConfirm: () => void,
    onClickCancel: () => void,
    variant?: "default" | "destructive"
    cancelText?: string,
    confirmText?: string
}
export default function AskConfirmation(props: askConfirmationProps){
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-lg w-full max-w-md">
          <h3 className="text-xl text-center font-semibold text-gray-700 dark:text-gray-200 mb-4">
            {props.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {props.description}
          </p>
          <div className="flex justify-between">
            <button
              onClick={props.onClickCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              {props.cancelText || "Cancel"}
            </button>
            {props.variant === "destructive"?
              <button
                onClick={props.onClickConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                {props.confirmText || "Confirm"}
              </button>
              :
              <button
                onClick={props.onClickConfirm}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {props.confirmText || "Yes"}
              </button>
            }
          </div>
        </div>
      </div>
    )
}