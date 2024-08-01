import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

function ChipsInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) {
  const { course, editCourse } = useSelector((state) => state.course);

  // setting up the chips array
  const [chips, setChips] = useState([]);

  // registering the values in the form data
  useEffect(() => {
    if (editCourse) {
      console.log("COURSE >-> ", course);
      setChips(course?.tag);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  // update the chips data on every change of chips array
  useEffect(() => {
    setValue(name, chips);
  }, [chips]);

  // Function to handle user input keydown event
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const chipValue = event.target.value.trim();

      if (chipValue && !chips.includes(chipValue)) {
        const newChips = [...chips, chipValue];
        setChips(newChips);
        event.target.value = "";
      }
    }
  };

  const handleDeleteChip = (chipIndex) => {
    const newChips = chips.filter((_, index) => index !== chipIndex);
    setChips(newChips);
  };

  return (
    <>
      <div className="flex flex-col space-y-2">
        <label htmlFor={name} className="lable-style">
          {label} <sup className="text-pink-400">*</sup>
        </label>

        <div className="flex flex-wrap gap-y-2 gap-x-1">
          {chips.map((chip, index) => (
            <div
              key={index}
              className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
            >
              <span>{chip}</span>
              <button
                type="button"
                className="ml-2 focus:outline-none"
                onClick={() => handleDeleteChip(index)}
              >
                <MdClose className="text-sm" />
              </button>
            </div>
          ))}

          <input
            type="text"
            name={name}
            placeholder={placeholder}
            id={name}
            onKeyDown={handleKeyDown}
            className="form-style w-full"
          />
        </div>
        {errors[name] && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {label} is required
          </span>
        )}
      </div>
    </>
  );
}

export default ChipsInput;
