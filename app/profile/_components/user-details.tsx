interface UserDetailsProps {
  title: string;
  content: string;
}

export const UserDetails = ({ title, content }: UserDetailsProps) => {
  return (
    <h1 className="flex text-nowrap gap-2">
      <span className="font-bold text-blue-950">{title}:</span>
      <span className="font-semibold text-zinc-700">{content}</span>
    </h1>
  );
};
