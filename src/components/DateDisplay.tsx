export const DateDisplay = () => {
  return (
    <p className="text-muted-foreground text-center mb-6 sm:mb-8">
      {new Date().toLocaleDateString()} - <span className="text-muted-foreground">#00001</span>
    </p>
  );
};