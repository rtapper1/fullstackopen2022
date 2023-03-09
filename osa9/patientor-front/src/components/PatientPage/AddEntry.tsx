interface Props {
  toggleShowAdd: () => void;
}

const AddEntry = (props: Props) => {
  return (
    <div className="addEntry">
      <h3>add entry</h3>
      <form>
        type <input name="type" />
        date <input name="date" />
        specialist <input name="specialist" />
      </form>
      <button onClick={props.toggleShowAdd}>cancel</button>
    </div>
  );
};

export default AddEntry;
