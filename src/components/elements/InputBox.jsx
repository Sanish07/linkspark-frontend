const InputBox = ({
    label,
    id,
    name,
    type = "text",
    errors,
    register,
    required,
    message,
    className = "",
    min,
    value,
    placeholder = "",
  }) => {
    return (
      <div className="flex flex-col gap-1 mb-5">
        
        {label && (
          <label
            htmlFor={id || name}
            className={`font-semibold text-md text-gray-800 ${className}`}
          >
            {label}
          </label>
        )}
  
        <input
          type={type}
          id={id || name}
          placeholder={placeholder}
          className={`px-3 py-2 border rounded-md outline-none bg-transparent text-gray-700 
            transition-all duration-200 focus:ring-2 focus:ring-blue-400 shadow-md
            ${errors[name]?.message ? "border-red-500" : "border-gray-400"} ${className}`}
          {...register(name, {
            required: required ? { value: true, message } : false,
            minLength: min
              ? { value: min, message: `Minimum ${min} characters required` }
              : undefined,
            pattern:
              type === "email"
                ? {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  }
                : type === "url"
                ? {
                    value:
                      /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                    message: "Please enter a valid URL",
                  }
                : undefined,
          })}
        />
  
        {/* Error Message */}
        {errors[name]?.message && (
          <p className="text-sm font-semibold text-red-600 mt-1">
            {errors[name]?.message}
          </p>
        )}
      </div>
    );
  };
  
  export default InputBox;
  