export default function ITText({ children, className = "" }) {
  return <p className={`${className} text-gray-900 `}>{children}</p>;
}
