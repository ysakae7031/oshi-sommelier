export default function Card({ children, className = "", as: Tag = "div", ...props }) {
  return (
    <Tag
      className={`rounded-card border border-linen-edge bg-card ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
