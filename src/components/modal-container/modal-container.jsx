import OtpInput from "react18-otp-input";

const ModalContainer = ({ show, title, close, children, width }) => {
  return (
    <div
      class={`fixed ${
        show ? "flex" : "hidden"
      } flex items-center top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div
        className="fixed inset-0 bg-gray-400 opacity-30"
        onClick={close}
      ></div>
      <div
        class={`relative w-full ${
          width ? width : "max-w-2xl"
        } mx-auto max-h-full`}
      >
        {/* <!-- Modal content --> */}
        <div class="relative bg-white rounded-lg shadow">
          {/* <!-- Modal header --> */}
          <div class="flex items-center gap-4 rounded-t">
            {close && (
              <button
                type="button"
                class="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 inline-flex items-center"
                onClick={close}
              >
                <svg
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
            )}
            {title && (
              <h3 class="text-xl font-semibold text-gray-900">{title}</h3>
            )}
          </div>
          {/* <!-- Modal body --> */}
          <div class="p-6 space-y-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;

export const OtpComponent = ({
  stateData,
  textChange,
  numInputs,
  separator,
  css,
  loading,
}) => {
  return (
    <>
      <OtpInput
        value={stateData}
        onChange={(otp) => textChange(otp)}
        numInputs={numInputs || 6}
        separator={separator || <span>-</span>}
        inputStyle={`${css} otp-code__input`}
        isDisabled={loading}
        shouldAutoFocus={true}
        isInputNumber={true}
      />
    </>
  );
};
