import { useSelector } from "react-redux";

const ValidationError = () => {
  const error = useSelector((state) => state.auth.error);
  if (error && error.data?.errors) {
    return (
      <div className="alert alert-danger" role="alert">
        <ul className="mb-0">
          {error.data.errors.map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>
      </div>
    );
  }

  return null; 
};

export default ValidationError;