import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function RequirementField({
  name,
  label,
  register,
  errors,
  setValue,
  getValues,
  placeholder,
}) {
  const { course, editCourse } = useSelector((state) => state.course);
  const [requirement, setRequirement] = useState("");
  const [requirementsList, setRequirementsList] = useState([]);

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, requirementsList);
  }, [requirementsList]);

  const handleKeyDownEvent = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddRequirement();
    }
  };

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementsList([...requirementsList, requirement]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirementsList = [...requirementsList];
    updatedRequirementsList.splice(index, 1);
    setRequirementsList(updatedRequirementsList);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor={name} className="lable-style">
          {label} <sup className="text-pink-400">*</sup>
        </label>

        <div className="flex flex-col items-start space-y-2">
          <input
            id={name}
            name={name}
            type="text"
            placeholder={placeholder}
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            onKeyDown={handleKeyDownEvent}
            className="form-style w-full"
          />
          <button
            type="button"
            onClick={handleAddRequirement}
            className="font-semibold text-yellow-50"
          >
            Add
          </button>
        </div>

        {requirementsList.length > 0 && (
          <ul className="mt-2 list-inside list-disc">
            {requirementsList.map((requirement, index) => (
              <li
                key={index}
                className="flex text-sm items-center text-richblack-5"
              >
                <span>{requirement}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveRequirement(index)}
                  className="ml-2 text-xs text-pure-greys-300"
                >
                  Clear
                </button>
              </li>
            ))}
          </ul>
        )}
        {errors[name] && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {label} is required
          </span>
        )}
      </div>
    </>
  );
}

export default RequirementField;
