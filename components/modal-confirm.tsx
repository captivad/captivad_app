"use client";
interface IProps {
  id: string;
  title?: string;
  description?: string;
  onSubmit: () => void;
  submitLabel?: string;
}
const ModalConfirmAlert: React.FC<IProps> = ({
  id,
  onSubmit,
  title,
  description,
  submitLabel,
}) => {
  return (
    <dialog id={`my_modal_${id}`} className="modal">
      <div className="modal-box">
        <h5 className="font-bold">{title}</h5>
        <hr className="my-2" />
        <p className="py-4 text-sm">{description}</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-4">
            <button onClick={onSubmit} type="submit" className="btn btn-error">
              {submitLabel}
            </button>
            <button type="button" className="btn">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalConfirmAlert;
