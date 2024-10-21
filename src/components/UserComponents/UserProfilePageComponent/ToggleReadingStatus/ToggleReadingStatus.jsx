import "./ToggleReadingStatus.css";

function ToggleReadingStatus({
  selectedReadingStatus,
  setSelectedReadingStatus,
}) {
  const handleStatusChange = (status) => {
    setSelectedReadingStatus(status);
  };
  const largeDot = "\u25CF";

  return (
    <div className="toggle-reading-status">
      <div className="toggle-switch">
        <div className={`slider ${selectedReadingStatus}`}></div>
        <span
          className={
            selectedReadingStatus === "finishedReading" ? "active" : ""
          }
          onClick={() => handleStatusChange("finishedReading")}
        >
          Finished Reading
          <span className="dot_finished_reading">{largeDot}</span>
        </span>

        <span
          className={
            selectedReadingStatus === "currentlyReading" ? "active" : ""
          }
          onClick={() => handleStatusChange("currentlyReading")}
        >
          Currently Reading
          <span className="blink_me_currently_reading">{largeDot}</span>
        </span>

        <span
          className={selectedReadingStatus === "wantToRead" ? "active" : ""}
          onClick={() => handleStatusChange("wantToRead")}
        >
          Want to Read
          <span className="dot_want_to_read">{largeDot}</span>
        </span>
      </div>
    </div>
  );
}

export default ToggleReadingStatus;
