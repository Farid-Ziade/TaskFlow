import { useEffect, useRef } from "react";
import Icon from "./Icon";

function DeleteModal({ task, onConfirm, onCancel }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    dialog.showModal();

    return () => {
      dialog.close();
      if (previousFocus?.isConnected) {
        previousFocus.focus();
      }
    };
  }, []);

  function handleKeyDown(event) {
    if (event.key !== "Tab") return;

    const buttons = dialogRef.current.querySelectorAll("button");
    const firstButton = buttons[0];
    const lastButton = buttons[buttons.length - 1];

    if (event.shiftKey && document.activeElement === firstButton) {
      event.preventDefault();
      lastButton.focus();
    } else if (!event.shiftKey && document.activeElement === lastButton) {
      event.preventDefault();
      firstButton.focus();
    }
  }

  return (
    <dialog
      className="delete-modal"
      ref={dialogRef}
      aria-labelledby="delete-heading"
      aria-describedby="delete-description"
      onCancel={onCancel}
      onKeyDown={handleKeyDown}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <div className="modal-content">
        <span className="modal-icon">
          <Icon name="trash" size={25} />
        </span>
        <h2 id="delete-heading">Delete this task?</h2>
        <p id="delete-description">
          You are about to delete <strong>{task.title}</strong>. This cannot be
          undone.
        </p>
        <div className="modal-actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={onCancel}
            autoFocus
          >
            Keep task
          </button>
          <button
            type="button"
            className="button button-danger"
            onClick={onConfirm}
          >
            Delete task
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default DeleteModal;
