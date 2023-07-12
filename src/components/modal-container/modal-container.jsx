const ModalContainer = ({ show, title, close, children, width }) => {
  return (
    <div
      id="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      class={`fixed ${
        show ? "flex" : "hidden"
      } flex items-center top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="fixed inset-0 bg-main opacity-30"></div>
      <div
        class={`relative w-full ${width ? width : "max-w-2xl"} mx-auto max-h-full`}
      >
        {/* <!-- Modal content --> */}
        <div class="relative bg-white rounded-lg shadow">
          {/* <!-- Modal header --> */}
          <div class="flex items-start gap-4 p-4 rounded-t">
            <button
              type="button"
              class="text-gray-400 bg-transparent bg-main text-white rounded-lg text-sm p-1.5 inline-flex items-center"
              onClick={close}
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <h3 class="text-xl font-semibold text-gray-900">{title}</h3>
          </div>
          {/* <!-- Modal body --> */}
          <div class="p-6 space-y-6">{children}</div>
          {/* <!-- Modal footer --> */}
          {/* <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="defaultModal"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              I accept
            </button>
            <button
              data-modal-hide="defaultModal"
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Decline
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
