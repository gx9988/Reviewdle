export const DateDisplay = () => {
  return (
    <p className="text-muted-foreground text-center mb-4 sm:mb-6">
      {new Date().toLocaleDateString()} - <span className="text-muted-foreground">#00001</span>
    </p>
  );
};