import React from 'react'


interface InputFormProps{
    label :string,
    place :string,
    name :string,
    register :any,
    errors :any,
    isRequired :boolean,
    type :string,
    containerWidth:string
}
const InputForm = ({
    label,
    place,
    name,
    register,
    errors,
    isRequired = true,
    type = "text",
    containerWidth= "sm:col-span-2",
    
  }:InputFormProps) => {
  return (
    <div className={containerWidth}>
    <label
      htmlFor={name}
      className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
    >
      {label}
    </label>
    <div className="mt-2">
      <input
        {...register(`${name}`, { required: isRequired })}
        type={type}
        name={name}
        id={name}
        autoComplete={name}
        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
        placeholder={` ${place.toLowerCase()}`}
      />
      {errors[`${name}`] && (
        <span className="text-sm text-red-600 ">{label} Məcburidir.</span>
      )}
    </div>
  </div>
  )
}

export default InputForm



