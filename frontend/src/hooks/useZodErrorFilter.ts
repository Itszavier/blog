/** @format */

import { useState } from "react";
import { ZodError } from "zod";

type ZodErrorMap = {
  [key: string]: string[];
};

const useZodErrorFilter = () => {
  const [errors, setErrors] = useState<ZodErrorMap>({});

  const filterZodErrors = (error: unknown) => {
    if (error instanceof ZodError) {
      const formattedErrors: ZodErrorMap = {};

      error.errors.forEach((err) => {
        const path = err.path.join(".");
        if (!formattedErrors[path]) {
          formattedErrors[path] = [];
        }
        formattedErrors[path].push(err.message);
      });

      setErrors(formattedErrors);
    } else {
      console.error("An unknown error occurred:", error);
    }
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    errors,
    filterZodErrors,
    clearErrors,
  };
};

export default useZodErrorFilter;
