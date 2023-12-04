import DefaultButton from './DefaultButton';

const Modal = (props) => {
  const { visible, onCancel } = props;

  if (!visible) {
    return null;
  }
  return (
    <div className="fixed z-40 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          ariaHidden="true"
          className="fixed inset-0 transition-opacity"
          onClick={onCancel}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          ariaHidden="true"
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
        >
          ​
        </span>
        <div
          ariaLabelledby="modal-headline"
          ariaModal="true"
          className={`inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:p-6 ${
            props.className ? props.className : ''
          }`}
          role="dialog"
        >
          {props.children}
          {!props.hideButton && (
            <div className="mt-5 sm:mt-6">
              <DefaultButton
                onClick={onCancel}
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium sm:text-sm"
              >
                {props.buttonText || 'OK Cool'}
              </DefaultButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
