import React, { useEffect } from "react";
import { useSettings } from "../../context/settingsContext";
import { TaskStatus } from "../../models/TaskModel";
import { getStatusName } from "../task-list/utils";
import { isValidBoard } from "./util";

type SettingsFormProps = {
  onCancel: () => void;
};
export default function SettingsForm(props: SettingsFormProps) {
  const { onCancel } = props;
  const { transitionBoard, updateTransitionBoard } = useSettings();
  const [transitionBoardState, setTransitionBoardState] =
    React.useState(transitionBoard);

  useEffect(() => {
    setTransitionBoardState(transitionBoard);
  }, [transitionBoard]);

  const handleSelect = (
    sourceColumn: TaskStatus,
    destinationColumn: TaskStatus
  ) => {
    return setTransitionBoardState({
      ...transitionBoardState,
      [destinationColumn]: [
        ...transitionBoardState[destinationColumn],
        sourceColumn,
      ],
    });
  };

  const handleDeselect = (
    sourceColumn: TaskStatus,
    destinationColumn: TaskStatus
  ) => {
    return setTransitionBoardState({
      ...transitionBoardState,
      [destinationColumn]: transitionBoardState[destinationColumn].filter(
        (column) => column !== sourceColumn
      ),
    });
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTransitionBoard!(transitionBoardState);
    onCancel();
  };

  const isSaveDisabled = () => {
    return (
      JSON.stringify(transitionBoardState) ===
        JSON.stringify(transitionBoard) || !isValidBoard(transitionBoardState)
    );
  };
  return (
    <div className="flex justify-center">
      <div className="overflow-auto">
        <form className="flex flex-col gap-4" onSubmit={handleSave}>
          <p className="pt-4 max-w-[30rem]">
            Here you can customize your own state machine transitions with each
            row as the source and each column as the destination.
            <span className="block text-sm text-gray-500">
              <span className="font-medium">**Note:</span> You can't have a
              transition from a column to itself because each column is ordered
              by priority.
            </span>
          </p>
          <div
            className="grid gap-2 items-center rounded-md border border-gray-100 overflow-auto "
            style={{
              gridTemplateColumns: `repeat(${
                Object.values(TaskStatus).length + 1
              }, minmax(5rem, 1fr))`,
            }}
          >
            <span></span>
            {Object.values(TaskStatus).map((status, i) =>
              React.Children.toArray(
                <HeaderCell className="justify-center">
                  {getStatusName(status)}
                </HeaderCell>
              )
            )}
            {Object.values(TaskStatus).map((sourceColumn, i) =>
              React.Children.toArray(
                <>
                  <HeaderCell>{getStatusName(sourceColumn)}</HeaderCell>
                  {React.Children.toArray(
                    Object.values(TaskStatus).map((destinationColumn, j) => (
                      <div className="w-full flex justify-center items-center bg-white">
                        <input
                          type="checkbox"
                          disabled={i === j}
                          id={destinationColumn}
                          name={destinationColumn}
                          value={sourceColumn}
                          checked={transitionBoardState[
                            destinationColumn
                          ].includes(sourceColumn)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleSelect(sourceColumn, destinationColumn);
                            } else {
                              handleDeselect(sourceColumn, destinationColumn);
                            }
                          }}
                        />
                      </div>
                    ))
                  )}
                </>
              )
            )}
          </div>
          <button
            type="submit"
            disabled={isSaveDisabled()}
            className="bg-blue-600 disabled:bg-gray-400 text-white rounded-md p-1 shadow-sm hover:shadow-md text-lg font-medium"
          >
            Save
          </button>
          <button
            type="button"
            className="bg-white text-gray-700 rounded-md p-1 shadow-sm hover:shadow-md text-lg font-medium"
            onClick={onCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

const HeaderCell = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { children, className } = props;
  return (
    <div className={`flex p-2 ${className}`}>
      <h4 className="text-sm font-medium text-gray-700  truncate">
        {children}
      </h4>
    </div>
  );
};
